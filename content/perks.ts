export type Perk = {
  id: string;
  title: string;
  body: string;
  lottieUrl: string;
};

export const perks: Perk[] = [
  {
    id: "p-1",
    title: "Paid Leaves",
    body: "Generous paid leave policy so you can recharge and come back at your best.",
    lottieUrl: "/lottie/calendar.json",
  },
  {
    id: "p-2",
    title: "Overtime Compensation",
    body: "Every extra hour you put in is recognised and compensated fairly.",
    lottieUrl: "/lottie/clock.json",
  },
  {
    id: "p-3",
    title: "Referral Bonus",
    body: "Know someone great? Refer them and earn a bonus when they join the team.",
    lottieUrl: "/lottie/gift.json",
  },
  {
    id: "p-4",
    title: "Performance Incentives",
    body: "Your results are visible and rewarded — monthly and quarterly performance bonuses.",
    lottieUrl: "/lottie/trophy.json",
  },
  {
    id: "p-5",
    title: "Free Training",
    body: "Continuous learning — PMS systems, hospitality soft skills, English fluency, and leadership.",
    lottieUrl: "/lottie/graduation.json",
  },
  {
    id: "p-6",
    title: "Team Meals & Celebrations",
    body: "Birthdays, milestones, festivals — we celebrate together with food, fun, and recognition.",
    lottieUrl: "/lottie/celebration.json",
  },
];
