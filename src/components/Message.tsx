import { Avatar, Box, Flex, Stack } from "@chakra-ui/react";

interface MessageProps {
  justify: string;
}

const Message = ({ justify }: MessageProps) => {
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
