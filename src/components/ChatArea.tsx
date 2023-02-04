import { Flex } from "@chakra-ui/react";
import { onSnapshot, doc, DocumentData } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";
import Message, { MessageType } from "./Message";

const ChatArea = () => {
  const [messages, setMessages] = useState<DocumentData>([]);
  const { data } = useContext(ChatContext);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "chats", data.chatID), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });
    return () => {
      unsub();
    };
  }, [data.chatID]);
  console.log(messages);

  return (
    <Flex height="50vh" direction="column" width="full">
      {messages.map((message: MessageType) => (
        <Message message={message} key={message.id} />
      ))}
    </Flex>
  );
};

export default ChatArea;
