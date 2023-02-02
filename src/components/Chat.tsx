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
      <CardFooter width="full" borderRadius="0 0 1em 1em">
        <FormControl>
          <InputGroup>
            <Input
              id="userMessage"
              type="textarea"
              placeholder="Send message..."
              width="full"
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm">
                Send
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
      </CardFooter>
    </Card>
  );
};

export default Chat;
