import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use | Kiosist",
  description: "Terms and conditions for using Kiosist's website and services.",
};

export default function Terms() {
  return (
    <div className="min-h-screen bg-kio-bg pt-32 pb-20">
      <div className="container-kio max-w-3xl">
        <h1 className="text-3xl font-bold text-kio-ink">Terms of Use</h1>
        <p className="mt-2 text-sm text-kio-muted">Last updated: June 2026</p>

        <div className="prose mt-10 max-w-none text-kio-muted">
          <p>
            By accessing kiosist.com, you agree to be bound by these terms of use. If you
            disagree with any part of these terms, please do not use our website.
          </p>

          <h2 className="mt-8 text-xl font-bold text-kio-ink">1. Use of Content</h2>
          <p>
            All content on this website — text, images, graphics, and code — is the intellectual
            property of Kiosist Pvt. Ltd. unless otherwise noted. Reproduction without written
            permission is prohibited.
          </p>

          <h2 className="mt-6 text-xl font-bold text-kio-ink">2. Services</h2>
          <p>
            This website is a marketing site for Kiosist&apos;s virtual front desk services. Specific
            service terms are governed by the service agreement signed between Kiosist and
            each client property.
          </p>

          <h2 className="mt-6 text-xl font-bold text-kio-ink">3. Limitation of Liability</h2>
          <p>
            Kiosist is not liable for any indirect, incidental, or consequential damages arising
            from use of this website or reliance on information contained herein.
          </p>

          <h2 className="mt-6 text-xl font-bold text-kio-ink">4. Governing Law</h2>
          <p>
            These terms are governed by the laws of India. Any disputes shall be subject to the
            jurisdiction of courts in Surat, Gujarat.
          </p>

          <h2 className="mt-6 text-xl font-bold text-kio-ink">5. Contact</h2>
          <p>
            Questions?{" "}
            <a href="mailto:hr@kiosist.com" className="text-kio-accent hover:underline">
              hr@kiosist.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
