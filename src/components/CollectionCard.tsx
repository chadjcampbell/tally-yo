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
        <Image src="" alt="" borderRadius="lg" />
        <Stack mt="6" spacing="3">
          <Heading size="md">Living room Sofa</Heading>
          <Text>
            This sofa is perfect for modern tropical spaces, baroque inspired
            spaces, earthy toned spaces and for people who love a chic design
            with a sprinkle of vintage design.
          </Text>
          <Text color="blue.600" fontSize="2xl">
            $450
          </Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <ButtonGroup spacing="2">
          <Button variant="solid" colorScheme="teal">
            Buy now
          </Button>
          <Button variant="ghost" colorScheme="teal">
            Add to cart
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};
