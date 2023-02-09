import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  Stack,
  Textarea,
  Tooltip,
  useClipboard,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { BsGithub, BsLinkedin, BsPerson, BsTwitter } from "react-icons/bs";
import { MdEmail, MdOutlineEmail } from "react-icons/md";

const Settings = () => {
  const { hasCopied, onCopy } = useClipboard("example@example.com");
  return (
    <Card mt="3" borderRadius="1em" align="center" width="full" height="full">
      <CardHeader
        borderRadius="1em 1em 0 0"
        backgroundColor="teal.200"
        width="full"
      >
        <Heading size="md">Contact Us</Heading>
      </CardHeader>
      <CardBody minHeight="65vh" width="full">
        <Flex align="center" justify="center" id="contact">
          <Box
            borderRadius="lg"
            m={{ base: 5, md: 16, lg: 10 }}
            p={{ base: 5, lg: 16 }}
          >
            <Box>
              <VStack spacing={{ base: 4, md: 8, lg: 20 }}>
                <Heading
                  fontSize={{
                    base: "4xl",
                    md: "5xl",
                  }}
                >
                  Get in Touch
                </Heading>

                <Stack
                  spacing={{ base: 4, md: 8, lg: 20 }}
                  direction={{ base: "column", md: "row" }}
                >
                  <Stack
                    align="center"
                    justify="space-around"
                    direction={{ base: "row", md: "column" }}
                  >
                    <Tooltip
                      label={hasCopied ? "Email Copied!" : "Copy Email"}
                      closeOnClick={false}
                      hasArrow
                    >
                      <IconButton
                        aria-label="email"
                        variant="ghost"
                        size="lg"
                        fontSize="3xl"
                        icon={<MdEmail />}
                        _hover={{
                          bg: "blue.500",
                          color: useColorModeValue("white", "gray.700"),
                        }}
                        onClick={onCopy}
                        isRound
                      />
                    </Tooltip>

                    <Link href="#">
                      <IconButton
                        aria-label="github"
                        variant="ghost"
                        size="lg"
                        fontSize="3xl"
                        icon={<BsGithub />}
                        _hover={{
                          bg: "blue.500",
                          color: useColorModeValue("white", "gray.700"),
                        }}
                        isRound
                      />
                    </Link>

                    <Link href="#">
                      <IconButton
                        aria-label="twitter"
                        variant="ghost"
                        size="lg"
                        icon={<BsTwitter size="28px" />}
                        _hover={{
                          bg: "blue.500",
                          color: useColorModeValue("white", "gray.700"),
                        }}
                        isRound
                      />
                    </Link>

                    <Link href="#">
                      <IconButton
                        aria-label="linkedin"
                        variant="ghost"
                        size="lg"
                        icon={<BsLinkedin size="28px" />}
                        _hover={{
                          bg: "blue.500",
                          color: useColorModeValue("white", "gray.700"),
                        }}
                        isRound
                      />
                    </Link>
                  </Stack>

                  <Box
                    bg={useColorModeValue("white", "gray.700")}
                    borderRadius="lg"
                    p={8}
                    color={useColorModeValue("gray.700", "whiteAlpha.900")}
                    shadow="base"
                  >
                    <VStack spacing={5}>
                      <FormControl isRequired>
                        <FormLabel>Name</FormLabel>

                        <InputGroup>
                          <InputLeftElement children={<BsPerson />} />
                          <Input
                            type="text"
                            name="name"
                            placeholder="Your Name"
                          />
                        </InputGroup>
                      </FormControl>

                      <FormControl isRequired>
                        <FormLabel>Email</FormLabel>

                        <InputGroup>
                          <InputLeftElement children={<MdOutlineEmail />} />
                          <Input
                            type="email"
                            name="email"
                            placeholder="Your Email"
                          />
                        </InputGroup>
                      </FormControl>

                      <FormControl isRequired>
                        <FormLabel>Message</FormLabel>

                        <Textarea
                          name="message"
                          placeholder="Your Message"
                          rows={6}
                          resize="none"
                        />
                      </FormControl>

                      <Button
                        colorScheme="blue"
                        bg="blue.400"
                        color="white"
                        _hover={{
                          bg: "blue.500",
                        }}
                        width="full"
                      >
                        Send Message
                      </Button>
                    </VStack>
                  </Box>
                </Stack>
              </VStack>
            </Box>
          </Box>
        </Flex>
      </CardBody>
      <CardFooter>
        {" "}
        <a
          href="https://www.flaticon.com/free-icons/chat-box"
          title="chat box icons"
        >
          Chat box icons created by Ilham Fitrotul Hayat - Flaticon
        </a>{" "}
      </CardFooter>
    </Card>
  );
};

export default Settings;
