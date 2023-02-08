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

  const handleBuy = () => {};
  const handleSell = () => {};

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
