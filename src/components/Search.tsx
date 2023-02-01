import { Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { useState } from "react";

const Search = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);

  const handleSearch = () => {};

  return (
    <InputGroup>
      {" "}
      <Input
        placeholder="Search..."
        onChange={(e) => setUsername(e.target.value)}
      />
      <InputRightElement width="4.5rem">
        <Button mr="1" colorScheme="teal" size="sm" onClick={handleSearch}>
          Search
        </Button>
      </InputRightElement>
    </InputGroup>
  );
};

export default Search;
