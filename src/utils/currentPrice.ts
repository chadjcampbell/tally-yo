import { YFStockData } from "../types/YFStockData";

export const currentPrice = (symbol: string, stockData: YFStockData[]) => {
  const findStock = stockData?.filter((stock) => stock.symbol == symbol);
  if (findStock) {
    return findStock[0].regularMarketPrice;
  } else {
    return 0;
  }
};
