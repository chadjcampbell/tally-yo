export const getStockImage = (str: string) => {
  const uppercase = str.toUpperCase();
  return `https://eodhistoricaldata.com/img/logos/US/${uppercase}.png`;
};
