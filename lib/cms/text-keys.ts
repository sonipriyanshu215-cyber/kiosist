// Registry of editable freeform text. Kept deliberately small: only plain
// paragraph/label copy is here- headline elements that embed a styled
// highlighted span (color-cycle text, gradient shimmer) stay hardcoded in
// their component, since a single plain-text field can't represent "some
// words in a different color" without a much larger rich-text schema.
export const TEXT_KEYS = [
  {
    key: "about.hero.subtitle",
    label: "About page - hero subtitle",
    fallback: "We are the leading service provider for remotely operating front desks for hotels based in the US.",
  },
  {
    key: "career.hero.blurb",
    label: "Career page - hero CTA card blurb",
    fallback: "Join the team building the future of remote hospitality.",
  },
  {
    key: "contact.hero.subtitle",
    label: "Contact page - hero subtitle",
    fallback:
      "Whether you have a question, want to explore opportunities, or simply want to know more about Kiosist, we'd love to hear from you.",
  },
  {
    key: "nav.cta.label",
    label: "Nav bar - \"Join Us\" button label",
    fallback: "Join Us",
  },
] as const;
