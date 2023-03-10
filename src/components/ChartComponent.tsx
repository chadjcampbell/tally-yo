import { useRef, useEffect, useState } from "react";
import type { ChartData, ChartArea } from "chart.js";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import { faker } from "@faker-js/faker";
import { YFStockData } from "../types/YFStockData";
import { YFChartData } from "../types/YFChartData";
import { HStack, VStack, Text } from "@chakra-ui/react";
import PercentBox from "./PercentBox";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const colors = [
  "red",
  "orange",
  "yellow",
  "lime",
  "green",
  "teal",
  "blue",
  "purple",
];

function createGradient(ctx: CanvasRenderingContext2D, area: ChartArea) {
  const colorStart = faker.helpers.arrayElement(colors);
  const colorMid = faker.helpers.arrayElement(
    colors.filter((color) => color !== colorStart)
  );
  const colorEnd = faker.helpers.arrayElement(
    colors.filter((color) => color !== colorStart && color !== colorMid)
  );

  const gradient = ctx.createLinearGradient(0, area.bottom, 0, area.top);

  gradient.addColorStop(0, colorStart);
  gradient.addColorStop(0.5, colorMid);
  gradient.addColorStop(1, colorEnd);

  return gradient;
}

type ChartComponentProps = {
  stock: YFStockData;
  chartDatafromAPI: YFChartData;
};

export const ChartComponent = ({
  stock,
  chartDatafromAPI,
}: ChartComponentProps) => {
  const chartRef = useRef<ChartJS>(null);
  const [chartData, setChartData] = useState<ChartData<"bar">>({
    datasets: [],
  });

  const v1 = chartDatafromAPI.indicators.adjclose[0].adjclose[0];
  const v2 =
    chartDatafromAPI.indicators.adjclose[0].adjclose[
      chartDatafromAPI.indicators.adjclose[0].adjclose.length - 1
    ];
  const thirtyDayPercent = ((v2 - v1) / Math.abs(v1)) * 100;

  const labels = chartDatafromAPI.timestamp.map((ts) =>
    new Date(ts * 1000).toLocaleDateString().slice(0, -5)
  );

  const data = {
    labels,
    datasets: [
      {
        label: `${stock.symbol} 30 day`,
        data: chartDatafromAPI.indicators.adjclose[0].adjclose.map(
          (high) => high
        ),
      },
    ],
  };

  useEffect(() => {
    console.log(chartDatafromAPI);
    const chart = chartRef.current;

    if (!chart) {
      return;
    }

    const chartData = {
      ...data,
      datasets: data.datasets.map((dataset) => ({
        ...dataset,
        borderColor: createGradient(chart.ctx, chart.chartArea),
      })),
    };

    setChartData(chartData);
  }, []);

  return (
    <VStack>
      <VStack>
        <Text>Current: ${stock.regularMarketPrice.toFixed(2)}</Text>
        <HStack>
          <Text>30 day % change</Text>
          <PercentBox percent={thirtyDayPercent} />
        </HStack>
      </VStack>
      <Chart ref={chartRef} type="line" data={chartData} />
    </VStack>
  );
};
