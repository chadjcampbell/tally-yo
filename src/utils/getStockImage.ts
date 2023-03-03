export const getStockImage = (str: string) => {
  const lowercase = str.toLowerCase();
  const uppercase = str.toUpperCase();
  return `https://eodhistoricaldata.com/img/logos/US/${lowercase}.png`;
};

// uplead logo urls?
// https://logo.uplead.com/amazon.com
