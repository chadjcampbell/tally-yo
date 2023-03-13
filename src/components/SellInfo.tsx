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
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { YFStockData } from "../types/YFStockData";
import { backupQuote } from "../utils/backupQuote";
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
        axios
          .request(fullDataOptions(stock.stock))
          .then((response) => {
            setAPIstockInfo(response.data.quoteResponse.result[0]);
            setLoading(false);
            console.log(response.data.quoteResponse.result[0]);
          })
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
      console.log(backupQuote);
    };
    isOpen && getStockData();
  }, [isOpen]);

  return (
    <>
      <Button onClick={onOpen} alignSelf="bottom" colorScheme="teal">
        Info
      </Button>{" "}
      <Modal size="xl" isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{stock.stock}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{stock.stock}</ModalBody>
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
