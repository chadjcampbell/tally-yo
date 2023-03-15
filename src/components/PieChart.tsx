import { useEffect, useRef } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Chart } from "react-chartjs-2";
import { VStack, Text, Flex } from "@chakra-ui/react";
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
const YF_KEY = import.meta.env.VITE_YF;

export const PieChart = ({ userInfo, stockData, loading }: LineChartProps) => {
  const chartRef = useRef<ChartJS>(null);

  const userStocksSymbols = userInfo?.stocks.map(
    (stock: firebaseStockInfo) => stock.stock
  );

  const options = {
    type: "pie",
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Current Holdings Values",
      },
    },
  };
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

  useEffect(() => {
    console.log(userInfo);
  }, []);

  return (
    <VStack borderRadius="md" shadow="lg">
      {loading ? (
        <Loading />
      ) : (
        <Flex w="60%" flexDirection="column" p="3">
          <Text textAlign="center" fontSize="lg">
            Current holdings:
          </Text>
          <Chart type="pie" ref={chartRef} options={options} data={data} />
        </Flex>
      )}
    </VStack>
  );
};
