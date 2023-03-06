import {
  Button,
  Card,
  Text,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Input,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import Loading from "./Loading";
import StockCard from "./StockCard";

const YF_KEY = import.meta.env.VITE_YF;

const Buy = () => {
  const [trendingSymbols, setTrendingSymbols] = useState<string[] | null>(null);
  const [trendingData, setTrendingData] = useState([]);
  const [loading, setLoading] = useState(true);

  const trendingOptions = {
    method: "GET",
    url: "https://yfapi.net/v1/finance/trending/US",
    headers: {
      accept: "application/json",
      "x-api-key": YF_KEY,
    },
  };

  const fullDataOptions = {
    method: "GET",
    url: `https://yfapi.net/v6/finance/quote?region=US&lang=en&symbols=${trendingSymbols}`,
    headers: {
      accept: "application/json",
      "x-api-key": YF_KEY,
    },
  };

  //fetch trending stock symbols
  useEffect(() => {
    if (trendingSymbols === null) {
      axios
        .request(trendingOptions)
        .then((response) => {
          //map through api response to get an array of stock symbols
          const trendingSymbolsResponse =
            response.data.finance.result[0].quotes.map(
              (stock: { symbol: string }) => stock.symbol
            );
          const trimmedStocks = trendingSymbolsResponse.slice(0, 10);
          setTrendingSymbols(trimmedStocks);
          console.log(trimmedStocks);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  //if trendingSymbols have been fetched, get full data for each
  useEffect(() => {
    const getTrendingData = async () => {
      axios
        .request(fullDataOptions)
        .then((response) => {
          //map through api response to get an array of stock symbols
          const fullDataResponse = response.data.quoteResponse.result.map(
            (stockData) => stockData
          );
          setTrendingData(fullDataResponse);
          setLoading(false);
          console.log(fullDataResponse);
        })
        .catch((error) => {
          console.error(error);
        });
    };
    trendingSymbols && getTrendingData();
  }, [trendingSymbols]);

  const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const searchStock = e.currentTarget.stockName.value;
  };

  return (
    <VStack>
      <Flex align="center" justify="center" mb="5">
        <Card p="3" shadow="lg">
          <form onSubmit={(e) => handleSearch(e)}>
            <FormControl>
              <FormLabel textAlign="center">Search for a stock</FormLabel>
              <HStack>
                <Input id="stockName" max="10" type="text" />
                <Button colorScheme="teal" type="submit">
                  Search
                </Button>
              </HStack>
              <FormHelperText textAlign="center">e.g. 'twtr' </FormHelperText>
            </FormControl>
          </form>
        </Card>
      </Flex>
      <Text fontSize="2xl" as="u">
        Trending Stocks
      </Text>
      <Flex wrap="wrap" align="center" justify="center">
        {loading ? (
          <Loading />
        ) : (
          trendingData?.map((stock) => (
            <StockCard stock={stock} key={stock.shortName} />
          ))
        )}
      </Flex>
    </VStack>
  );
};

export default Buy;
