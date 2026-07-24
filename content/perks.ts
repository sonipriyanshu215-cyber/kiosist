export type Perk = {
  id: string;
  title: string;
  body: string;
  icon:
    | "calendar-check"
    | "cake"
    | "gift"
    | "wallet"
    | "clock"
    | "smile"
    | "heart-handshake"
    | "trending-up"
    | "party-popper"
    | "film"
    | "heart-pulse"
    | "door-closed";
};

export const perks: Perk[] = [
  {
    id: "p-1",
    title: "Paid Leaves",
    body: "Generous paid leave policy so you can recharge and come back at your best.",
    icon: "calendar-check",
  },
  {
    id: "p-2",
    title: "Birthday Leave",
    body: "Your birthday is your day off, on us- go celebrate, no questions asked.",
    icon: "cake",
  },
  {
    id: "p-3",
    title: "Referral Bonus",
    body: "Know someone great? Refer them and earn a bonus when they join the team.",
    icon: "gift",
  },
  {
    id: "p-4",
    title: "Double Pay On Festivals",
    body: "Work a festival shift and get paid double- your effort doesn't go unnoticed.",
    icon: "wallet",
  },
  {
    id: "p-5",
    title: "Flexible Shifts",
    body: "Shift options that work with your life, not against it.",
    icon: "clock",
  },
  {
    id: "p-6",
    title: "Friendly Environment",
    body: "A workplace where people actually enjoy coming in every day.",
    icon: "smile",
  },
  {
    id: "p-7",
    title: "Supportive Staff",
    body: "Managers and teammates who have your back, from your first day onward.",
    icon: "heart-handshake",
  },
  {
    id: "p-8",
    title: "Performance Incentive",
    body: "Your results are visible and rewarded- monthly and quarterly performance bonuses.",
    icon: "trending-up",
  },
  {
    id: "p-9",
    title: "Festival Celebrations",
    body: "Diwali, Holi, and every festival in between- celebrated together as a team.",
    icon: "party-popper",
  },
  {
    id: "p-10",
    title: "Movies, Events & Outings",
    body: "Regular movie nights, team events, and outings to keep work fun.",
    icon: "film",
  },
  {
    id: "p-11",
    title: "Medical Insurance",
    body: "Health coverage that keeps you and your family protected.",
    icon: "heart-pulse",
  },
  {
    id: "p-12",
    title: "Personal Cabins",
    body: "Dedicated cabin space for focused, distraction-free work.",
    icon: "door-closed",
  },
];
