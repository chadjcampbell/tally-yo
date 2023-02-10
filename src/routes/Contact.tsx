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
  useToast,
  VStack,
} from "@chakra-ui/react";
import { BsGithub, BsLinkedin, BsPerson } from "react-icons/bs";
import { MdEmail, MdOutlineEmail } from "react-icons/md";
import emailjs from "@emailjs/browser";
import { FormEvent, useRef } from "react";

const Contact = () => {
  const { hasCopied, onCopy } = useClipboard("chadjcampbell@gmail.com");
  const form = useRef<HTMLFormElement>(null);
  const toast = useToast();

  const sendEmail = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    form.current &&
      emailjs
        .sendForm(
          "service_oz0fm1z",
          "template_s472lyb",
          form.current,
          "HDt9p72ndSLywkXGK"
        )
        .then(
          (result) => {
            console.log(result.text);
            toast({
              title: "Message Sent!",
              description: "Thanks for reaching out.",
              status: "success",
              duration: 9000,
              isClosable: true,
            });
          },
          (error) => {
            console.log(error.text);
            toast({
              title: "Message Failed!",
              description: "Trolls may have locked up my mailJS account.",
              status: "error",
              duration: 9000,
              isClosable: true,
            });
          }
        );
  };

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
                  bgColor="teal.200"
                  p="4"
                  borderRadius="2em"
                  fontSize={{
                    base: "xl",
                    md: "2xl",
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
                        bg="teal.100"
                        shadow="lg"
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

                    <Link
                      target="_blank"
                      href="https://github.com/chadjcampbell"
                    >
                      <IconButton
                        bg="teal.100"
                        shadow="lg"
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

                    <Link
                      target="_blank"
                      href="https://www.linkedin.com/in/chad-campbell-b6b59693/"
                    >
                      <IconButton
                        bg="teal.100"
                        shadow="lg"
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
                  <form ref={form} onSubmit={(e) => sendEmail(e)}>
                    <Box
                      bg={useColorModeValue("white", "gray.700")}
                      borderRadius="lg"
                      p={8}
                      color={useColorModeValue("gray.700", "whiteAlpha.900")}
                      shadow="lg"
                    >
                      <VStack spacing={5}>
                        <FormControl isRequired>
                          <FormLabel>Name</FormLabel>

                          <InputGroup>
                            <InputLeftElement children={<BsPerson />} />
                            <Input
                              type="text"
                              name="from_name"
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
                              name="from_email"
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
                  </form>
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

export default Contact;
