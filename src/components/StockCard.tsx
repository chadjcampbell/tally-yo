import {
  Card,
  CardHeader,
  CardBody,
  Image,
  VStack,
  Button,
} from "@chakra-ui/react";
import { getStockImage } from "../utils/getStockImage";

const StockCard = ({ stock }) => {
  return (
    <Card shadow="lg" m="3" p="3">
      <CardHeader>{stock[0]}</CardHeader>
      <CardBody>
        <VStack>
          <Button colorScheme="teal">More Info</Button>
        </VStack>
      </CardBody>
    </Card>
  );
};

export default StockCard;
