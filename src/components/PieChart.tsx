import { useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { VStack, Text, Box } from "@chakra-ui/react";
import { DocumentData } from "firebase/firestore";
import { firebaseStockInfo } from "./Sell";
import { stringToColor } from "../utils/stringToColor";
import Loading from "./Loading";
import { YFStockData } from "../types/YFStockData";
import { currentPrice } from "../utils/currentPrice";

ChartJS.register(ArcElement, Tooltip, Legend);

type LineChartProps = {
  userInfo: DocumentData;
  stockData: YFStockData[];
  loading: boolean;
};

export const PieChart = ({ userInfo, stockData, loading }: LineChartProps) => {
  const userStocksSymbols = userInfo?.stocks.map(
    (stock: firebaseStockInfo) => stock.stock
  );

  const data = {
    labels: userStocksSymbols,
    datasets: [
      {
        label: "Currently $",
        data: userInfo.stocks.map((stock: firebaseStockInfo) =>
          (stock.quantity * currentPrice(stock.stock, stockData)).toFixed(2)
        ),
        backgroundColor: userInfo.stocks.map((stock: firebaseStockInfo) =>
          stringToColor(stock.stock)
        ),
        borderColor: userInfo.stocks.map((stock: firebaseStockInfo) =>
          stringToColor(stock.stock, 100, 50)
        ),
        borderWidth: 1,
        hoverOffset: 10,
      },
    ],
  };

  return (
    <VStack borderRadius="md" shadow="lg">
      {loading ? (
        <Loading />
      ) : (
        <Box minWidth="50vw" flexDirection="column" p="3">
          <Text textAlign="center" fontSize="lg">
            Current holdings:
          </Text>
          <Pie data={data} />
        </Box>
      )}
    </VStack>
  );
};
