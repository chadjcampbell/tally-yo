import { Avatar, Box, Flex, Image } from "@chakra-ui/react";
import { Timestamp } from "firebase/firestore";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

export interface MessageType {
  id: string;
  text: string;
  senderId: string;
  date: Timestamp;
  img?: string;
}
interface MessageProps {
  message: MessageType;
}

const Message = ({ message }: MessageProps) => {
  const { user } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

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
          {message.img && <Image src={message.img} alt="Image Message" />}
          {message.text}
        </Box>
        <Avatar size={"md"} src={user.photoURL || undefined} />
      </Flex>
    );
  } else {
    return (
      <Flex direction="row" align="center" justify="left">
        <Avatar size={"md"} src={data.user?.photoURL || undefined} />
        <Box
          m="2"
          p="3"
          shadow="md"
          backgroundColor="gray.100"
          borderRadius=" 0 1em  1em 1em"
        >
          {message.img && <Image src={message.img} alt="Image Message" />}
          {message.text}
        </Box>
      </Flex>
    );
  }
};

export default Message;
