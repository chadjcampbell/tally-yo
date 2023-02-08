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
} from "@chakra-ui/react";
import { DocumentData } from "firebase/firestore";
import { CollectionItem } from "../routes/Collection";
import { titleCase } from "../utils/titlecase";
import { CollectionModal } from "./CollectionModal";

export type CollectionCardProps = {
  item: CollectionItem;
  userStore: DocumentData | undefined;
};

export const CollectionCard = ({ item, userStore }: CollectionCardProps) => {
  return (
    <Card align="center" justify="center" shadow="lg">
      <CardBody>
        <CollectionModal item={item} userStore={userStore} />
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
        <Button variant="solid" colorScheme="teal">
          More Info
        </Button>
      </CardFooter>
    </Card>
  );
};
