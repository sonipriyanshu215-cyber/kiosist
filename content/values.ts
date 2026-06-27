export type Value = {
  id: string;
  title: string;
  body: string;
  lottieUrl: string;
};

export const values: Value[] = [
  {
    id: "v-1",
    title: "Guest-First Thinking",
    body: "Every decision we make starts with one question: how does this improve the guest's experience?",
    lottieUrl: "/lottie/guest-first.json",
  },
  {
    id: "v-2",
    title: "Reliability Around the Clock",
    body: "We don't take nights off. Our team is trained and equipped to handle any situation, any hour.",
    lottieUrl: "/lottie/24-hours.json",
  },
  {
    id: "v-3",
    title: "Operational Rigor",
    body: "Checklists, SLAs, and escalation paths — we build structure so nothing falls through the cracks.",
    lottieUrl: "/lottie/operational.json",
  },
  {
    id: "v-4",
    title: "Cultural Fluency",
    body: "Serving guests across the USA from Surat demands cultural sensitivity and clear communication.",
    lottieUrl: "/lottie/culture.json",
  },
  {
    id: "v-5",
    title: "Care for Our Team",
    body: "Happy agents make happy guests. We invest in training, wellness, and recognition for every team member.",
    lottieUrl: "/lottie/team-care.json",
  },
];
