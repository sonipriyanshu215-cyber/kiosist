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
    id: "fl-001",
    brand: "Super 8",
    property: "Super 8 by Wyndham",
    city: "Orlando",
    state: "Florida",
    coordinates: [-81.379, 28.538],
    logoUrl: "/img/logos/Super-8-Logo.png",
  },
  {
    id: "az-001",
    brand: "Motel 6",
    property: "Motel 6",
    city: "Phoenix",
    state: "Arizona",
    coordinates: [-112.074, 33.448],
    logoUrl: "/img/logos/Motel6 logo.png",
  },
  {
    id: "ca-001",
    brand: "Howard Johnson",
    property: "Howard Johnson by Wyndham",
    city: "Sacramento",
    state: "California",
    coordinates: [-121.4944, 38.5816],
    logoUrl: "/img/logos/Howard-Johnson-logo.png",
  },
  {
    id: "in-001",
    brand: "Days Inn",
    property: "Days Inn by Wyndham",
    city: "Indianapolis",
    state: "Indiana",
    coordinates: [-86.1581, 39.7684],
    logoUrl: "/img/logos/Days Inn.png",
  },
  {
    id: "ky-001",
    brand: "Kiosist Partner Hotel",
    property: "Kiosist Partner Hotel",
    city: "Louisville",
    state: "Kentucky",
    coordinates: [-85.7585, 38.2527],
  },
  {
    id: "sc-001",
    brand: "Kiosist Partner Hotel",
    property: "Kiosist Partner Hotel",
    city: "Columbia",
    state: "South Carolina",
    coordinates: [-81.0348, 34.0007],
  },
  {
    id: "ia-001",
    brand: "Kiosist Partner Hotel",
    property: "Kiosist Partner Hotel",
    city: "Des Moines",
    state: "Iowa",
    coordinates: [-93.6091, 41.5868],
  },
  {
    id: "oh-001",
    brand: "Days Inn & Suites",
    property: "Days Inn & Suites by Wyndham",
    city: "Columbus",
    state: "Ohio",
    coordinates: [-82.9988, 39.9612],
    logoUrl: "/img/logos/gilman-logo-days-inn.png",
  },
  {
    id: "tx-001",
    brand: "Holiday Inn",
    property: "Holiday Inn Express",
    city: "Dallas",
    state: "Texas",
    coordinates: [-96.797, 32.776],
    logoUrl: "/img/logos/holiday-inn.svg",
  },
  {
    id: "va-001",
    brand: "Kiosist Partner Hotel",
    property: "Kiosist Partner Hotel",
    city: "Richmond",
    state: "Virginia",
    coordinates: [-77.436, 37.5407],
  },
  {
    id: "wv-001",
    brand: "Kiosist Partner Hotel",
    property: "Kiosist Partner Hotel",
    city: "Charleston",
    state: "West Virginia",
    coordinates: [-81.6326, 38.3498],
  },
  {
    id: "va-002",
    brand: "Kiosist Partner Hotel",
    property: "Kiosist Partner Hotel",
    city: "Franklin",
    state: "Franklin, Virginia",
    coordinates: [-76.9224, 36.6907],
  },
  {
    id: "la-001",
    brand: "Kiosist Partner Hotel",
    property: "Kiosist Partner Hotel",
    city: "New Orleans",
    state: "Louisiana",
    coordinates: [-90.0715, 29.9511],
  },
  {
    id: "al-001",
    brand: "Kiosist Partner Hotel",
    property: "Kiosist Partner Hotel",
    city: "Birmingham",
    state: "Alabama",
    coordinates: [-86.8025, 33.5186],
  },
  {
    id: "ga-001",
    brand: "Americas Best Value Inn",
    property: "ABV Inn",
    city: "Atlanta",
    state: "Georgia",
    coordinates: [-84.388, 33.749],
    logoUrl: "/img/logos/Americas_Best_Value_Inn_Logo.png",
    testimonial: {
      quote:
        "Kiosist has helped us greatly with our check-in process. Our guests love the seamless experience.",
      author: "Rakesh Patel",
      rating: 5,
    },
  },
  {
    id: "ny-001",
    brand: "Kiosist Partner Hotel",
    property: "Kiosist Partner Hotel",
    city: "New York City",
    state: "New York",
    coordinates: [-74.006, 40.7128],
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
