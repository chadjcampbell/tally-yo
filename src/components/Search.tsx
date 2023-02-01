import {
  Avatar,
  Text,
  Button,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  FormControl,
} from "@chakra-ui/react";
import { useState } from "react";
import {
  collection,
  DocumentData,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase";

const Search = () => {
  const [username, setUsername] = useState("");
  const [searchUser, setSearchUser] = useState<DocumentData | null>(null);
  const [error, setError] = useState(false);

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUsername("");
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        return setSearchUser(doc.data());
      });
    } catch {
      setError(true);
    }
  };

  return (
    <>
      <form onSubmit={(e) => handleSearch(e)}>
        <FormControl>
          <InputGroup>
            {" "}
            <Input
              placeholder="Find a new friend?"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
            <InputRightElement width="4.5rem">
              <Button type="submit" mr="1" colorScheme="teal" size="sm">
                Search
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
      </form>
      <VStack
        display={{ md: "flex" }}
        alignItems="flex-start"
        spacing="1px"
        mt="2"
        border="1px solid teal"
        borderRadius="md"
      >
        {searchUser && <SearchResult searchUser={searchUser} />}
      </VStack>
    </>
  );
};

type SearchResultProps = {
  searchUser: DocumentData | null;
};

const SearchResult = ({ searchUser }: SearchResultProps) => {
  return (
    <HStack m="1">
      <Avatar size={"md"} src={searchUser?.photoURL || undefined} />
      <VStack
        display={{ md: "flex" }}
        alignItems="flex-start"
        spacing="1"
        ml="2"
      >
        <Text fontSize="md">{searchUser?.displayName}</Text>
      </VStack>
    </HStack>
  );
};

export default Search;
