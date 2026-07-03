export type CareerStage = {
  id: string;
  title: string;
  short: string;
  blurb: string;
  icon: "headset" | "trending-up" | "users" | "graduation-cap";
};

/* The growth path every agent walks — referenced in the FAQ ("What is the
   growth path?") and mirrored here as the visual career ladder. `short`
   powers the cycling headline word in the career hero, so it must stay
   readable at a glance (2–3 words). */
export const careerPath: CareerStage[] = [
  {
    id: "stage-1",
    title: "Virtual Front Desk Executive",
    short: "Front Desk Executive",
    blurb: "Your starting point. Fully paid training on PMS systems, guest communication, and US hospitality standards.",
    icon: "headset",
  },
  {
    id: "stage-2",
    title: "Senior Virtual Agent",
    short: "Senior Agent",
    blurb: "Handle escalations and complex guest requests with growing autonomy — and higher incentives.",
    icon: "trending-up",
  },
  {
    id: "stage-3",
    title: "Team Lead",
    short: "Team Lead",
    blurb: "Lead a pod of agents, own quality metrics, and mentor new joiners through their first shifts.",
    icon: "users",
  },
  {
    id: "stage-4",
    title: "Trainer / Operations Manager",
    short: "Trainer",
    blurb: "Shape the next generation of agents or run operations end-to-end. We promote from within.",
    icon: "graduation-cap",
  },
];

export const roleOptions = [
  "Virtual Front Desk Executive",
  "Senior Virtual Agent",
  "Team Lead",
  "Trainer",
  "Operations Manager",
  "Other",
];
