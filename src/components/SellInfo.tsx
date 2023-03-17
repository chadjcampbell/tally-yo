import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Card,
  CardHeader,
  CardBody,
  SimpleGrid,
  Heading,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { YFStockData } from "../types/YFStockData";
import { backupQuote } from "../utils/backupQuote";
import Loading from "./Loading";
import ProfitBox from "./ProfitBox";
import { firebaseStockInfo } from "./Sell";
import { StockSellerBtns } from "./StockSellerBtns";

type SellInfoProps = {
  stock: firebaseStockInfo;
};

const YF_KEY = import.meta.env.VITE_YF;

export function SellInfo({ stock }: SellInfoProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(true);
  const [APIstockInfo, setAPIstockInfo] = useState<YFStockData | null>(null);

  const fullDataOptions = (symbols: string | null) => {
    return {
      method: "GET",
      url: `https://yfapi.net/v6/finance/quote?region=US&lang=en&symbols=${symbols}`,
      headers: {
        accept: "application/json",
        "x-api-key": YF_KEY,
      },
    };
  };

  false &&
    useEffect(() => {
      const getStockData = () => {
        setLoading(true);
        axios
          .request(fullDataOptions(stock.stock))
          .then((response) => {
            setAPIstockInfo(response.data.quoteResponse.result[0]);
            setLoading(false);
          })
          .then(() => setLoading(false))
          .catch((error) => {
            console.error(error);
          });
      };
      isOpen && getStockData();
    }, [isOpen]);

  //FAKE API CALL DATA TO SAVE LIMIT
  useEffect(() => {
    const getStockData = () => {
      setAPIstockInfo(backupQuote);
      setTimeout(() => {
        setLoading(false);
      }, 500);
    };
    isOpen && getStockData();
  }, [isOpen]);

  const priceChange = APIstockInfo?.regularMarketPrice! - stock.cost;

  return (
    <>
      <Button onClick={onOpen} alignSelf="bottom" colorScheme="teal">
        Info
      </Button>{" "}
      <Modal size="xl" isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {stock.stock} - {APIstockInfo?.shortName}
          </ModalHeader>
          <ModalCloseButton />
          {loading ? (
            <Loading />
          ) : (
            <ModalBody>
              <SimpleGrid
                spacing={4}
                templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
              >
                <Card align="center">
                  <CardHeader>
                    <Heading size="md">Your Cost</Heading>
                  </CardHeader>
                  <CardBody>${stock.cost}</CardBody>
                </Card>
                <Card align="center">
                  <CardHeader>
                    <Heading size="md">Current Price</Heading>
                  </CardHeader>
                  <CardBody>${APIstockInfo?.regularMarketPrice}</CardBody>
                </Card>
                <Card align="center">
                  <CardHeader>
                    <Heading size="md">Shares owned</Heading>
                  </CardHeader>
                  <CardBody>{stock.quantity}</CardBody>
                </Card>
                <Card align="center">
                  <CardHeader>
                    <Heading size="md">Profit/Share</Heading>
                  </CardHeader>
                  <CardBody>
                    <ProfitBox priceChange={priceChange} />{" "}
                  </CardBody>
                </Card>
              </SimpleGrid>
            </ModalBody>
          )}

          <ModalFooter>
            {APIstockInfo && (
              <StockSellerBtns userStock={stock} APIstockInfo={APIstockInfo} />
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
