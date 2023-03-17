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
import { useContext, useRef, useState } from "react";
import {
  collection,
  doc,
  DocumentData,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";

const Search = () => {
  const [username, setUsername] = useState("");
  const [searchUser, setSearchUser] = useState<DocumentData | null>(null);
  const [error, setError] = useState(false);
  const { user } = useContext(AuthContext);
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

  const addFriend = async () => {
    const chatID =
      user && user?.uid > searchUser?.uid
        ? user?.uid + searchUser?.uid
        : searchUser?.uid + user?.uid;
    try {
      await setDoc(doc(db, "chats", chatID), { messages: [] });
      user &&
        (await updateDoc(doc(db, "userChats", user?.uid), {
          [chatID + ".userInfo"]: {
            uid: searchUser?.uid,
            displayName: searchUser?.displayName,
            photoURL: searchUser?.photoURL,
          },
          [chatID + ".date"]: serverTimestamp(),
        }));
      await updateDoc(doc(db, "userChats", searchUser?.uid), {
        [chatID + ".userInfo"]: {
          uid: user?.uid,
          displayName: user?.displayName,
          photoURL: user?.photoURL,
        },
        [chatID + ".date"]: serverTimestamp(),
      });
    } catch (err) {
      console.error(err);
    } finally {
      setSearchUser(null);
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
      {searchUser && (
        <>
          <Popover
            placement="bottom"
            initialFocusRef={initRef}
            styleConfig={{ width: "80%" }}
          >
            {({ onClose }) => (
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
                      <HStack onClick={onClose}>
                        <Button
                          colorScheme="blue"
                          onClick={addFriend}
                          ref={initRef}
                        >
                          Add Friend?
                        </Button>
                        <Button
                          colorScheme="red"
                          onClick={() => {
                            setSearchUser(null);
                          }}
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
      {error && <Text>Error has occurred, try again</Text>}
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
