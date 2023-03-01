export const onlyLettersAndNumbers = (str: string) => {
  return Boolean(str.match(/^[A-Za-z0-9]*$/));
};
