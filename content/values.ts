export type Value = {
  id: string;
  title: string;
  body: string;
  image: string;
};

export const values: Value[] = [
  {
    id: "v-1",
    title: "Guest-First Thinking",
    body: "Every decision we make starts with one question: how does this improve the guest's experience?",
    image: "/img/about/perks/guest.webp",
  },
  {
    id: "v-2",
    title: "Reliability Around the Clock",
    body: "We don't take nights off. Our team is trained and equipped to handle any situation, any hour.",
    image: "/img/about/perks/reliability.webp",
  },
  {
    id: "v-3",
    title: "Operational Rigor",
    body: "Checklists, SLAs, and escalation paths - we build structure so nothing falls through the cracks.",
    image: "/img/about/perks/operational-rigor.webp",
  },
  {
    id: "v-4",
    title: "Cultural Fluency",
    body: "Serving guests across the USA from Surat demands cultural sensitivity and clear communication.",
    image: "/img/about/perks/cultural-fluency.webp",
  },
  {
    id: "v-5",
    title: "Care for Our Team",
    body: "Happy agents make happy guests. We invest in training, wellness, and recognition for every team member.",
    image: "/img/about/perks/care-for-our-team.webp",
  },
];
