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
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { YFChartData } from "../types/YFChartData";
import { YFStockData } from "../types/YFStockData";
import { chartDataOptions } from "../utils/fetchDataOptions";
import { stringToColor } from "../utils/stringToColor";
import { LineChart } from "./LineChart";
import Loading from "./Loading";
import PercentBox from "./PercentBox";
import StockBuyerBtns from "./StockBuyerBtns";

type StockCardProps = {
  stock: YFStockData;
};

const StockCard = ({ stock }: StockCardProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [chartData, setChartData] = useState<YFChartData | null>(null);
  const { yfKey } = useContext(AuthContext);

  useEffect(() => {
    if (isOpen) {
      axios
        .request(chartDataOptions(stock.symbol, yfKey))
        .then((response) => {
          setChartData(response.data.chart.result[0]);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [isOpen]);

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
      <Modal size="xl" isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{stock.longName}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {chartData ? (
              <LineChart stock={stock} chartDatafromAPI={chartData} />
            ) : (
              <Loading />
            )}
          </ModalBody>
          <ModalFooter>
            <StockBuyerBtns stock={stock} />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default StockCard;
