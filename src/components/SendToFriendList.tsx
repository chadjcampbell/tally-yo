import { Avatar, HStack, VStack, Text } from "@chakra-ui/react";
import { User } from "firebase/auth";
import { onSnapshot, doc, DocumentData } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { db } from "../firebase";
import { CollectionCardProps } from "./CollectionCard";
import Loading from "./Loading";

const SendToFriendList = ({ item, userStore }: CollectionCardProps) => {
  const [friends, setFriends] = useState<DocumentData | undefined>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  user &&
    useEffect(() => {
      const unsub = onSnapshot(doc(db, "userChats", user.uid), (doc) => {
        setFriends(doc.data());
        setLoading(false);
      });
      return () => {
        unsub();
      };
    }, [user.uid]);

  const handleSelect = (user: User) => {};

  return (
    <div>
      {!loading ? (
        Object.entries(friends!)
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
                </VStack>
              </HStack>
            </VStack>
          ))
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default SendToFriendList;
