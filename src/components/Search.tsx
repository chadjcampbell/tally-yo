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
  Box,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Portal,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
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
  //look into useRef typing
  const initRef = useRef<any>(null);

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );
    setUsername("");
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        return setSearchUser(doc.data() || null);
      });
    } catch {
      setError(true);
    }
  };

  const addFriend = () => {};

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
      {searchUser && (
        <>
          <Popover
            closeOnBlur={false}
            placement="bottom"
            initialFocusRef={initRef}
            styleConfig={{ width: "80%" }}
          >
            {({ isOpen, onClose }) => (
              <>
                <PopoverTrigger>
                  <VStack
                    display={{ md: "flex" }}
                    alignItems="flex-start"
                    spacing="1px"
                    mt="2"
                    border="1px solid teal"
                    borderRadius="md"
                    _hover={{
                      bg: "blue.500",
                      color: " white",
                      cursor: "pointer",
                    }}
                  >
                    && <SearchResult searchUser={searchUser} />
                  </VStack>
                </PopoverTrigger>
                <Portal>
                  <Box zIndex="popover" position={"relative"}>
                    <PopoverContent>
                      <HStack>
                        <Button
                          colorScheme="blue"
                          onClick={addFriend}
                          ref={initRef}
                        >
                          Add Friend?
                        </Button>
                        <Button
                          colorScheme="red"
                          onClick={onClose}
                          ref={initRef}
                        >
                          Cancel
                        </Button>
                      </HStack>
                    </PopoverContent>
                  </Box>
                </Portal>
              </>
            )}
          </Popover>
        </>
      )}
      {error && <Text>Error</Text>}
    </>
  );
};

type SearchResultProps = {
  searchUser: DocumentData | null;
};

const SearchResult = ({ searchUser }: SearchResultProps) => {
  return (
    <>
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
    </>
  );
};

export default Search;
