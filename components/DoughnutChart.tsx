"use client";
import { ArcElement, Chart, Legend, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";
Chart.register(ArcElement, Tooltip, Legend);
const DoughnutChart = ({ accounts }: DoughnutChartProps) => {
  const accountNames = accounts?.map((a) => a.name);
  const balances = accounts?.map((b) => b.currentBalance);
  const data = [
    {
      label: "Banks",
      data: balances,
      backgroundColor: ["#0747b6", "#2265d8", "#2f91fa"],
    },
  ];
  const labels = accountNames;
  return (
    <Doughnut
      options={{
        cutout: "60%",
        plugins: {
          legend: {
            display: false,
          },
        },
      }}
      data={{ datasets: data, labels }}
    />
  );
};

export default DoughnutChart;
