import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Kiosist",
  description: "How Kiosist collects, uses, and protects your data.",
};

export default function Privacy() {
  return (
    <div className="min-h-screen bg-kio-bg pt-32 pb-20">
      <div className="container-kio max-w-3xl">
        <h1 className="text-3xl font-bold text-kio-ink md:text-4xl lg:text-5xl">Privacy Policy</h1>
        <p className="mt-2 text-sm text-kio-muted">Last updated: June 2026</p>

        <div className="prose prose-kio mt-10 max-w-none text-kio-muted">
          <p>
            Kiosist Pvt. Ltd. (&ldquo;Kiosist&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) is
            committed to protecting your personal information. This privacy policy describes how
            we collect, use, and disclose personal data when you interact with our website and
            services.
          </p>

          <h2 className="mt-8 text-xl font-bold text-kio-ink">1. Information We Collect</h2>
          <p>
            We collect information you provide directly (name, email, phone, hotel details) when
            you submit contact or career forms. We also collect basic usage analytics (page views,
            referral source) via Plausible or Google Analytics.
          </p>

          <h2 className="mt-6 text-xl font-bold text-kio-ink">2. How We Use It</h2>
          <p>
            We use collected information to respond to inquiries, process job applications,
            improve our website, and communicate with prospects. We do not sell your data to
            third parties.
          </p>

          <h2 className="mt-6 text-xl font-bold text-kio-ink">3. Data Retention</h2>
          <p>
            Inquiry data is retained for 2 years. Job applications are retained for 1 year after
            the hiring decision. You may request deletion at any time by emailing
            hr@kiosist.com.
          </p>

          <h2 className="mt-6 text-xl font-bold text-kio-ink">4. Contact</h2>
          <p>
            For privacy-related requests, contact us at{" "}
            <a href="mailto:hr@kiosist.com" className="text-kio-accent hover:underline">
              hr@kiosist.com
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
