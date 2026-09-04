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
  { key: "home.whychoose.1", label: "Why Choose Kiosist- photo 1 (Continuous Learning)", fallback: "/img/culture/training-1.png" },
  { key: "home.whychoose.2", label: "Why Choose Kiosist- photo 2 (Modern Workspace)", fallback: "/img/culture/team-meeting-1.png" },
  { key: "home.whychoose.3", label: "Why Choose Kiosist- photo 3 (Professional Growth)", fallback: "/img/culture/expo-dfw-2024.jpg" },
  { key: "home.whychoose.4", label: "Why Choose Kiosist- photo 4 (Corporate Friendly)", fallback: "/img/culture/office-2.jpg" },
  { key: "home.whychoose.5", label: "Why Choose Kiosist- photo 5 (Global Exposure)", fallback: "/img/culture/office-3.jpg" },
  { key: "home.whychoose.6", label: "Why Choose Kiosist- photo 6 (A Team That Supports You)", fallback: "/img/culture/team-3.jpg" },
] as const;
