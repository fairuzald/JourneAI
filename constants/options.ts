export const SelectTravelerList = [
  {
    id: 1,
    title: "Just Me",
    description: "I'm traveling alone",
    icon: "🕺",
  },
  {
    id: 2,
    title: "A Couple",
    description: "We're traveling as a couple",
    icon: "👫",
  },
  {
    id: 3,
    title: "Family",
    description: "We're traveling as a family",
    icon: "👨‍👩‍👧‍👦",
  },
  {
    id: 4,
    title: "Friends",
    description: "We're traveling as friends",
    icon: "👩‍👩‍👧‍👦",
  },
  {
    id: 5,
    title: "Business",
    description: "We're traveling for business",
    icon: "👔",
  },
];

export type SelectTravelerType = (typeof SelectTravelerList)[number];
