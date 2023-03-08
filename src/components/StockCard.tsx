import {
  Card,
  CardHeader,
  CardBody,
  VStack,
  Button,
  Text,
  HStack,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { YFStockData } from "../types/YFStockData";
import { stringToColor } from "../utils/stringToColor";
import PercentBox from "./PercentBox";

type StockCardProps = {
  stock: YFStockData;
};

const StockCard = ({ stock }: StockCardProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Card w="250px" h="250px" shadow="lg" m="3" p="3">
        <CardHeader>
          <VStack align="left">
            <Text
              borderRadius="lg"
              pl="1"
              pr="1"
              w="fit-content"
              bgColor={stringToColor(stock.symbol)}
            >
              {" "}
              {stock.symbol}
            </Text>
            <Text> {stock.shortName}</Text>
          </VStack>
        </CardHeader>
        <CardBody mx="auto">
          <HStack display="flex" alignItems="space-between">
            <VStack align="left">
              <Text pl="1">${stock.regularMarketPrice.toFixed(2)}</Text>
              <PercentBox percent={stock.regularMarketChangePercent} />
            </VStack>
            <Flex alignItems="end">
              <Button onClick={onOpen} alignSelf="bottom" colorScheme="teal">
                Info
              </Button>
            </Flex>
          </HStack>
        </CardBody>
      </Card>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{stock.longName}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>This is a test</ModalBody>

          <ModalFooter>
            <Button colorScheme="whatsapp">Buy</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default StockCard;
