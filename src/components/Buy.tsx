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
import axios from "axios";
import { FormEvent, useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { YFStockData } from "../types/YFStockData";
import { trendingBackup } from "../utils/backupTrending";
import Loading from "./Loading";
import StockCard from "./StockCard";

const Buy = () => {
  const [trendingSymbols, setTrendingSymbols] = useState<string[] | null>(null);
  const [trendingData, setTrendingData] = useState<YFStockData[] | null>(null);
  const [searchResult, setSearchResult] = useState<YFStockData | null>(null);
  const [badSearch, setBadSearch] = useState(false);
  const [loading, setLoading] = useState(true);
  const { yfKey } = useContext(AuthContext);

  const trendingOptions = {
    method: "GET",
    url: "https://yfapi.net/v1/finance/trending/US",
    headers: {
      "x-api-key": yfKey,
    },
  };

  const fullDataOptions = (symbols: string[] | null) => {
    return {
      method: "GET",
      url: `https://yfapi.net/v6/finance/quote?region=US&lang=en&symbols=${symbols}`,
      headers: {
        "x-api-key": yfKey,
      },
    };
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
          //slice top 10 since the full data quote only supports 10 stocks
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
    const getTrendingData = () => {
      axios
        .request(fullDataOptions(trendingSymbols))
        .then((response) => {
          setTrendingData(response.data.quoteResponse.result);
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setTrendingData(trendingBackup as YFStockData[]);
          setLoading(false);
        });
    };
    trendingSymbols && getTrendingData();
  }, [trendingSymbols]);

  const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const searchStock = e.currentTarget.stockName.value;
    if (searchStock !== "") {
      axios
        .request(fullDataOptions(searchStock))
        .then((response) => {
          if (response.data.quoteResponse.result.length === 0) {
            setBadSearch(true);
            setSearchResult(null);
          } else {
            setBadSearch(false);
            setSearchResult(response.data.quoteResponse.result[0]);
          }
          const formTarget = e.target as HTMLFormElement;
          formTarget.reset();
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <VStack>
      <Flex align="center" justify="center" mb="5">
        <Card p="3" shadow="lg">
          <form onSubmit={(e) => handleSearch(e)}>
            <FormControl>
              <FormLabel textAlign="center">Search for a stock</FormLabel>
              <HStack>
                <Input autoFocus id="stockName" max="10" type="text" />
                <Button colorScheme="teal" type="submit">
                  Search
                </Button>
              </HStack>
              <FormHelperText textAlign="center">e.g. 'msft' </FormHelperText>
            </FormControl>
          </form>
        </Card>
      </Flex>
      {badSearch && (
        <Card w="250px" h="250px" shadow="lg" m="3" p="3">
          <CardHeader fontSize="lg" textAlign="center">
            No stock found
          </CardHeader>
          <CardBody textAlign="center">Please try again</CardBody>
        </Card>
      )}
      {searchResult && (
        <Flex align="center" justify="center" mb="5">
          <StockCard stock={searchResult} key={searchResult.shortName} />
        </Flex>
      )}
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
