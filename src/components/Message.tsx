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

  return (
    <Flex direction="row" align="center" justify={justify}>
      {justify == "left" ? (
        <>
          <Avatar />
          <Box
            m="2"
            p="2"
            shadow="md"
            backgroundColor="gray.100"
            borderRadius="0 1em 1em 1em"
          >
            This is a message
          </Box>
        </>
      ) : (
        <>
          <Box
            m="2"
            p="2"
            shadow="md"
            backgroundColor="teal.100"
            borderRadius=" 1em 0 1em 1em"
          >
            This is a message
          </Box>
          <Avatar />
        </>
      )}
    </Flex>
  );
};

export default Message;
