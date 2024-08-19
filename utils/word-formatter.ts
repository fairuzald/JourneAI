export const capitalize = (word: string): string => {
  return word
    .split(" ")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
};

export const getDaySuffix = (day: number): string => {
  if (day > 1) {
    return "days";
  }
  return "day";
};
