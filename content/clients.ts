export type Client = {
  id: string;
  brand: string;
  property: string;
  city: string;
  state: string;
  coordinates: [number, number]; // [lng, lat]
  testimonial?: { quote: string; author: string; rating: 1 | 2 | 3 | 4 | 5 };
  logoUrl?: string;
};

export const clients: Client[] = [
  {
    id: "abv-001",
    brand: "Americas Best Value Inn",
    property: "ABV Inn",
    city: "Atlanta",
    state: "GA",
    coordinates: [-84.388, 33.749],
    testimonial: {
      quote:
        "Kiosist has helped us greatly with our check-in process. Our guests love the seamless experience.",
      author: "Rakesh Patel",
      rating: 5,
    },
  },
  {
    id: "hi-001",
    brand: "Holiday Inn",
    property: "Holiday Inn Express",
    city: "Dallas",
    state: "TX",
    coordinates: [-96.797, 32.776],
  },
  {
    id: "mi-001",
    brand: "Microtel",
    property: "Microtel Inn & Suites",
    city: "Charlotte",
    state: "NC",
    coordinates: [-80.843, 35.227],
  },
  {
    id: "la-001",
    brand: "La Quinta",
    property: "La Quinta by Wyndham",
    city: "Houston",
    state: "TX",
    coordinates: [-95.369, 29.76],
  },
  {
    id: "mo-001",
    brand: "Motel 6",
    property: "Motel 6",
    city: "Phoenix",
    state: "AZ",
    coordinates: [-112.074, 33.448],
  },
  {
    id: "su-001",
    brand: "Super 8",
    property: "Super 8 by Wyndham",
    city: "Orlando",
    state: "FL",
    coordinates: [-81.379, 28.538],
  },
  {
    id: "ec-001",
    brand: "Econo Lodge",
    property: "Econo Lodge",
    city: "Nashville",
    state: "TN",
    coordinates: [-86.782, 36.162],
  },
  {
    id: "ro-001",
    brand: "Rodeway Inn",
    property: "Rodeway Inn & Suites",
    city: "Las Vegas",
    state: "NV",
    coordinates: [-115.137, 36.175],
  },
];

export const brandLogos = [
  { name: "Americas Best Value Inn", logoUrl: "/img/logos/abv.svg" },
  { name: "Holiday Inn", logoUrl: "/img/logos/holiday-inn.svg" },
  { name: "Microtel", logoUrl: "/img/logos/microtel.svg" },
  { name: "La Quinta", logoUrl: "/img/logos/laquinta.svg" },
  { name: "Motel 6", logoUrl: "/img/logos/motel6.svg" },
  { name: "Super 8", logoUrl: "/img/logos/super8.svg" },
  { name: "Econo Lodge", logoUrl: "/img/logos/econolodge.svg" },
  { name: "Rodeway Inn", logoUrl: "/img/logos/rodeway.svg" },
  { name: "Days Inn", logoUrl: "/img/logos/daysinn.svg" },
  { name: "Comfort Inn", logoUrl: "/img/logos/comfort.svg" },
];
