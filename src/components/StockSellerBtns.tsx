import {
  Text,
  Button,
  HStack,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Flex,
  Spacer,
  ButtonGroup,
  Box,
  useToast,
} from "@chakra-ui/react";
import { DocumentData, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { db } from "../firebase";
import { YFStockData } from "../types/YFStockData";
import { firebaseStockInfo } from "./Sell";

type StockSellerBtnsProps = {
  userStock: firebaseStockInfo;
  APIstockInfo: YFStockData;
};

export const StockSellerBtns = ({
  userStock,
  APIstockInfo,
}: StockSellerBtnsProps) => {
  const [count, setCount] = useState(1);
  const [selling, setSelling] = useState(false);
  const [userInfo, setUserInfo] = useState<DocumentData | null>(null);
  const { user } = useContext(AuthContext);
  const toast = useToast();
  let totalSale = Number((APIstockInfo.regularMarketPrice * count).toFixed(2));

  user &&
    useEffect(() => {
      const unsub = onSnapshot(doc(db, "users", user.uid), (doc) => {
        setUserInfo(doc.data()!);
      });
      return () => {
        unsub();
      };
    }, []);

  const handleSell = () => {
    const newTotal = userInfo?.tally + totalSale;
    if (userStock.quantity > count) {
      const newStockArray = userInfo?.stocks.map((stock: firebaseStockInfo) =>
        stock.stock === userStock.stock
          ? { ...stock, quantity: userStock.quantity - count }
          : stock
      );
      (async () => {
        await updateDoc(doc(db, "users", userInfo?.uid), {
          stocks: newStockArray,
          tally: newTotal,
        });
      })();
      toast({
        title: "Congrats!",
        description: "Sale completed.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      setSelling(false);
    } else if (userStock.quantity == count) {
      const newStockArray = userInfo?.stocks.filter(
        (stock: firebaseStockInfo) => stock.stock !== userStock.stock
      );
      (async () => {
        await updateDoc(doc(db, "users", userInfo?.uid), {
          stocks: newStockArray,
          tally: newTotal,
        });
      })();
      toast({
        title: "Congrats!",
        description: "Sale completed.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Sale failed.",
        description: "Something went wrong.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return selling ? (
    <Flex minWidth="max-content" alignItems="center" gap="2">
      <Box>
        <Button onClick={() => setSelling(false)} colorScheme="red">
          Cancel
        </Button>
      </Box>
      <Spacer />
      <ButtonGroup gap="2">
        <SellCounter
          APIstockInfo={APIstockInfo}
          userStock={userStock}
          count={count}
          setCount={setCount}
        />
        <Button onClick={handleSell} colorScheme="whatsapp">
          Confirm
        </Button>
      </ButtonGroup>
    </Flex>
  ) : (
    <>
      <Button onClick={() => setSelling(true)} colorScheme="whatsapp">
        Sell
      </Button>
    </>
  );
};

type SellCounterProps = {
  userStock: firebaseStockInfo;
  APIstockInfo: YFStockData;
  count: number;
  setCount: (arg0: number) => void;
};

const SellCounter = ({
  userStock,
  APIstockInfo,
  count,
  setCount,
}: SellCounterProps) => {
  return (
    <HStack>
      <Text ml="1">
        ${(APIstockInfo.regularMarketPrice * count).toFixed(2)}
      </Text>{" "}
      <NumberInput
        onChange={(count) => setCount(Number(count))}
        value={count}
        size="md"
        maxW={24}
        defaultValue={1}
        min={1}
        max={userStock.quantity}
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </HStack>
  );
};
