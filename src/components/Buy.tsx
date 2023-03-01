import { FormControl, FormLabel, Input } from "@chakra-ui/react";
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
    let result = await client.getLatestTrade({ symbol: `${searchStock}` });
    console.log(result);
  };

  return (
    <div>
      <form onSubmit={(e) => handleSearch(e)}>
        <FormControl>
          <FormLabel>Search for a stock</FormLabel>
          <Input id="stockName" max="10" type="text" />
        </FormControl>
      </form>
    </div>
  );
};

export default Buy;
