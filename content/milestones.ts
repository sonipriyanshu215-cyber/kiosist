export type Milestone = {
  id: string;
  year: string;
  title: string;
  body: string;
};

export const milestones: Milestone[] = [
  {
    id: "m-problem",
    year: "01",
    title: "The Problem",
    body: "Staffing shouldn't come at the cost of hospitality. Hotels struggled to find and retain reliable front desk staff- especially for round-the-clock operations.",
  },
  {
    id: "m-reality",
    year: "02",
    title: "The Reality",
    body: "A guest never stops needing help. A late-night arrival, a missed call, or an unanswered question can shape a guest's entire experience.",
  },
  {
    id: "m-solution",
    year: "03",
    title: "The Solution",
    body: "What if the front desk could always be there? Kiosist began with a simple idea: combine skilled people and technology to deliver reliable virtual front desk support.",
  },
  {
    id: "m-beginning",
    year: "04",
    title: "The Beginning",
    body: "One person. One vision. One room. It started with one person traveling to the USA to understand the problem firsthand and a team of 3 supporting our first hotel.",
  },
  {
    id: "m-journey",
    year: "05",
    title: "The Journey",
    body: "From one hotel to 100+ properties. Through innovation, research, technology, and an ever-growing team, Kiosist continued to evolve.",
  },
  {
    id: "m-today",
    year: "06",
    title: "Today",
    body: "A bigger team, a bigger vision- 170+ employees, 100+ properties, 2 offices. One shared purpose: exceptional hospitality.",
  },
];

export const journeyYears = [
  { year: "2019", caption: "The idea was born.", body: "Kiosist began its journey." },
  { year: "2020", caption: "First hotel onboarded.", body: "A team of 3 took the first step." },
  { year: "2021", caption: "Laying the foundation.", body: "More hotels. More team members." },
  { year: "2022-2023", caption: "Scaling with trust.", body: "Strengthening systems, processes & technology." },
  { year: "2024-2025", caption: "Growing together.", body: "Expanding partnerships. Delivering excellence." },
  { year: "2026", caption: "The journey continues…", body: "The best is yet to come!" },
];
