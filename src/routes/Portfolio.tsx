import { Card, CardHeader, HStack, Heading, CardBody } from "@chakra-ui/react";
import { doc, DocumentData, onSnapshot } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { PieChart } from "../components/PieChart";
import { AuthContext } from "../context/AuthContext";
import { db } from "../firebase";

const Portfolio = () => {
  const [userInfo, setUserInfo] = useState<DocumentData | null>(null);

  const { user } = useContext(AuthContext);

  user &&
    useEffect(() => {
      const unsub = onSnapshot(doc(db, "users", user.uid), (doc) => {
        setUserInfo(doc.data()!);
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
        </HStack>
      </CardHeader>
      <CardBody minHeight="75vh" width="full">
        {userInfo && <PieChart userInfo={userInfo} />}
      </CardBody>
    </Card>
  );
};

export default Portfolio;
