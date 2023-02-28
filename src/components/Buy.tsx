import {
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useState } from "react";

const Buy = () => {
  const API_KEY = import.meta.env.VITE_API_KEY;

  const handleSearch = async (e) => {
    e.preventDefault();
    const searchStock = e.currentTarget.stockName.value;
    let result = await fetch(
      ` https://cloud-sse.iexapis.com/stable/stocksUS\?symbols\=spy\&token\=${API_KEY}`
    );
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
