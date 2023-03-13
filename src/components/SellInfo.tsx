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
import { firebaseStockInfo } from "./Sell";

type SellInfoProps = {
  stock: firebaseStockInfo;
};

const YF_KEY = import.meta.env.VITE_YF;

export function SellInfo({ stock }: SellInfoProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(true);
  const [APIstockInfo, setAPIstockInfo] = useState(null);

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

  useEffect(() => {
    const getTrendingData = () => {
      axios
        .request(fullDataOptions(stock.stock))
        .then((response) => {
          setAPIstockInfo(response.data.quoteResponse.result);
          setLoading(false);
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
    };
    isOpen && getTrendingData();
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
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
