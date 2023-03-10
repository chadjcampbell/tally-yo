import {
  Text,
  Button,
  HStack,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";
import { useState } from "react";
import { YFStockData } from "../types/YFStockData";

type StockBuyerBtnsProps = {
  stock: YFStockData;
};

const StockBuyerBtns = ({ stock }: StockBuyerBtnsProps) => {
  const [buying, setBuying] = useState(false);

  return buying ? (
    <>
      <Button onClick={() => setBuying(false)} colorScheme="red">
        Cancel
      </Button>
      <BuyCounter stock={stock} />
      <Button ml="1" colorScheme="whatsapp">
        Confirm
      </Button>
    </>
  ) : (
    <>
      <Button onClick={() => setBuying(true)} colorScheme="whatsapp">
        Buy
      </Button>
    </>
  );
};

export default StockBuyerBtns;

const BuyCounter = ({ stock }: StockBuyerBtnsProps) => {
  return (
    <HStack>
      <Text></Text>{" "}
      <NumberInput size="md" maxW={24} defaultValue={1} min={1}>
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </HStack>
  );
};
