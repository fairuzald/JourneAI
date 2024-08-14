export const SelectTravelerList = [
  {
    id: 1,
    title: "Just Me",
    description: "I'm traveling alone",
    icon: "🕺",
    people: "1",
  },
  {
    id: 2,
    title: "A Couple",
    description: "We're traveling as a couple",
    icon: "👫",
    people: "2",
  },
  {
    id: 3,
    title: "Family",
    description: "We're traveling as a family",
    icon: "👨‍👩‍👧‍👦",
    people: "3-5",
  },
  {
    id: 4,
    title: "Friends",
    description: "We're traveling as friends",
    icon: "👩‍👩‍👧‍👦",
    people: "6-10",
  },
  {
    id: 5,
    title: "Business",
    description: "We're traveling for business",
    icon: "👔",
    people: "10+",
  },
];

export type SelectTravelerType = (typeof SelectTravelerList)[number];
