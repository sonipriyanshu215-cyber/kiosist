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
    ],
  },
  experimental: {
    optimizePackageImports: ["framer-motion", "lucide-react"],
  },
  // public/img and public/video are referenced by plain string paths (not
  // next/image static imports), so swapping a file's content without
  // renaming it keeps the same URL- without this, browsers that cached the
  // old file under that URL keep serving it indefinitely after a deploy,
  // which is exactly the "shows an old image on some PCs" symptom. A short
  // max-age plus must-revalidate forces a freshness check with the server
  // instead of trusting a long-lived cached copy.
  async headers() {
    return [
      {
        source: "/img/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=60, must-revalidate" }],
      },
      {
        source: "/video/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=60, must-revalidate" }],
      },
    ];
  },
};

module.exports = nextConfig;
