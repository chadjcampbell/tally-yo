import { Box, Flex, Text } from "@chakra-ui/react";
import { DocumentData } from "firebase/firestore";
import { YFStockData } from "../types/YFStockData";
import { currentPrice } from "../utils/currentPrice";
import { firebaseStockInfo } from "./Sell";

type PortfolioSummaryProps = {
  userInfo: DocumentData | null;
  stockData: YFStockData[] | null;
};

const PortfolioSummary = ({ userInfo, stockData }: PortfolioSummaryProps) => {
  const totalStockValue = () => {
    if (userInfo && stockData) {
      var stockTotalsArray = userInfo.stocks.map(
        (stock: firebaseStockInfo) =>
          stock.quantity * currentPrice(stock.stock, stockData)
      );
    }
    return stockTotalsArray.reduce(
      (partialSum: number, a: number) => partialSum + a,
      0
    );
  };

  return (
    <Flex wrap="wrap" mb="2" justify="center">
      <Box m="2" shadow="lg" bgColor="white" borderRadius="md" p="1">
        <Text>Cash:</Text>
        {userInfo ? (
          <Text color="blue.600" fontSize="2xl">
            $
            {userInfo?.tally.toLocaleString("en-US", {
              minimumFractionDigits: 2,
            })}
          </Text>
        ) : (
          <Text color="blue.600" fontSize="2xl">
            Loading...
          </Text>
        )}
      </Box>{" "}
      <Box
        display="flex"
        alignItems="center"
        bgColor="white"
        borderRadius="md"
        p="1"
        fontSize="3xl"
      >
        +
      </Box>
      <Box m="2" shadow="lg" bgColor="white" borderRadius="md" p="1">
        <Text>Stocks:</Text>
        {userInfo ? (
          <Text color="blue.600" fontSize="2xl">
            $
            {totalStockValue().toLocaleString("en-US", {
              minimumFractionDigits: 2,
            })}
          </Text>
        ) : (
          <Text color="blue.600" fontSize="2xl">
            Loading...
          </Text>
        )}
      </Box>
      <Box
        display="flex"
        alignItems="center"
        bgColor="white"
        borderRadius="md"
        p="1"
        fontSize="3xl"
      >
        =
      </Box>
      <Box m="2" shadow="lg" bgColor="white" borderRadius="md" p="1">
        <Text>Net Worth:</Text>
        {userInfo ? (
          <Text color="blue.600" fontSize="2xl">
            $
            {(totalStockValue() + userInfo.tally).toLocaleString("en-US", {
              minimumFractionDigits: 2,
            })}
          </Text>
        ) : (
          <Text color="blue.600" fontSize="2xl">
            Loading...
          </Text>
        )}
      </Box>
    </Flex>
  );
};

export default PortfolioSummary;
