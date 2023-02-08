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
  HStack,
  Box,
} from "@chakra-ui/react";
import { CollectionItem } from "../routes/Collection";
import { titleCase } from "../utils/titlecase";

type CollectionCardProps = {
  item: CollectionItem;
};

export const CollectionCard = ({ item }: CollectionCardProps) => {
  return (
    <Card shadow="lg">
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
