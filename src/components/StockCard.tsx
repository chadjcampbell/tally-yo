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
          <Image
            borderRadius="lg"
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
  );
};

export default StockCard;
