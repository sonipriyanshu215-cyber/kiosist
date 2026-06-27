import type { Metadata } from "next";
import { Inter, JetBrains_Mono, DM_Sans } from "next/font/google";
import "../styles/globals.css";
import { ThemeProvider } from "@/components/global/ThemeProvider";
import { Nav } from "@/components/global/Nav";
import { Footer } from "@/components/global/Footer";
import { FloatingCTA } from "@/components/global/FloatingCTA";
import { SmoothScroll } from "@/components/global/SmoothScroll";
import { IntroLoader } from "@/components/global/IntroLoader";
import { ParticleRingDynamic } from "@/components/global/ParticleRingDynamic";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-body",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["500"],
});

// DM Sans as display font until Satoshi is self-hosted.
// Replace with localFont pointing to /public/fonts/Satoshi-*.woff2
// once downloaded from fontshare.com/fonts/satoshi
const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kiosist.com"),
  title: {
    default: "Kiosist — Your 24/7 Virtual Front Desk",
    template: "%s | Kiosist",
  },
  description:
    "Kiosist provides 24/7 virtual front desk staffing for hotels across the USA — reducing costs, improving guest satisfaction, and never missing a check-in.",
  keywords: ["virtual front desk", "hotel staffing", "KioClerk", "24/7 hotel management"],
  authors: [{ name: "Kiosist Pvt. Ltd." }],
  creator: "Kiosist",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://kiosist.com",
    siteName: "Kiosist",
    title: "Kiosist — Your 24/7 Virtual Front Desk",
    description:
      "24/7 virtual front desk staffing for US hotels. Reduce costs, elevate guest experience.",
    images: [{ url: "/og/home.jpg", width: 1200, height: 630, alt: "Kiosist" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kiosist — Your 24/7 Virtual Front Desk",
    description: "24/7 virtual front desk staffing for US hotels.",
    images: ["/og/home.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrains.variable} ${dmSans.variable}`}
    >
      <body suppressHydrationWarning>
        <IntroLoader />
        <ThemeProvider>
          {/* Fixed-position canvas — inside ThemeProvider so it can read useTheme() */}
          <ParticleRingDynamic />
          <div className="relative z-[1]">
            <SmoothScroll>
              <Nav />
              <main>{children}</main>
              <Footer />
              <FloatingCTA />
            </SmoothScroll>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
