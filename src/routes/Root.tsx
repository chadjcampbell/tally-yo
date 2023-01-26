import { Flex, Link } from "@chakra-ui/react";

const Root = () => {
  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor="gray.200"
      justifyContent="center"
      alignItems="center"
    >
      <h1>Home</h1>
      <Link color="teal.500" href="/login">
        Login
      </Link>
      <Link color="teal.500" href="/register">
        Sign Up
      </Link>
    </Flex>
  );
};

export default Root;
