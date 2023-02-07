import {
  Card,
  CardBody,
  Stack,
  Heading,
  Divider,
  CardFooter,
  ButtonGroup,
  Button,
  Text,
  Image,
} from "@chakra-ui/react";
import { CollectionItem } from "../routes/Collection";

type CollectionCardProps = {
  item: CollectionItem;
};

export const CollectionCard = ({ item }: CollectionCardProps) => {
  return (
    <Card>
      <CardBody>
        <Image src={item.image_uri} alt={item["file-name"]} borderRadius="lg" />
        <Stack mt="6" spacing="3">
          <Heading size="md">{item.name["name-USen"]}</Heading>
          <Text color="blue.600" fontSize="2xl">
            ${item.price}
          </Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <ButtonGroup spacing="2">
          <Button variant="solid" colorScheme="teal">
            Buy
          </Button>
          <Button variant="ghost" colorScheme="teal">
            Sell
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};
