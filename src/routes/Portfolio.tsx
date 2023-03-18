import { Card, CardHeader, HStack, Heading, CardBody } from "@chakra-ui/react";
import axios from "axios";
import { doc, DocumentData, onSnapshot } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import Loading from "../components/Loading";
import { PieChart } from "../components/PieChart";
import PortfolioSummary from "../components/PortfolioSummary";
import { firebaseStockInfo } from "../components/Sell";
import { AuthContext } from "../context/AuthContext";
import { db } from "../firebase";
import { YFStockData } from "../types/YFStockData";
import { backupArrayQuote } from "../utils/backupArrayQuote";

const Portfolio = () => {
  const [userInfo, setUserInfo] = useState<DocumentData | null>(null);
  const [stockData, setStockData] = useState<YFStockData[] | null>(null);
  const [loading, setLoading] = useState(true);
  const { user, yfKey } = useContext(AuthContext);

  const userStocksSymbols = userInfo?.stocks.map(
    (stock: firebaseStockInfo) => stock.stock
  );

  const fullDataOptions = (symbols: string[] | null) => {
    return {
      method: "GET",
      url: `https://yfapi.net/v6/finance/quote?region=US&lang=en&symbols=${symbols}`,
      headers: {
        accept: "application/json",
        "x-api-key": yfKey,
      },
    };
  };

  // FIX THIS!
  /*   useEffect(() => {
    const getStockData = () => {
      axios
        .request(fullDataOptions(userStocksSymbols))
        .then((response) => {
          setStockData(response.data.quoteResponse.result);
          console.log(response);
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
        });
    };
    userStocksSymbols && getStockData();
  }, [userStocksSymbols]); */

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
            {userInfo && stockData && (
              <>
                <PortfolioSummary stockData={stockData} userInfo={userInfo} />

                <PieChart
                  userInfo={userInfo}
                  stockData={stockData}
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
