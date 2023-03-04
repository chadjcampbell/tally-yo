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
  Image,
  CardHeader,
  CardBody,
} from "@chakra-ui/react";
import { AlpacaClient } from "@master-chief/alpaca";
import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import { trendingBackup } from "../utils/backupTrending";
import { getStockImage } from "../utils/getStockImage";
import { onlyLettersAndNumbers } from "../utils/onlyLettersAndNumbers";
import Loading from "./Loading";
import StockCard from "./StockCard";

type TrendingStocks = {
  finance: {
    result: {
      count: number;
      quotes: {
        symbol: string;
      }[];
      jobTimestamp: number;
      startInterval: number;
    }[];
    error: null;
  };
};

const Buy = () => {
  const API_KEY = import.meta.env.VITE_KEY;
  const API_SECRET = import.meta.env.VITE_SECRET;
  const TRENDING_KEY = import.meta.env.VITE_TRENDING;

  const [trending, setTrending] = useState(null);
  const [cleanSymbols, setCleanSymbols] = useState(null);
  const [loading, setLoading] = useState(true);

  const client = new AlpacaClient({
    credentials: {
      key: API_KEY,
      secret: API_SECRET,
      paper: true,
    },
    rate_limit: true,
  });

  useEffect(() => {
    if (trending === null) {
      const options = {
        method: "GET",
        url: "https://yfapi.net/v1/finance/trending/US",
        params: { modules: "defaultKeyStatistics,assetProfile" },
        headers: {
          "x-api-key": TRENDING_KEY,
        },
      };
      axios
        .request(options)
        .then((response) => {
          //reduce stocks out that have special characters
          //alpaca stock api doesn't work with special character stocks
          const cleanedData = response.data?.finance.result[0].quotes.reduce(
            (result, stock) => {
              if (onlyLettersAndNumbers(stock.symbol)) {
                result.push(stock.symbol);
              }
              return result;
            },
            []
          );
          setCleanSymbols(cleanedData);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  useEffect(() => {
    const getTrendingData = async () => {
      const result = await client.getSnapshots({ symbols: cleanSymbols });
      //reduce the result to make sure only valid data is in state
      //alpaca api can return 'undefined' on some stocks
      const validSnapshot = Object.entries(result).reduce((result, stock) => {
        if (stock[1]) {
          result.push(stock);
        }
        return result;
      }, []);
      console.log(validSnapshot);
      setTrending(validSnapshot);
      setLoading(false);
    };
    cleanSymbols && getTrendingData();
  }, [cleanSymbols]);

  const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const searchStock = e.currentTarget.stockName.value;
    let result = await client.getSnapshot({ symbol: `${searchStock}` });
    console.log(result);
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
          trending?.map((stock) => <StockCard stock={stock} key={stock[0]} />)
        )}
      </Flex>
    </VStack>
  );
};

export default Buy;
