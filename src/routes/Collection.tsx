import {
  Card,
  CardHeader,
  Heading,
  CardBody,
  CardFooter,
} from "@chakra-ui/react";

const Collection = () => {
  return (
    <Card mt="3" borderRadius="1em" align="center" width="full" height="full">
      <CardHeader
        borderRadius="1em 1em 0 0"
        backgroundColor="teal.200"
        width="full"
      >
        <Heading size="md">Collection</Heading>
      </CardHeader>
      <CardBody minHeight="75vh" width="full"></CardBody>
    </Card>
  );
};

export default Collection;
