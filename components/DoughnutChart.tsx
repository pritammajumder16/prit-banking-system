"use client";
import { ArcElement, Chart, Legend, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";
Chart.register(ArcElement, Tooltip, Legend);
const DoughnutChart = ({ accounts }: DoughnutChartProps) => {
  const data = [
    {
      label: "Banks",
      data: [1250, 2500, 3750],
      backgroundColor: ["#0747b6", "#2265d8", "#2f91fa"],
    },
  ];
  const labels = ["Bank 1", "Bank 2", "Bank 3"];
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
