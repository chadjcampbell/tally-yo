export const getStockImage = async (str: string) => {
  const lowercase = str.toLowerCase();
  const uppercase = str.toUpperCase();
  return `https://eodhistoricaldata.com/img/logos/US/${lowercase}.png`;
};
