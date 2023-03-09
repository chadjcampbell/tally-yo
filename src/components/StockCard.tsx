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
import { useEffect, useState } from "react";
import { YFChartData } from "../types/YFChartData";
import { YFStockData } from "../types/YFStockData";
import { stringToColor } from "../utils/stringToColor";
import { ChartComponent } from "./ChartComponent";
import Loading from "./Loading";
import PercentBox from "./PercentBox";

const YF_KEY = import.meta.env.VITE_YF;

type StockCardProps = {
  stock: YFStockData;
};

const StockCard = ({ stock }: StockCardProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [chartData, setChartData] = useState<YFChartData | null>(null);

  const chartDataOptions = (symbol: string | null) => {
    return {
      method: "GET",
      url: `https://yfapi.net/v8/finance/chart/${symbol}?range=1mo&region=US&interval=1d&lang=en`,
      headers: {
        accept: "application/json",
        "x-api-key": YF_KEY,
      },
    };
  };

  useEffect(() => {
    if (isOpen) {
      axios
        .request(chartDataOptions(stock.symbol))
        .then((response) => {
          //map through api response to get an array of stock symbols
          setChartData(response.data.chart.result[0]);
          console.log(response.data.chart.result[0]);
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
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{stock.longName}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {chartData ? (
              <ChartComponent stock={stock} chartDatafromAPI={chartData} />
            ) : (
              <Loading />
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="whatsapp">Buy</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default StockCard;
