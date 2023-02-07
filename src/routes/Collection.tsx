import {
  Card,
  CardHeader,
  Heading,
  CardBody,
  SimpleGrid,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { CollectionCard } from "../components/CollectionCard";
import Loading from "../components/Loading";

export type CollectionItem = {
  "file-name": string;
  image_uri: string;
  "museum-phrase": string;
  name: any;
  "part-of": string;
  price: number;
};

const Collection = () => {
  let [myCollection, setMyCollection] = useState<Array<CollectionItem> | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      fetch("http://acnhapi.com/v1/fossils/")
        .then((response) => response.json())
        .then((data) => setMyCollection(Object.values(data)))
        .then(() => setLoading(false))
        .then(() => console.log(myCollection));
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
        <Heading size="md">Collection</Heading>
      </CardHeader>
      <CardBody minHeight="75vh" width="full">
        {loading ? (
          <Loading />
        ) : (
          <SimpleGrid minChildWidth="150px" spacing="40px">
            {myCollection?.map((item: CollectionItem) => (
              <CollectionCard key={item.image_uri} item={item} />
            ))}
          </SimpleGrid>
        )}
      </CardBody>
    </Card>
  );
};

export default Collection;
