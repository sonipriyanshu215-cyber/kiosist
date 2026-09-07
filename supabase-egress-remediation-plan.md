# Supabase Cached Egress Overage — Remediation Plan

**Issue:** Cached Egress at 9.59 GB against a 5 GB Free Plan allowance (4.59 GB overage).
**Context:** the public `media` Storage bucket serves every image on the marketing site (not just an admin portal), so egress scales with **site traffic**.

**Root cause (measured, not assumed):** Supabase serves the plain public-object endpoint (`/storage/v1/object/public/…`) with **`Cache-Control: no-cache`** on this project — regardless of the `cacheControl` set at upload. Verified: object metadata reads `cache_control: max-age=31536000`, the HTTP response still says `no-cache`, and `CF-Cache-Status` is `MISS`/`REVALIDATED` even on a forced cache-bust. So every `<img>` request is a CDN miss billed as egress, on every page view, for every visitor and crawler. Payload size was secondary — the stored images are 50–160 KB, not multi-MB.

**The fix:** the image-transformation endpoint (`/storage/v1/render/image/public/…?width=&quality=`) behaves the opposite way — it returns `Cache-Control: max-age=31536000` and repeat requests are `CF-Cache-Status: HIT` (verified), and it resizes at the edge. Route `next/image` there for Supabase-hosted images. Egress then collapses to one edge-cache fill per (image, width) per region per year.

---

## Status — 2026-09-07

| Phase | State |
|---|---|
| 0 — Diagnose | Codebase + header analysis **done** (below). Dashboard checks still yours. |
| 1 — Cache / delivery | **Done in code** — reframed from "set upload header" (proven insufficient here) to "route through the transform endpoint". Needs deploy. |
| 2 — Compression | **Done in code** (client + backfill). Backfill already run by you. Needs deploy. |
| 3 — Private buckets | Not started — **recommend deferring** (SSG/signed-URL conflict). |
| 4 — Migrate to R2 | Not needed unless 1+2 fall short after a week's measurement. |
| 5 — Monitor | Weekly, yours. |

### What changed in code

| File | Change |
|---|---|
| `lib/supabase/image-loader.ts` | **New.** `supabaseImageLoader({src,width,quality})` — rewrites a `/object/public/` URL to `/render/image/public/` with `width` (clamped 3000) + `quality`. `isSupabaseStorageUrl()` guard. |
| `components/primitives/CmsImage.tsx` | **New.** Drop-in for `next/image` that applies the loader **only** when `src` is a Supabase URL; bundled `/img/*` keeps Next's built-in optimiser. |
| `components/primitives/SafeImage.tsx` | Same conditional-loader logic inline (it already wraps `next/image`). |
| 11 components | `import Image from "next/image"` → `import { CmsImage as Image } …` (alias — no JSX changes). `WhatIsKiosist`, `WhyChooseKiosist`, `TeamMosaic`, `BrandStrip`, `AboutIntro`, `MissionBlock`, `VisionBlock`, `Nav`, `Footer`, `CareerHero`, `AnimatedCultureSlider`. `HeroBanner` / `KiosistIntro` untouched (bundled art only). |
| `components/culture/MasonryGallery.tsx` | Lightbox `toOptimizedSrc()` sends Supabase URLs through the loader; bundled images still use `/_next/image`. |
| `next.config.js` | `remotePatterns` gains `/storage/v1/render/image/public/**`. |
| `lib/cms/image-formats.ts` | New `STORAGE_CACHE_CONTROL = "31536000"` — used on upload so the stored metadata is right (the transform endpoint *does* honour it). |
| `app/api/admin/media/route.ts`, `…/seed-slider/route.ts`, `scripts/seed-gallery.ts` | Upload `cacheControl: "3600"` → `STORAGE_CACHE_CONTROL`. |
| `lib/cms/compress-image.ts` | **New.** `compressImageForUpload()` — browser-side downscale to ≤1600 px, re-encode to WebP (PNG stays PNG) at q80, ≤1 MB target. Skips GIF + files <400 KB. Falls back to the original on failure. |
| `components/admin/MediaLibrary.tsx`, `components/admin/ContentCollectionEditor.tsx` | Run `compressImageForUpload()` before the 4 MB preflight (so the cap is checked against the compressed result). Raw `<img>` thumbnails in the admin media grid now use `supabaseThumb()` → the CDN-cached transform endpoint at 128–640 px instead of a full-size `no-cache` `/object/public/` fetch on every visit to `/admin/media`. |
| `scripts/backfill-storage.ts` | **New.** `npm run backfill:storage [N]` — walks every `media` row, re-compresses with sharp (resize 1600 / q80, same format, same path → `media.url` unchanged, no DB writes), re-uploads with the 1-year header. Kept only if smaller; else original bytes re-uploaded to refresh the header. GIFs header-only. Idempotent. Optional `N` limits rows for a smoke test. |
| `package.json` | `browser-image-compression` dep; `backfill:storage` script. |

Verified locally against the live Supabase project (`next start`): every page now emits `…/render/image/public/media/…?width=…&quality=75` for admin-uploaded images and `/_next/image?url=/img/…` for bundled ones; a fetched variant returns `HTTP 200`, `Cache-Control: max-age=31536000`, `CF-Cache-Status: HIT`.

### You still need to

1. **Deploy.** Nothing above helps until it ships.
2. **Confirm Supabase Image Transformations quota** for your plan (Settings → Storage, or the usage page). This project *can* transform today, but the Free tier caps the number of distinct origin images; Pro is 100 free then ~$5 / 1,000. If you hit the cap, the fallback is `images.minimumCacheTTL` + a CDN in front, or Phase 4.
3. **Phase 0 dashboard checks** (below) — an orphaned object or heavy off-domain hotlinking wouldn't be caught by any of this.
4. **Re-measure egress after ~1 week** (Phase 5) before touching Phase 3 / 4.
5. The `no-cache` behaviour on `/object/public/` is worth a **Supabase support question** — it may be a project/gateway setting (`sb-gateway-mode: direct` shows in the response headers) that can be flipped, which would also fix any non-`next/image` consumer.

Backfill (`npm run backfill:storage`) already run by you on 2026-09-07 — object metadata now reads `max-age=31536000` and images are re-compressed. Re-run only if you add large images before the deploy.

---

## Guiding principle

Migrating providers before diagnosing the cause moves the wall a few months out. It does not remove it. Work the phases in order and stop when usage is back under 5 GB.

---

## Phase 0 — Diagnose the source

### Findings (done)

- **Buckets:** `media` (public) — every site image. `resumes` (private, signed URLs, 60 s) — career PDFs, admin-only, negligible.
- **Public-bucket URLs on customer-facing surfaces? Yes, by design** — `media.url` values are read by the public pages via `getImageUrl` / `getCultureGallery` / `getCultureSlider` (`lib/cms/media.ts`). This *is* the site's image delivery.
- **`/object/public/` is served `Cache-Control: no-cache`** on this project — confirmed uncacheable at Supabase's CDN and in browsers, independent of the object's stored `cache_control` metadata. This is the overage: every image, every request, every visitor = egress.
- **`/render/image/public/` is served `Cache-Control: max-age=31536000` and is CDN-cached** (`CF-Cache-Status: HIT` on repeat) — and resizes. Image Transformations are enabled on the project.
- **Render path (before):** `SafeImage` and ~11 components used `next/image` with the default optimiser → `/_next/image?url=<…/object/public/…>`. That re-pulled the full original from the `no-cache` endpoint every `minimumCacheTTL` (Next 16 default 4 h; Next 14 default was 60 s — likely far worse historically) per variant per region.
- **Payload:** stored objects are 50–160 KB (already small, or shrunk by your backfill). Not the main factor, but compression keeps transforms cheap and storage down.

### Dashboard checks (you)

- [ ] Storage → bucket list: confirm only `media` + `resumes`, and nothing large is **orphaned** (object present, no `media` row — the backfill skips those).
- [ ] Reports / Logs → most-requested objects. Expect culture gallery/slider.
- [ ] Hotlinking: `/storage/v1/object/public/media/…` requests with a `Referer` that isn't your domain or `localhost`. Heavy off-domain traffic → Phase 3 becomes worthwhile.
- [ ] Storage → Configuration → Image Transformations: confirm they're enabled and check the origin-image quota against your plan.

**Decision gate:** if the dashboard shows the leak is hotlinking rather than your own pages, do Phase 3. Otherwise the Phase 1 loader + deploy should resolve it.

---

## Phase 1 — Cache / delivery · **DONE IN CODE**

**Original plan:** set `cacheControl` long on upload. **Proven insufficient here** — `/object/public/` ignores it and serves `no-cache`. Kept anyway (`STORAGE_CACHE_CONTROL`, all three upload sites) because the metadata should be correct and the transform endpoint *does* honour it.

**What actually fixes it:** a `next/image` custom loader (`lib/supabase/image-loader.ts`) that points Supabase-hosted images at `/render/image/public/…?width=&quality=`. Applied via `CmsImage` (aliased import, 11 components) and inline in `SafeImage`; the `MasonryGallery` lightbox too. Bundled `/img/*` is untouched — still Next's built-in optimiser.

- [x] Loader + `isSupabaseStorageUrl` guard.
- [x] `CmsImage` drop-in; `SafeImage` updated; 11 components switched; lightbox updated.
- [x] `remotePatterns` updated; `tsc` + `next build` clean; verified against the live project.
- [ ] **You:** deploy; confirm the transformation quota.

**Scope note:** the loader is deliberately scoped, not a global `next.config.js` `loaderFile` (which would also disable built-in optimisation for local images). Trade-off: any *future* component rendering a CMS URL must use `CmsImage`/`SafeImage`, not raw `next/image`.

---

## Phase 2 — Reduce payload size · **DONE IN CODE**

Client-side compression before every admin upload (`lib/cms/compress-image.ts`, wired into both admin upload entry points): ≤1600 px, WebP (PNG kept), q80, ≤1 MB, GIF/tiny passthrough, original on failure. The 4 MB cap is now checked *after* compression.

- [x] Client compression (`browser-image-compression`).
- [x] Backfill (`scripts/backfill-storage.ts`, sharp) — re-compress + header refresh in place, no DB writes.
- [x] **You:** backfill already run (2026-09-07).
- [~] Thumbnails — now moot: the transform endpoint resizes per `srcset` width, so admin tables and the public grid already get small variants.

---

## Phase 3 — Lock down the buckets · **RECOMMEND DEFERRING**

Signed URLs baked into statically-generated pages (`/`, `/about`, `/culture`, `/career` are `○ Static`) and into the `/_next/image` / transform cache key **404 on expiry**. Making it work needs dynamic rendering everywhere, a very long expiry (pointless), or a signing proxy. Only worth it if Phase 0 shows significant hotlinking. For access control alone, no.

---

## Phase 4 — Migrate storage (conditional)

**Trigger:** still above 5 GB after 1+2 are deployed and measured for a week.

Move Storage to **Cloudflare R2** (S3-compatible, 10 GB free, **$0 egress, permanent**). Keep Supabase for auth + Postgres. Swap the Supabase storage client for the AWS S3 SDK.

**Alternatives:** ImageKit / Cloudinary (best if payload is overwhelmingly images — free tier + auto resize/WebP/CDN; weaker for PDFs/exports). Backblaze B2 + Cloudflare (free egress via Bandwidth Alliance, more moving parts than R2 for no gain).

**Warning:** migrating before the compression work means hitting R2's 10 GB cap within months anyway.

---

## Phase 5 — Monitor

- [ ] Usage page weekly for the first month.
- [ ] Confirm the drop actually held.
- [ ] Threshold at 3 GB — investigate before hitting 5 GB again.

---

## Immediate action

Confirm on the Supabase billing page how Free-plan overage is enforced — restriction vs. charge. Don't rely on secondhand accounts.

---

## Summary

| Phase | Effort | Expected impact |
|---|---|---|
| 0 — Diagnose | done | Identified the cause: `no-cache` on `/object/public/` |
| 1 — Transform-endpoint loader | done, needs deploy | **High** — repeat views become CDN hits, zero egress |
| 2 — Compression + backfill | done, backfill run | Medium — smaller transforms + storage |
| 3 — Private buckets | deferred | SSG/signed-URL conflict |
| 4 — Migrate to R2 | only if needed | Permanent fix if 1+2 fall short |
| 5 — Monitor | ongoing | Prevents recurrence |

Deploy Phase 1 + 2 and measure. Migration is the fallback, not the plan.
