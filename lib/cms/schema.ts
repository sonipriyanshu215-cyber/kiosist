// Field schema for the generic /admin/content/[collection] editor. Each
// entry describes one form field; `key` is a dot-path into the item object
// (numeric segments index into arrays, e.g. "coordinates.0"), read/written
// with the getPath/setPath helpers below.
export type FieldType = "text" | "textarea" | "number" | "select" | "image";

export type FieldDef = {
  key: string;
  label: string;
  type: FieldType;
  options?: string[];
  required?: boolean;
};

export type CollectionConfig = {
  label: string;
  description: string;
  fields: FieldDef[];
  titleField: string; // which field's value to show in the item list
  emptyItem: Record<string, unknown> | string;
};

export const COLLECTION_CONFIG: Record<string, CollectionConfig> = {
  values: {
    label: "Values",
    description: "The value cards on the About page.",
    titleField: "title",
    fields: [
      { key: "title", label: "Title", type: "text", required: true },
      { key: "body", label: "Body", type: "textarea", required: true },
      {
        key: "icon",
        label: "Icon",
        type: "select",
        options: ["award", "lightbulb", "handshake", "trending-up", "heart", "refresh-cw"],
        required: true,
      },
    ],
    emptyItem: { id: "", title: "", body: "", icon: "award" },
  },
  faqs: {
    label: "FAQs",
    description: "Frequently asked questions on the Career page.",
    titleField: "question",
    fields: [
      { key: "question", label: "Question", type: "text", required: true },
      { key: "answer", label: "Answer", type: "textarea", required: true },
    ],
    emptyItem: { id: "", question: "", answer: "" },
  },
  milestones: {
    label: "Milestones",
    description: "The pinned-scroll story timeline on the About page.",
    titleField: "title",
    fields: [
      { key: "year", label: "Step number", type: "text", required: true },
      { key: "title", label: "Title", type: "text", required: true },
      { key: "body", label: "Body", type: "textarea", required: true },
    ],
    emptyItem: { id: "", year: "", title: "", body: "" },
  },
  journey_years: {
    label: "Journey Years",
    description: "The year-by-year strip alongside the milestones timeline.",
    titleField: "year",
    fields: [
      { key: "year", label: "Year", type: "text", required: true },
      { key: "caption", label: "Caption", type: "text", required: true },
      { key: "body", label: "Body", type: "textarea", required: true },
    ],
    emptyItem: { year: "", caption: "", body: "" },
  },
  perks: {
    label: "Perks",
    description: "The perks grid on the Career page.",
    titleField: "title",
    fields: [
      { key: "title", label: "Title", type: "text", required: true },
      { key: "body", label: "Body", type: "textarea", required: true },
      {
        key: "icon",
        label: "Icon",
        type: "select",
        options: [
          "calendar-check", "cake", "gift", "wallet", "clock", "smile",
          "heart-handshake", "trending-up", "party-popper", "film", "heart-pulse", "door-closed",
        ],
        required: true,
      },
    ],
    emptyItem: { id: "", title: "", body: "", icon: "smile" },
  },
  clients: {
    label: "Clients",
    description: "Pins on the USA client map (Clients page).",
    titleField: "property",
    fields: [
      { key: "brand", label: "Brand", type: "text", required: true },
      { key: "property", label: "Property name", type: "text", required: true },
      { key: "city", label: "City", type: "text", required: true },
      { key: "state", label: "State", type: "text", required: true },
      { key: "coordinates.0", label: "Longitude", type: "number", required: true },
      { key: "coordinates.1", label: "Latitude", type: "number", required: true },
      { key: "logoUrl", label: "Logo URL", type: "text" },
      { key: "testimonial.quote", label: "Testimonial quote", type: "textarea" },
      { key: "testimonial.author", label: "Testimonial author", type: "text" },
      { key: "testimonial.rating", label: "Testimonial rating (1-5)", type: "number" },
    ],
    emptyItem: { id: "", brand: "", property: "", city: "", state: "", coordinates: [0, 0] },
  },
  team: {
    label: "Team",
    description: "The \"Meet The Experts\" leadership cards on the About page. Upload each person's photo directly on their card.",
    titleField: "name",
    fields: [
      { key: "name", label: "Name", type: "text", required: true },
      { key: "tag", label: "Title / role", type: "text", required: true },
      { key: "img", label: "Photo", type: "image" },
    ],
    emptyItem: { name: "", tag: "", img: "" },
  },
  roles: {
    label: "Career Roles",
    description: "Options in the application form's \"Role of Interest\" dropdown.",
    titleField: "",
    fields: [{ key: "", label: "Role name", type: "text", required: true }],
    emptyItem: "",
  },
};

export function getPath(obj: unknown, path: string): unknown {
  if (path === "") return obj;
  return path.split(".").reduce<unknown>((acc, segment) => {
    if (acc == null) return undefined;
    return (acc as Record<string, unknown>)[segment];
  }, obj);
}

export function setPath<T>(obj: T, path: string, value: unknown): T {
  if (path === "") return value as T;
  const segments = path.split(".");
  const root: Record<string, unknown> = Array.isArray(obj) ? [...(obj as unknown[])] as unknown as Record<string, unknown> : { ...(obj as Record<string, unknown>) };
  let cursor: Record<string, unknown> = root;

  segments.forEach((segment, i) => {
    const isLast = i === segments.length - 1;
    if (isLast) {
      cursor[segment] = value;
      return;
    }
    const nextSegment = segments[i + 1];
    const nextIsArrayIndex = /^\d+$/.test(nextSegment);
    const existing = cursor[segment];
    const cloned =
      existing && typeof existing === "object"
        ? Array.isArray(existing)
          ? [...existing]
          : { ...(existing as Record<string, unknown>) }
        : nextIsArrayIndex
          ? []
          : {};
    cursor[segment] = cloned;
    cursor = cloned as Record<string, unknown>;
  });

  return root as unknown as T;
}
