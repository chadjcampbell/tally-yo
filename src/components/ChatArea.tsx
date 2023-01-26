import { Flex } from "@chakra-ui/react";
import Message from "./Message";

const ChatArea = () => {
  return (
    <Flex height="50vh" direction="column" width="full">
      <Message justify={"left"} />
      <Message justify={"right"} />
      <Message justify={"left"} />
      <Message justify={"right"} />
    </Flex>
  );
};

export default ChatArea;
