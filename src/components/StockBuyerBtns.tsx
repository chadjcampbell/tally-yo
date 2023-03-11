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

type StockBuyerBtnsProps = {
  stock: YFStockData;
};

const StockBuyerBtns = ({ stock }: StockBuyerBtnsProps) => {
  const [count, setCount] = useState(1);
  const [buying, setBuying] = useState(false);
  const [userInfo, setUserInfo] = useState<DocumentData | null>(null);
  const { user } = useContext(AuthContext);
  const toast = useToast();
  let totalCost = Number((stock.regularMarketPrice * count).toFixed(2));

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
              stock: stock.symbol,
              quantity: count,
              cost: stock.regularMarketPrice,
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

  return buying ? (
    <Flex minWidth="max-content" alignItems="center" gap="2">
      <Box>
        <Button onClick={() => setBuying(false)} colorScheme="red">
          Cancel
        </Button>
      </Box>
      <Spacer />
      <ButtonGroup gap="2">
        <BuyCounter stock={stock} count={count} setCount={setCount} />
        <Button onClick={handleBuy} colorScheme="whatsapp">
          Confirm
        </Button>
      </ButtonGroup>
    </Flex>
  ) : (
    <>
      <Button onClick={() => setBuying(true)} colorScheme="whatsapp">
        Buy
      </Button>
    </>
  );
};

export default StockBuyerBtns;

type BuyCounterProps = {
  stock: YFStockData;
  count: number;
  setCount: (arg0: number) => void;
};

const BuyCounter = ({ stock, count, setCount }: BuyCounterProps) => {
  return (
    <HStack>
      <Text ml="1">${(stock.regularMarketPrice * count).toFixed(2)}</Text>{" "}
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
