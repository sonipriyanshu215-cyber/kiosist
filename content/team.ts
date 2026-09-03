// `pos` sets where the circular avatar crop is anchored so every headshot
// frames the face the same way. "top" suits most head-and-shoulders
// portraits; "center"/"bottom" are escape hatches for an oddly-framed
// photo. Legacy rows may still hold a raw Tailwind class like "object-top"-
// TeamMosaic tolerates both.
export type TeamMember = {
  name: string;
  img?: string;
  tag: string;
  pos?: "top" | "center" | "bottom" | (string & {});
};

export const team: TeamMember[] = [
  { name: "Henal Dalal", img: "/img/team/ceo.webp", tag: "FOUNDER", pos: "top" },
  { name: "Bhavin Dalal", img: "/img/team/t6.webp", tag: "FOUNDER", pos: "top" },
  { name: "Vinit Patel", img: "/img/team/t2.webp", tag: "CEO", pos: "top" },
  { name: "Parshva Shah", img: "/img/team/t8.webp", tag: "Assistant General Manager", pos: "top" },
  { name: "Sourabh Patil", img: "/img/team/t5.webp", tag: "Team Leader", pos: "top" },
  { name: "Smeet Rawal", img: "/img/team/t9.webp", tag: "Team Leader", pos: "top" },
];
