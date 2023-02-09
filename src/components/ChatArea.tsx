import { Flex, Text } from "@chakra-ui/react";
import { onSnapshot, doc, DocumentData } from "firebase/firestore";
import { useContext, useEffect, useRef, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";
import Loading from "./Loading";
import Message, { MessageType } from "./Message";

const ChatArea = () => {
  const [messages, setMessages] = useState<DocumentData>([]);
  const [loading, setLoading] = useState(false);
  const { data } = useContext(ChatContext);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLoading(true);
    const unsub = onSnapshot(doc(db, "chats", data.chatID), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
      setLoading(false);
    });
    return () => {
      unsub();
    };
  }, [data.chatID]);

  useEffect(() => {
    setTimeout(() => ref.current?.scrollIntoView({ behavior: "smooth" }), 500);
  });

  return data.chatID !== "null" ? (
    <Flex
      p="3"
      overflow="hidden"
      overflowY="auto"
      height="50vh"
      direction="column"
      width="full"
    >
      {loading && <Loading />}
      {messages.map((message: MessageType) => (
        <Message message={message} key={message.id} />
      ))}
      {!loading && <div ref={ref} style={{ clear: "both" }}></div>}
    </Flex>
  ) : (
    <Flex
      p="3"
      overflow="hidden"
      overflowY="auto"
      height="50vh"
      direction="column"
      width="full"
      align="center"
      justify="center"
    >
      <Text as="em" fontSize="2xl" color="gray.300">
        Select a friend to Chat with!
      </Text>
    </Flex>
  );
};

export default ChatArea;
