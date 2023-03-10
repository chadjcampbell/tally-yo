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

  const labels = chartDatafromAPI.timestamp.map((ts) =>
    new Date(ts * 1000).toLocaleDateString().slice(0, -5)
  );

  const data = {
    labels,
    datasets: [
      {
        label: stock.symbol,
        data: chartDatafromAPI.indicators.quote[0].high.map((high) => high),
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

  return <Chart ref={chartRef} type="line" data={chartData} />;
};
