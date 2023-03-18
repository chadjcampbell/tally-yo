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
  const [loading, setLoading] = useState(true);
  const { yfKey } = useContext(AuthContext);

  const trendingOptions = {
    method: "GET",
    url: "https://yfapi.net/v1/finance/trending/US",
    headers: {
      accept: "application/json",
      "x-api-key": yfKey,
    },
  };

  const fullDataOptions = (symbols: string[] | null) => {
    return {
      method: "GET",
      url: `https://yfapi.net/v6/finance/quote?region=US&lang=en&symbols=${symbols}`,
      headers: {
        accept: "application/json",
        "x-api-key": yfKey,
      },
    };
  };

  //fetch trending stock symbols
  false &&
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
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }, []);

  //if trendingSymbols have been fetched, get full data for each
  false &&
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
          });
      };
      trendingSymbols && getTrendingData();
    }, [trendingSymbols]);

  //CURRENT REAL API FETCHES ARE FALSED TO SAVE API LIMIT, USING BACKUP
  useEffect(() => {
    setTrendingData(trendingBackup as YFStockData[]);
    setLoading(false);
  }, []);

  const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const searchStock = e.currentTarget.stockName.value;
    if (searchStock !== "") {
      axios
        .request(fullDataOptions(searchStock))
        .then((response) => {
          setSearchResult(response.data.quoteResponse.result[0]);

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
              <FormHelperText textAlign="center">e.g. 'twtr' </FormHelperText>
            </FormControl>
          </form>
        </Card>
      </Flex>
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
