import {
  Card,
  CardHeader,
  Heading,
  CardBody,
  HStack,
  Image,
  Text,
  Box,
} from "@chakra-ui/react";

import { onSnapshot, doc, DocumentData } from "firebase/firestore";
import { useState, useEffect, useContext } from "react";
import { Outlet } from "react-router-dom";
import BuySellTradeNavbar from "../components/BuySellTradeNavbar";
import { AuthContext } from "../context/AuthContext";
import { db } from "../firebase";

const API_KEY = import.meta.env.VITE_API_KEY;

export type CollectionItem = {
  "file-name": string;
  image_uri: string;
  "museum-phrase": string;
  name: any;
  "part-of": string;
  price: number;
};

const BuySellTrade = () => {
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
          <Heading size="md">
            <nav>
              <BuySellTradeNavbar />
            </nav>
          </Heading>
          <Image src="../coin.png" />{" "}
          <Box bgColor="white" borderRadius="md" p="1">
            <Text color="blue.600" fontSize="2xl">
              {userInfo?.tally}
            </Text>
          </Box>
        </HStack>
      </CardHeader>
      <CardBody minHeight="75vh" width="full">
        <Outlet />
      </CardBody>
    </Card>
  );
};

export default BuySellTrade;
