import {
  Card,
  CardHeader,
  HStack,
  Heading,
  CardBody,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { doc, DocumentData, onSnapshot } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import Loading from "../components/Loading";
import { PieChart } from "../components/PieChart";
import PortfolioSummary from "../components/PortfolioSummary";
import { AuthContext } from "../context/AuthContext";
import { db } from "../firebase";
import { YFStockData } from "../types/YFStockData";
import { fullDataOptions } from "../utils/fetchDataOptions";
import { getUserSymbols } from "../utils/getUserSymbols";

const Portfolio = () => {
  const [userInfo, setUserInfo] = useState<DocumentData | null>(null);
  const [stockData, setStockData] = useState<YFStockData[] | null>(null);
  const [loading, setLoading] = useState(true);
  const { user, yfKey } = useContext(AuthContext);

  user &&
    useEffect(() => {
      const unsub = onSnapshot(doc(db, "users", user.uid), (doc) => {
        setUserInfo(doc.data()!);
      });
      return () => {
        unsub();
      };
    }, []);

  useEffect(() => {
    const getStockData = () => {
      if (userInfo?.stocks.length > 0) {
        axios
          .request(
            fullDataOptions(getUserSymbols(userInfo as DocumentData), yfKey)
          )
          .then((response) => {
            setStockData(response.data.quoteResponse.result);
            setLoading(false);
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        setLoading(false);
      }
    };
    userInfo && getStockData();
  }, [userInfo]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Card
          mt="3"
          borderRadius="1em"
          align="center"
          width="full"
          height="full"
        >
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
            {userInfo?.stocks.length === 0 ? (
              <Text>Your stock portfolio is currently empty</Text>
            ) : (
              <>
                <PortfolioSummary stockData={stockData} userInfo={userInfo} />
                <PieChart
                  userInfo={userInfo as DocumentData}
                  stockData={stockData as YFStockData[]}
                  loading={loading}
                />
              </>
            )}
          </CardBody>
        </Card>
      )}
    </>
  );
};

export default Portfolio;
