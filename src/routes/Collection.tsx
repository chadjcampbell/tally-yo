import {
  Card,
  CardHeader,
  Heading,
  CardBody,
  SimpleGrid,
  HStack,
  Image,
  Text,
  Box,
} from "@chakra-ui/react";
import { onSnapshot, doc, DocumentData } from "firebase/firestore";
import { useState, useEffect, useContext } from "react";
import { CollectionCard } from "../components/CollectionCard";
import Loading from "../components/Loading";
import { AuthContext } from "../context/AuthContext";
import { db } from "../firebase";

export type CollectionItem = {
  "file-name": string;
  image_uri: string;
  "museum-phrase": string;
  name: any;
  "part-of": string;
  price: number;
};

const Collection = () => {
  const [myCollection, setMyCollection] =
    useState<Array<CollectionItem> | null>(null);
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    try {
      fetch("http://acnhapi.com/v1/fossils/")
        .then((response) => response.json())
        .then((data) => setMyCollection(Object.values(data)))
        .then(() => setLoading(false));
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <Card mt="3" borderRadius="1em" align="center" width="full" height="full">
      <CardHeader
        borderRadius="1em 1em 0 0"
        backgroundColor="teal.200"
        width="full"
      >
        <HStack spacing={{ base: "0", md: "6" }}>
          <Heading size="md">Collection</Heading>
          <Image src="/coin.png" />{" "}
          <Box bgColor="white" borderRadius="md" p="1">
            <Text color="blue.600" fontSize="2xl">
              {userStore?.tally}
            </Text>
          </Box>
        </HStack>
      </CardHeader>
      <CardBody minHeight="75vh" width="full">
        {loading ? (
          <Loading />
        ) : (
          <SimpleGrid minChildWidth="175px" spacing="40px">
            {myCollection?.map((item: CollectionItem) => (
              <CollectionCard
                key={item.image_uri}
                item={item}
                userStore={userStore}
              />
            ))}
          </SimpleGrid>
        )}
      </CardBody>
    </Card>
  );
};

export default Collection;
