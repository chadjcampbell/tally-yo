export const chartDataOptions = (
  symbol: string | null,
  yfKey: string | null
) => {
  return {
    method: "GET",
    url: `https://yfapi.net/v8/finance/chart/${symbol}?range=1mo&region=US&interval=1d&lang=en`,
    headers: {
      "x-api-key": yfKey,
    },
  };
};

export const trendingOptions = (yfKey: string | null) => {
  return {
    method: "GET",
    url: "https://yfapi.net/v1/finance/trending/US",
    headers: {
      "x-api-key": yfKey,
    },
  };
};

export const fullDataOptions = (
  symbols: string[] | string | null,
  yfKey: string | null
) => {
  return {
    method: "GET",
    url: `https://yfapi.net/v6/finance/quote?region=US&lang=en&symbols=${symbols}`,
    headers: {
      "x-api-key": yfKey,
    },
  };
};
