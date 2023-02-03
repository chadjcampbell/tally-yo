import {
  Card,
  CardHeader,
  Heading,
  CardBody,
  CardFooter,
  Button,
  FormControl,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";
import ChatArea from "./ChatArea";
import ChatInput from "./ChatInput";

const Chat = () => {
  const { data } = useContext(ChatContext);

  return (
    <Card mt="3" borderRadius="1em" align="center" width="full" height="full">
      <CardHeader
        borderRadius="1em 1em 0 0"
        backgroundColor="teal.200"
        width="full"
      >
        <Heading size="md">
          {" "}
          Chat with {data.user?.displayName || "..."}
        </Heading>
      </CardHeader>
      <CardBody width="full">
        <ChatArea />
      </CardBody>
      <ChatInput />
    </Card>
  );
};

export default Chat;
