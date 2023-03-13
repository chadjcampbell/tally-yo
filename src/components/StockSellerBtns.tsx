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
  let totalCost = Number((APIstockInfo.regularMarketPrice * count).toFixed(2));

  user &&
    useEffect(() => {
      const unsub = onSnapshot(doc(db, "users", user.uid), (doc) => {
        setUserInfo(doc.data()!);
      });
      return () => {
        unsub();
      };
    }, []);

  const handleBuy = () => {
    if (userInfo?.tally >= totalCost) {
      const newTotal = userInfo?.tally - totalCost;
      (async () => {
        await updateDoc(doc(db, "users", userInfo?.uid), {
          stocks: [
            ...userInfo?.stocks,
            {
              stock: APIstockInfo.symbol,
              quantity: count,
              cost: APIstockInfo.regularMarketPrice,
            },
          ],
          tally: newTotal,
        });
      })();

      toast({
        title: "Congrats!",
        description: "Purchase completed.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      setSelling(false);
    } else {
      toast({
        title: "Purchase failed.",
        description: "Insufficient funds.",
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
        <Button onClick={handleBuy} colorScheme="whatsapp">
          Confirm
        </Button>
      </ButtonGroup>
    </Flex>
  ) : (
    <>
      <Button onClick={() => setSelling(true)} colorScheme="whatsapp">
        Buy
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
