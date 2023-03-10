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
} from "@chakra-ui/react";
import { useState } from "react";
import { YFStockData } from "../types/YFStockData";

type StockBuyerBtnsProps = {
  stock: YFStockData;
};

const StockBuyerBtns = ({ stock }: StockBuyerBtnsProps) => {
  const [buying, setBuying] = useState(false);

  return buying ? (
    <Flex minWidth="max-content" alignItems="center" gap="2">
      <Box>
        <Button onClick={() => setBuying(false)} colorScheme="red">
          Cancel
        </Button>
      </Box>
      <Spacer />
      <ButtonGroup gap="2">
        <BuyCounter stock={stock} />
        <Button colorScheme="whatsapp">Confirm</Button>
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

const BuyCounter = ({ stock }: StockBuyerBtnsProps) => {
  const [count, setCount] = useState(1);
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
