import {
  Card,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { AlpacaClient } from "@master-chief/alpaca";
import { FormEvent } from "react";

const Buy = () => {
  const API_KEY = import.meta.env.VITE_KEY;
  const API_SECRET = import.meta.env.VITE_SECRET;
  const client = new AlpacaClient({
    credentials: {
      key: API_KEY,
      secret: API_SECRET,
      paper: true,
    },
    rate_limit: true,
  });

  const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const searchStock = e.currentTarget.stockName.value;
    let result = await client.getSnapshot({ symbol: `${searchStock}` });
    console.log(result);
  };

  return (
    <Flex align="center" justify="center">
      <Card p="3" shadow="xl">
        <form onSubmit={(e) => handleSearch(e)}>
          <FormControl>
            <FormLabel textAlign="center">Search for a stock</FormLabel>
            <Input id="stockName" max="10" type="text" />
            <FormHelperText textAlign="center">e.g. 'twtr' </FormHelperText>
          </FormControl>
        </form>
      </Card>
    </Flex>
  );
};

export default Buy;
