import { Nav } from "@/components/global/Nav";
import { Footer } from "@/components/global/Footer";
import { SmoothScroll } from "@/components/global/SmoothScroll";
import { ParticleRingDynamic } from "@/components/global/ParticleRingDynamic";
import { AmbientGlow } from "@/components/global/AmbientGlow";
import { getImageUrl } from "@/lib/cms/media";
import { getText } from "@/lib/cms/text";

// Layout reads the logo/CTA label from Supabase, so every page under it
// needs to revalidate periodically rather than being frozen at build time-
// ISR (not force-dynamic) keeps the rest of the static/animated site's
// performance intact while still picking up admin edits within a minute.
export const revalidate = 60;

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const [logoSrc, navCtaLabel] = await Promise.all([
    getImageUrl("logo", "/img/kiosist-logo.png"),
    getText("nav.cta.label", "Join Us"),
  ]);

  return (
    <>
      {/* Fixed-position canvas- rendered here (not the root layout) so it
          only mounts on marketing pages, not /admin. */}
      <ParticleRingDynamic />
      <AmbientGlow />
      <div className="relative z-[1]">
        <SmoothScroll>
          <Nav logoSrc={logoSrc} ctaLabel={navCtaLabel} />
          <main>{children}</main>
          <Footer logoSrc={logoSrc} />
        </SmoothScroll>
      </div>
    </>
  );
}
