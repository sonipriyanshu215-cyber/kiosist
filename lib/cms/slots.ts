// Known swap-in-place image slots. Not server-only- read by both server
// pages (via getImageUrl in lib/cms/media.ts) and the admin Media page.
// Add an entry here + call getImageUrl(key, fallback) at the render site to
// make another image replaceable from the admin without a deploy.
export const IMAGE_SLOTS = [
  { key: "logo", label: "Site logo (nav + footer)", fallback: "/img/kiosist-logo.png" },
  { key: "career.hero", label: "Career page hero background", fallback: "/img/career/hero2.png" },
  { key: "career.mascot", label: "Application form mascot", fallback: "/img/hero/agent-red.png" },
] as const;
