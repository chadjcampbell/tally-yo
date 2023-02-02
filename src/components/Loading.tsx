import { Flex, Spinner } from "@chakra-ui/react";

const Loading = () => {
  return (
    <Flex align="center" justify="center" height="60vh">
      <Spinner
        thickness="4px"
        speed="0.7s"
        emptyColor="gray.100"
        color="teal.700"
        size="xl"
      />
    </Flex>
  );
};

export default Loading;
