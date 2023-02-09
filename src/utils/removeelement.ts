export const removeElement = (arr: string[], element: string) => {
  let arrClone = [...arr];
  arrClone.splice(
    arr.findIndex((a) => a === element),
    1
  );
  return arrClone;
};
