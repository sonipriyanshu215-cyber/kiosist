import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { RevealOnScroll } from "@/components/primitives/RevealOnScroll";

export function JoinTeaser() {
  return (
    <section className="section-pad bg-kio-bg-soft">
      <div className="container-kio">
        <div className="mx-auto max-w-3xl text-center">
          <RevealOnScroll>
            <p className="section-label">Join the Team</p>
            <h2 className="mt-3 text-3xl font-bold text-kio-ink md:text-4xl">
              Build your career in US hospitality — from Surat.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-kio-muted">
              No degree required. Just excellent English, a drive to serve, and the determination
              to grow. We train you for everything else.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/career"
                className="group inline-flex items-center gap-2 rounded-full bg-kio-primary px-8 py-3.5 text-sm font-semibold text-white transition-all hover:bg-kio-primary/85"
              >
                View Open Roles
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/culture"
                className="inline-flex items-center gap-2 rounded-full border border-kio-line px-8 py-3.5 text-sm font-semibold text-kio-ink transition-all hover:border-kio-accent hover:text-kio-primary"
              >
                Life at Kiosist
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
