import {
  Card,
  CardHeader,
  CardBody,
  VStack,
  Button,
  Text,
  HStack,
  Box,
  Flex,
} from "@chakra-ui/react";
import { round } from "../utils/round";
import PercentBox from "./PercentBox";

const StockCard = ({ stock }) => {
  return (
    <Card w="250px" h="250px" shadow="lg" m="3" p="3">
      <CardHeader>
        <VStack align="left">
          <Text> {stock.symbol}</Text>
          <Text> {stock.shortName}</Text>
        </VStack>
      </CardHeader>
      <CardBody mx="auto">
        <HStack display="flex" alignItems="space-between">
          <VStack align="left">
            <Text pl="1">${round(stock.regularMarketPrice)}</Text>
            <PercentBox percent={stock.regularMarketChangePercent} />
          </VStack>
          <Flex alignItems="end">
            <Button alignSelf="bottom" colorScheme="teal">
              Info
            </Button>
          </Flex>
        </HStack>
      </CardBody>
    </Card>
  );
};

export default StockCard;
