import {
  Card,
  CardHeader,
  CardBody,
  VStack,
  Button,
  Text,
  HStack,
  Box,
} from "@chakra-ui/react";
import PercentBox from "./PercentBox";

const StockCard = ({ stock }) => {
  return (
    <Card w="250px" h="250px" shadow="lg" m="3" p="3">
      <CardHeader>
        <VStack alignItems="left">
          <Text> {stock.symbol}</Text>
          <Text> {stock.shortName}</Text>
        </VStack>
      </CardHeader>
      <CardBody mx="auto">
        <HStack display="flex" alignItems="space-between">
          <VStack>
            <Text>${stock.regularMarketPrice}</Text>
            <PercentBox percent={stock.regularMarketChangePercent} />
          </VStack>
          <Button alignSelf="bottom" colorScheme="teal">
            Info
          </Button>
        </HStack>
      </CardBody>
    </Card>
  );
};

export default StockCard;
