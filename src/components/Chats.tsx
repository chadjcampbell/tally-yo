import { VStack, HStack, Avatar, Text, Heading } from "@chakra-ui/react";
import { useState } from "react";

const Chats = () => {
  const [chats, setChats] = useState([]);

  return (
    <>
      <Heading color="teal.800" as="h2" size="lg" mt="12">
        Tally Friends
      </Heading>
      <VStack
        display={{ md: "flex" }}
        alignItems="flex-start"
        spacing="1px"
        mt="2"
        border="1px solid teal"
        borderRadius="md"
        _hover={{
          bg: "blue.500",
          color: " white",
          cursor: "pointer",
        }}
      >
        <HStack m="1">
          <Avatar size={"md"} src={"" || undefined} />
          <VStack
            display={{ md: "flex" }}
            alignItems="flex-start"
            spacing="1"
            ml="2"
          >
            <Text fontSize="md">{""}</Text>
          </VStack>
        </HStack>
      </VStack>
    </>
  );
};

export default Chats;
