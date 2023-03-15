import { Card, CardHeader, HStack, Heading, CardBody } from "@chakra-ui/react";
import axios from "axios";
import { doc, DocumentData, onSnapshot } from "firebase/firestore";
import { useContext, useEffect, useRef, useState } from "react";
import { PieChart } from "../components/PieChart";
import { firebaseStockInfo } from "../components/Sell";
import { AuthContext } from "../context/AuthContext";
import { db } from "../firebase";
import { YFStockData } from "../types/YFStockData";
import { backupArrayQuote } from "../utils/backupArrayQuote";

const YF_KEY = import.meta.env.VITE_YF;

const Portfolio = () => {
  const [userInfo, setUserInfo] = useState<DocumentData | null>(null);
  const [stockData, setStockData] = useState<YFStockData[] | null>(null);
  const [loading, setLoading] = useState(true);

  const userStocksSymbols = userInfo?.stocks.map(
    (stock: firebaseStockInfo) => stock.stock
  );

  const fullDataOptions = (symbols: string[] | null) => {
    return {
      method: "GET",
      url: `https://yfapi.net/v6/finance/quote?region=US&lang=en&symbols=${symbols}`,
      headers: {
        accept: "application/json",
        "x-api-key": YF_KEY,
      },
    };
  };

  false &&
    useEffect(() => {
      const getStockData = () => {
        axios
          .request(fullDataOptions(userStocksSymbols))
          .then((response) => {
            setStockData(response.data.quoteResponse.result);
            setLoading(false);
            console.log(response.data.quoteResponse.result);
          })
          .catch((error) => {
            console.error(error);
          });
      };
      getStockData();
    }, []);

  useEffect(() => {
    setStockData(backupArrayQuote as YFStockData[]);
    console.log(backupArrayQuote);
    setLoading(false);
  });

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
        {userInfo && stockData && (
          <PieChart
            userInfo={userInfo}
            stockData={stockData}
            loading={loading}
          />
        )}
      </CardBody>
    </Card>
  );
};

export default Portfolio;
