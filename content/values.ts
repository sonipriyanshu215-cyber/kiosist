export type Value = {
  id: string;
  title: string;
  body: string;
  icon: "award" | "lightbulb" | "users" | "trending-up";
};

export const values: Value[] = [
  {
    id: "v-1",
    title: "Excellence",
    body: "We hold ourselves to the highest standard in every guest interaction, every shift, every time.",
    icon: "award",
  },
  {
    id: "v-2",
    title: "Innovation",
    body: "We're always refining our systems, tools, and training to serve smarter, not just harder.",
    icon: "lightbulb",
  },
  {
    id: "v-3",
    title: "Team Work",
    body: "Agents, ops, and leadership move as one- great outcomes come from working together.",
    icon: "users",
  },
  {
    id: "v-4",
    title: "Betterment",
    body: "We invest in growth- for our people, our process, and every guest we serve.",
    icon: "trending-up",
  },
];
