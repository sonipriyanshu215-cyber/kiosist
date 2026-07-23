export type FAQ = {
  id: string;
  question: string;
  answer: string;
};

export const faqs: FAQ[] = [
  {
    id: "f-1",
    question: "What are the shift timings?",
    answer:
      "We operate 24/7 to provide continuous support for hotel front desks across the United States. Our standard shifts are 08:30 AM–04:30 PM, 04:30 PM–12:30 AM, and 12:30 AM–08:30 AM. Shift assignments are based on business requirements and are aligned with US time zones (EST, CST, MST, and PST). Your assigned shift will be communicated during onboarding, and schedules may rotate periodically to ensure fairness and operational coverage.",
  },
  {
    id: "f-3",
    question: "Is strong English required?",
    answer:
      "Yes. Strong English communication skills are mandatory, as we interact with guests from hotels across the United States on a daily basis. Since all guest interactions take place in English, candidates should be able to communicate confidently, clearly, and professionally in both spoken and written English.",
  },
  {
    id: "f-4",
    question: "How long is the training period?",
    answer:
      "Our initial training lasts 2–3 weeks and includes theoretical and practical training, covering hotel PMS systems, guest communication, US hospitality standards, and real-time operations to prepare you for handling guests confidently.",
  },
  {
    id: "f-6",
    question: "Is this a work-from-home role?",
    answer:
      "We currently operate 100% from our Surat office. We do not offer work-from-home, as an in-office environment helps us maintain guest data confidentiality, provide real-time team support, and foster a collaborative, friendly workplace. Our office is conveniently located in the heart of Surat, making it easily accessible from all parts of the city.",
  },
  {
    id: "f-7",
    question: "What is the salary range?",
    answer:
      "We offer a competitive compensation package based on your experience, skills, and role. Salary details and additional benefits will be discussed during the interview process.",
  },
];
