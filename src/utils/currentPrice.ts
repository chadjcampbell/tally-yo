import { YFStockData } from "../types/YFStockData";

export const currentPrice = (symbol: string, stockData: YFStockData[]) => {
  const findStock = stockData?.filter((stock) => stock.symbol == symbol);
  if (findStock) {
    console.log(findStock[0]);
    return findStock[0].regularMarketPrice;
  } else {
    return 0;
  }
};
