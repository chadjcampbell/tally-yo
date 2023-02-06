import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
} from "@chakra-ui/react";

const Settings = () => {
  return (
    <Card mt="3" borderRadius="1em" align="center" width="full" height="full">
      <CardHeader
        borderRadius="1em 1em 0 0"
        backgroundColor="teal.200"
        width="full"
      >
        <Heading size="md">Settings</Heading>
      </CardHeader>
      <CardBody minHeight="65vh" width="full"></CardBody>
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
