export const SelectBudgetList = [
  {
    id: 1,
    title: "Cheap",
    description: "Stay consious of budget",
    icon: "💰",
  },
  {
    id: 2,
    title: "Moderate",
    description: "Stay in the middle",
    icon: "💸",
  },
  {
    id: 3,
    title: "Expensive",
    description: "Go all out",
    icon: "💳",
  },
];

export const findBudgetById = (id: number) => {
  return SelectBudgetList.find((item) => item.id === id);
};

export type SelectTravelerType = (typeof SelectBudgetList)[number];
