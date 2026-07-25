export type Value = {
  id: string;
  title: string;
  body: string;
  icon: "award" | "lightbulb" | "handshake" | "trending-up" | "heart" | "refresh-cw";
};

export const values: Value[] = [
  {
    id: "v-1",
    title: "Excellence",
    body: "We don't settle for simply getting the job done. We strive to deliver our best in every interaction, every task, and every guest experience.",
    icon: "award",
  },
  {
    id: "v-2",
    title: "Innovation",
    body: "We believe there is always a better way to do things. We embrace new ideas, technology, and creative thinking to continuously improve how we work.",
    icon: "lightbulb",
  },
  {
    id: "v-3",
    title: "Teamwork",
    body: "Great things happen when people work together. We support one another, share knowledge, and understand that every individual contributes to the success of the team.",
    icon: "handshake",
  },
  {
    id: "v-4",
    title: "Betterment",
    body: "We believe in continuous improvement- of ourselves, our processes, our technology, and the experiences we create. Every day is an opportunity to be better than yesterday.",
    icon: "trending-up",
  },
  {
    id: "v-5",
    title: "People First",
    body: "Behind every system, process, and interaction are people. We value empathy, respect, and genuine human connection in everything we do.",
    icon: "heart",
  },
  {
    id: "v-6",
    title: "Adaptability",
    body: "Hospitality is constantly changing, and so are we. We stay open-minded, embrace change, and adapt with confidence.",
    icon: "refresh-cw",
  },
];
