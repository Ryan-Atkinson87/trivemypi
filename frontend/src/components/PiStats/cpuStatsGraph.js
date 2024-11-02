import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const CpuStatsGraph = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/cpu_stats");
      const result = await response.json();
      setData(result);
    };

    fetchData();
  }, []);

  const chartData = {
    labels: data.map((point) => new Date(point.time).toLocaleTimeString()), // Adjust based on your time format
    datasets: [
      {
        label: "CPU Usage",
        data: data.map((point) => point.cpu_usage), // Adjust based on your data structure
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
      {
        label: "CPU Temperature",
        data: data.map((point) => point.cpu_temp),
        fill: false,
        borderColor: "rgb(255, 99, 132)",
        tension: 0.1,
      },
    ],
  };

  return (
    <div>
      <h2>CPU Stats</h2>
      <Line data={chartData} />
    </div>
  );
};

export default CpuStatsGraph;
