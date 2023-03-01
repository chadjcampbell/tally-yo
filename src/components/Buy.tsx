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
  CardHeader,
  CardBody,
} from "@chakra-ui/react";
import { AlpacaClient } from "@master-chief/alpaca";
import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import { trendingBackup } from "../utils/backupTrending";
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

  const [trending, setTrending] = useState<TrendingStocks | null>(null);
  const [loading, setLoading] = useState(true);

  const client = new AlpacaClient({
    credentials: {
      key: API_KEY,
      secret: API_SECRET,
      paper: true,
    },
    rate_limit: true,
  });

  false &&
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
          .then(function (response) {
            console.log(response.data);
            setTrending(response.data);
            setLoading(false);
          })
          .catch(function (error) {
            console.error(error);
          });
      }
    }, []);

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
          trending?.finance.result[0].quotes.map((stock) => (
            <Card shadow="lg" m="3" p="3" key={stock.symbol}>
              <CardHeader>{stock.symbol}</CardHeader>
              <CardBody>
                <Button>More Info</Button>
              </CardBody>
            </Card>
          ))
        )}
      </Flex>
    </VStack>
  );
};

export default Buy;
