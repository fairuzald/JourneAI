export const ReviewLabel = [
  {
    id: 1,
    title: "Destination",
    icon: "📍",
  },
  {
    id: 2,
    title: "Date",
    icon: "📅",
  },
  {
    id: 3,
    title: "Traveler",
    icon: "👨‍👩‍👧‍👦",
  },
  {
    id: 4,
    title: "Budget",
    icon: "💰",
  },
];

export type ReviewLabelType = (typeof ReviewLabel)[number];
