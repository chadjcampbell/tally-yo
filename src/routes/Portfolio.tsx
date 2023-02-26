import {
  Card,
  CardHeader,
  HStack,
  Heading,
  CardBody,
  Image,
  Text,
  Box,
} from "@chakra-ui/react";
import { doc, DocumentData, onSnapshot } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { db } from "../firebase";

const Portfolio = () => {
  const [userStore, setUserStore] = useState<DocumentData | undefined>();
  const { user } = useContext(AuthContext);

  user &&
    useEffect(() => {
      const unsub = onSnapshot(doc(db, "users", user.uid), (doc) => {
        setUserStore(doc.data());
      });
      return () => {
        unsub();
      };
    }, []);

  return (
    <Card mt="3" borderRadius="1em" align="center" width="full" height="full">
      <CardHeader
        borderRadius="1em 1em 0 0"
        backgroundColor="teal.200"
        width="full"
      >
        <HStack spacing={{ base: "0", md: "6" }}>
          <Heading size="md">Portfolio</Heading>
          <Image src="./coin.png" />{" "}
          <Box bgColor="white" borderRadius="md" p="1">
            <Text color="blue.600" fontSize="2xl">
              {userStore?.tally}
            </Text>
          </Box>
        </HStack>
      </CardHeader>
      <CardBody minHeight="75vh" width="full">
        Nothing here yet...
      </CardBody>
    </Card>
  );
};

export default Portfolio;
