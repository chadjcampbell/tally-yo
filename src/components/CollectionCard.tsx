import {
  Card,
  CardBody,
  Stack,
  Heading,
  Divider,
  CardFooter,
  Button,
  Text,
  Image,
  HStack,
  Box,
  useDisclosure,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  VStack,
  useToast,
  CardHeader,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from "@chakra-ui/react";
import { doc, DocumentData, updateDoc } from "firebase/firestore";
import { MouseEvent } from "react";
import { db } from "../firebase";
import { CollectionItem } from "../routes/Collection";
import { removeElement } from "../utils/removeelement";
import { titleCase } from "../utils/titlecase";
import SendToFriendList from "./SendToFriendList";

type CollectionCardProps = {
  item: CollectionItem;
  userStore: DocumentData | undefined;
};

export const CollectionCard = ({ item, userStore }: CollectionCardProps) => {
  const { onOpen, isOpen, onClose } = useDisclosure();
  const toast = useToast();

  const numberOwned = userStore?.items.filter(
    (i: string) => i === item["file-name"]
  ).length;

  const handleBuy = () => {
    if (userStore?.tally >= item.price) {
      const newTotal = userStore?.tally - item.price;
      (async () => {
        await updateDoc(doc(db, "users", userStore?.uid), {
          items: [...userStore?.items, item["file-name"]],
          tally: newTotal,
        });
      })();

      toast({
        title: "Congrats!",
        description: "Purchase completed.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } else {
      console.log("failed update");
      toast({
        title: "Purchase failed.",
        description: "Not enough tally coins.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };
  const handleSell = () => {
    if (userStore?.items.includes(item["file-name"])) {
      const newTotal = userStore?.tally + item.price;
      (async () => {
        await updateDoc(doc(db, "users", userStore?.uid), {
          items: removeElement(userStore.items, item["file-name"]),
          tally: newTotal,
        });
      })();
      toast({
        title: "Congrats!",
        description: "Item sold.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Failed to sell.",
        description: "You don't have one of these.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const checkIfOwned = (e: MouseEvent) => {
    if (numberOwned === 0) {
      e.preventDefault();
      toast({
        title: "Nothing to send.",
        description: "You don't have one of these.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <Card align="center" justify="center" shadow="lg">
      <CardBody>
        <Image src={item.image_uri} alt={item["file-name"]} borderRadius="lg" />
        <Stack mt="6" spacing="3">
          <Heading size="md">{titleCase(item.name["name-USen"])}</Heading>
          <Box color="blue.600" fontSize="2xl">
            <HStack>
              <Image src="./coin.png" /> <Text>{item.price}</Text>
            </HStack>
          </Box>
          {numberOwned ? (
            <Text
              color="blue.600"
              fontSize="2xl"
              borderRadius="0.5rem"
              p="1"
              bgColor="teal.100"
            >
              Owned: {numberOwned}
            </Text>
          ) : null}
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <Button onClick={onOpen} variant="solid" colorScheme="teal">
          More Info
        </Button>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{titleCase(item.name["name-USen"])}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack>
                {" "}
                <Image
                  src={item.image_uri}
                  alt={item["file-name"]}
                  borderRadius="lg"
                />
                <Text>{item["museum-phrase"]}</Text>
                <HStack>
                  <Image src="./coin.png" />{" "}
                  <Text color="blue.600" fontSize="2xl">
                    {item.price}
                  </Text>
                </HStack>
                {numberOwned ? (
                  <Text
                    color="blue.600"
                    fontSize="2xl"
                    borderRadius="0.5rem"
                    p="1"
                    bgColor="teal.100"
                  >
                    Owned: {numberOwned}
                  </Text>
                ) : null}
              </VStack>
            </ModalBody>

            <ModalFooter>
              <Popover placement="top-start">
                <PopoverTrigger>
                  <Button
                    onClick={(e) => checkIfOwned(e)}
                    colorScheme="teal"
                    mr="auto"
                  >
                    Send to Friend
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <PopoverHeader>Send to...?</PopoverHeader>
                  <PopoverBody>
                    <SendToFriendList />
                  </PopoverBody>
                </PopoverContent>
              </Popover>

              <Button onClick={handleBuy} colorScheme="blue" mr={3}>
                Buy Now
              </Button>
              <Button onClick={handleSell} variant="outline">
                Sell
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </CardFooter>
    </Card>
  );
};
