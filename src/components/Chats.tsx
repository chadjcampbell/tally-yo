import { VStack, HStack, Avatar, Text, Heading } from "@chakra-ui/react";
import { onSnapshot, doc, DocumentData } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { db } from "../firebase";
import Loading from "./Loading";

const Chats = () => {
  const [chats, setChats] = useState<DocumentData | undefined>([]);
  const [chatsLoading, setChatsLoading] = useState(true);
  const { user } = useContext(AuthContext);

  user &&
    useEffect(() => {
      const unsub = onSnapshot(doc(db, "userChats", user.uid), (doc) => {
        setChats(doc.data());
        setChatsLoading(false);
        console.log("Current data: ", doc.data());
      });
      return () => {
        unsub();
      };
    }, [user.uid]);

  return (
    <>
      <Heading color="teal.800" as="h2" size="lg" mt="12">
        Tally Friends
      </Heading>
      {!chatsLoading ? (
        Object.entries(chats!).map((chat) => (
          <VStack
            key={chat[1].userInfo.uid}
            display={{ md: "flex" }}
            alignItems="flex-start"
            spacing="1px"
            mt="2"
            bgColor="teal.200"
            borderRadius="md"
            _hover={{
              bg: "teal.500",
              color: " white",
              cursor: "pointer",
            }}
          >
            <HStack m="1">
              <Avatar size={"md"} src={chat[1].userInfo.photoURL} />
              <VStack
                display={{ md: "flex" }}
                alignItems="flex-start"
                spacing="1"
                ml="2"
              >
                <Text fontSize="md">{chat[1].userInfo.displayName}</Text>
              </VStack>
            </HStack>
          </VStack>
        ))
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Chats;
