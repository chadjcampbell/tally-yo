import { Flex } from "@chakra-ui/react";
import { onSnapshot, doc, DocumentData } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";
import Loading from "./Loading";
import Message, { MessageType } from "./Message";

const ChatArea = () => {
  const [messages, setMessages] = useState<DocumentData>([]);
  const [loading, setLoading] = useState(false);
  const { data } = useContext(ChatContext);

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

  return (
    <Flex p="3" overflowY="auto" height="50vh" direction="column" width="full">
      {loading && <Loading />}
      {messages.map((message: MessageType) => (
        <Message message={message} key={message.id} />
      ))}
    </Flex>
  );
};

export default ChatArea;
