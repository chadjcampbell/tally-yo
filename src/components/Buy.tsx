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
      `https://finnhub.io/api/v1/stock//search?q=${searchStock}&token=${API_KEY}`
    );
    console.log(result.json());
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
