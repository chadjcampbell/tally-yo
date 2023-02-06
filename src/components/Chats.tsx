import { VStack, HStack, Avatar, Text, Heading } from "@chakra-ui/react";
import { User } from "firebase/auth";
import { onSnapshot, doc, DocumentData } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";
import { ActionType } from "../provider/ChatProvider";
import Loading from "./Loading";

interface ChatsProps {
  onClose: () => void;
}

const Chats = ({ onClose }: ChatsProps) => {
  const [chats, setChats] = useState<DocumentData | undefined>([]);
  const [chatsLoading, setChatsLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);
  user &&
    useEffect(() => {
      const unsub = onSnapshot(doc(db, "userChats", user.uid), (doc) => {
        setChats(doc.data());
        setChatsLoading(false);
      });
      return () => {
        unsub();
      };
    }, [user.uid]);

  const handleSelect = (user: User) => {
    dispatch({ type: ActionType.CHANGE_USER, payload: user });
    onClose();
  };

  return (
    <>
      <Heading color="teal.800" as="h2" size="lg" mt="12">
        Tally Friends
      </Heading>
      {!chatsLoading ? (
        Object.entries(chats!)
          .sort((p1, p2) => p2[1].date - p1[1].date)
          .map((chat) => (
            <VStack
              onClick={() => handleSelect(chat[1].userInfo)}
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
                  {chat[1].mostRecentMessage && (
                    <Text
                      borderRadius="md"
                      p="1"
                      color="gray.600"
                      background="teal.100"
                      maxHeight="1.75rem"
                      overflow="clip"
                      fontSize="md"
                    >
                      {chat[1].mostRecentMessage}
                    </Text>
                  )}
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
