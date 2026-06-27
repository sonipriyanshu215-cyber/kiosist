/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [],
  },
  optimizePackageImports: ["framer-motion", "lucide-react"],
};

module.exports = nextConfig;
