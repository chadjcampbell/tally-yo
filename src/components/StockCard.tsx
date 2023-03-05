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
    <>
      {stock[0] ? (
        <Card shadow="lg" m="3" p="3">
          <CardHeader>{stock[0].price.shortName}</CardHeader>
          <CardBody>
            <VStack>
              <Button colorScheme="teal">More Info</Button>
            </VStack>
          </CardBody>
        </Card>
      ) : null}
    </>
  );
};

export default StockCard;
