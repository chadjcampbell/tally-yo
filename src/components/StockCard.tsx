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
    <Card shadow="lg" m="3" p="3">
      <CardHeader>
        <VStack>
          <Text> {stock.symbol}</Text>
          <Text> {stock.shortName}</Text>
        </VStack>
      </CardHeader>
      <CardBody>
        <HStack>
          <VStack>
            <Text>${stock.regularMarketPrice}</Text>
            <PercentBox percent={stock.regularMarketChangePercent} />
          </VStack>
          <Button colorScheme="teal">More Info</Button>
        </HStack>
      </CardBody>
    </Card>
  );
};

export default StockCard;
