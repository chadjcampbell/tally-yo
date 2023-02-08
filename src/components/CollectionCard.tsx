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
} from "@chakra-ui/react";
import { DocumentData } from "firebase/firestore";
import { CollectionItem } from "../routes/Collection";
import { titleCase } from "../utils/titlecase";

type CollectionCardProps = {
  item: CollectionItem;
  userStore: DocumentData | undefined;
};

export const CollectionCard = ({ item, userStore }: CollectionCardProps) => {
  const { onOpen, isOpen, onClose } = useDisclosure();
  const toast = useToast();

  const handleBuy = () => {
    if (userStore?.tally < item.price) {
      toast({
        title: "Purchase failed.",
        description: "Not enough tally coins.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Congrats!",
        description: "Purchase completed.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    }
  };
  const handleSell = () => {
    if (userStore?.items.includes(item["file-name"])) {
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

  return (
    <Card align="center" justify="center" shadow="lg">
      <CardBody>
        <Image src={item.image_uri} alt={item["file-name"]} borderRadius="lg" />
        <Stack mt="6" spacing="3">
          <Heading size="md">{titleCase(item.name["name-USen"])}</Heading>
          <Box color="blue.600" fontSize="2xl">
            <HStack>
              <Image src="/coin.png" /> <Text>{item.price}</Text>
            </HStack>
          </Box>
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
                  <Image src="/coin.png" />{" "}
                  <Text color="blue.600" fontSize="2xl">
                    {item.price}
                  </Text>
                </HStack>
              </VStack>
            </ModalBody>

            <ModalFooter>
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
