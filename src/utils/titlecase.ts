export const titleCase = (myStr: string): string => {
  const titled = myStr
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.substring(1))
    .join(" ");
  return titled;
};
