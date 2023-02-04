import { Avatar, Box, Flex } from "@chakra-ui/react";
import { Timestamp } from "firebase/firestore";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

export interface MessageType {
  id: string;
  text: string;
  senderId: string;
  date: Timestamp;
}
interface MessageProps {
  message: MessageType;
}

const Message = ({ message }: MessageProps) => {
  const { user } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  console.log("message:", message);
  console.log("user:", user);

  if (message.senderId == user?.uid) {
    return (
      <Flex direction="row" align="center" justify="right">
        <Box
          m="2"
          p="3"
          shadow="md"
          backgroundColor="teal.100"
          borderRadius=" 1em 0 1em 1em"
        >
          {message.text}
        </Box>
        <Avatar size={"md"} src={user.photoURL || undefined} />
      </Flex>
    );
  } else {
    return (
      <Flex direction="row" align="center" justify="left">
        <Box
          m="2"
          p="2"
          shadow="md"
          backgroundColor="gray.100"
          borderRadius=" 0 1em  1em 1em"
        >
          {message.text}
        </Box>
        <Avatar size={"md"} src={data.user?.photoURL || undefined} />
      </Flex>
    );
  }
};

export default Message;
