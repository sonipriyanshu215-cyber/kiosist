// Known swap-in-place image slots. Not server-only- read by both server
// pages (via getImageUrl in lib/cms/media.ts) and the admin Media page.
// Add an entry here + call getImageUrl(key, fallback) at the render site to
// make another image replaceable from the admin without a deploy.
export const IMAGE_SLOTS = [
  { key: "logo", label: "Site logo (nav + footer)", fallback: "/img/kiosist-logo.png" },
  { key: "career.hero", label: "Career page hero background", fallback: "/img/career/hero2.png" },
  { key: "career.mascot", label: "Application form mascot", fallback: "/img/hero/agent-red.png" },
  { key: "home.about.image", label: "Home- “What is Kiosist” team photo", fallback: "/img/about/kiosist-team.jpeg" },
  { key: "about.intro.image", label: "About page hero photo", fallback: "/img/about/agent-workstation-2.jpeg" },
  { key: "about.mission.image", label: "About- Mission icon", fallback: "/img/about/mission-2.png" },
  { key: "about.vision.image", label: "About- Vision icon", fallback: "/img/about/vision-1.png" },
  { key: "footer.mascot", label: "Footer agent mascot", fallback: "/img/hero/agent-red.png" },
] as const;
