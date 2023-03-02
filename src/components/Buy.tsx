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
          let cleanedData = response.data?.finance.result[0].quotes.map(
            (stock) => {
              if (onlyLettersAndNumbers(stock.symbol)) {
                return stock.symbol;
              }
            }
          );
          setCleanSymbols(cleanedData);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  useEffect(() => {
    console.log(cleanSymbols);
    const getTrendingData = async () => {
      let result = await client.getSnapshots({ symbols: cleanSymbols });
      setTrending(result);
      console.log(Object.entries(result));
      setLoading(false);
    };
    cleanSymbols && getTrendingData();
  }, [cleanSymbols]);

  false &&
    useEffect(() => {
      setTrending(trendingBackup);
      setLoading(false);
    }, []);

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
          Object.entries(trending).map((stock) => (
            <Card shadow="lg" m="3" p="3" key={stock[0]}>
              <CardHeader>{stock[0]}</CardHeader>
              <CardBody>
                <VStack>
                  <Image
                    boxSize="100px"
                    objectFit="cover"
                    src={getStockImage(stock[0])}
                    fallbackSrc="../noImage.jpg"
                    alt={stock[0]}
                  />
                  <Button colorScheme="teal">More Info</Button>
                </VStack>
              </CardBody>
            </Card>
          ))
        )}
      </Flex>
    </VStack>
  );
};

export default Buy;
