/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      // Supabase Storage public bucket URLs (admin-uploaded images)- covers
      // any project ref since that's part of the hostname, e.g.
      // https://xxxxxxxxxxxx.supabase.co/storage/v1/object/public/media/...
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
      // The image-transformation endpoint SafeImage's custom loader targets
      // for Supabase-hosted images (cached at Supabase's CDN with a 1-year
      // TTL, unlike /object/public/). A custom loader bypasses remotePatterns
      // validation, but the lightbox and any default-loader use still need
      // this whitelisted. See lib/supabase/image-loader.ts.
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/render/image/public/**",
      },
    ],
  },
  experimental: {
    optimizePackageImports: ["framer-motion", "lucide-react"],
  },
  // public/img is referenced by plain string paths (not next/image static
  // imports), so an admin swapping a slot file's content without renaming it
  // keeps the same URL- without a short max-age, browsers that cached the
  // old file under that URL keep serving it indefinitely after a deploy,
  // which is exactly the "shows an old image on some PCs" symptom. A short
  // max-age plus must-revalidate forces a freshness check with the server
  // instead of trusting a long-lived cached copy.
  //
  // /video/* is different: those are committed build assets, never swapped
  // in place, and they're the biggest single downloads on the site (the
  // hero clip is ~25 MB). Give them a long cache so a returning visitor
  // doesn't re-validate- let alone re-pull- megabytes every 60 s. If a
  // clip is ever replaced under the same name, add a ?v= query at the
  // reference site to bust it.
  async headers() {
    return [
      {
        source: "/img/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=60, must-revalidate" }],
      },
      {
        source: "/video/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=2592000" }],
      },
    ];
  },
};

module.exports = nextConfig;
