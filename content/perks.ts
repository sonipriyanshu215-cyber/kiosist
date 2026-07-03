export type Perk = {
  id: string;
  title: string;
  body: string;
  image: string;
};

export const perks: Perk[] = [
  {
    id: "p-1",
    title: "Paid Leaves",
    body: "Generous paid leave policy so you can recharge and come back at your best.",
    image: "/img/career/perks/paid-leaves-centered.webp",
  },
  {
    id: "p-2",
    title: "Overtime Compensation",
    body: "Every extra hour you put in is recognised and compensated fairly.",
    image: "/img/career/perks/overtime-centered.webp",
  },
  {
    id: "p-3",
    title: "Referral Bonus",
    body: "Know someone great? Refer them and earn a bonus when they join the team.",
    image: "/img/career/perks/referral-bonus-centered.webp",
  },
  {
    id: "p-4",
    title: "Performance Incentives",
    body: "Your results are visible and rewarded — monthly and quarterly performance bonuses.",
    image: "/img/career/perks/performance-incentives-centered.webp",
  },
  {
    id: "p-5",
    title: "Free Training",
    body: "Continuous learning — PMS systems, hospitality soft skills, English fluency, and leadership.",
    image: "/img/career/perks/free-training-centered.webp",
  },
  {
    id: "p-6",
    title: "Team Meals & Celebrations",
    body: "Birthdays, milestones, festivals — we celebrate together with food, fun, and recognition.",
    image: "/img/career/perks/celebration-centered.webp",
  },
];
