export const getStockImage = (str: string) => {
  const lowercase = str.toLowerCase();
  const uppercase = str.toUpperCase();
  try {
    return `https://eodhistoricaldata.com/img/logos/US/${uppercase}.png`;
  } catch {
    return `https://eodhistoricaldata.com/img/logos/US/${lowercase}.png`;
  }
};
