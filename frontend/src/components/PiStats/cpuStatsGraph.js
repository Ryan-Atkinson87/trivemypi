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
    // Fetch CPU stats data from your API
    fetch("http://localhost:8000/api/cpu_stats")
      .then((response) => response.json())
      .then((fetchedData) => {
        setData(fetchedData.Data || []); // Set data from API in the component state
      })
      .catch((error) => console.error("Error fetching CPU usage data:", error));
  }, []); // Run once when the component mounts

  // Prepare data for CPU usage
  const cpuUsageData = {
    labels: data.map((point) => new Date(point.time).toLocaleTimeString()), // Time labels
    datasets: [
      {
        label: "CPU 1 Usage",
        data: data.map((point) => point.cpu1_usage), // Data for CPU 1
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
      {
        label: "CPU 2 Usage",
        data: data.map((point) => point.cpu2_usage), // Data for CPU 2
        fill: false,
        borderColor: "rgb(255, 99, 132)",
        tension: 0.1,
      },
      {
        label: "CPU 3 Usage",
        data: data.map((point) => point.cpu3_usage), // Data for CPU 3
        fill: false,
        borderColor: "rgb(54, 162, 235)",
        tension: 0.1,
      },
      {
        label: "CPU 4 Usage",
        data: data.map((point) => point.cpu4_usage), // Data for CPU 4
        fill: false,
        borderColor: "rgb(255, 206, 86)",
        tension: 0.1,
      },
    ],
  };

  // Prepare data for CPU temperature
  const cpuTempData = {
    labels: data.map((point) => new Date(point.time).toLocaleTimeString()), // Time labels
    datasets: [
      {
        label: "CPU Temperature",
        data: data.map((point) => point.cpu_temp), // Temperature data
        fill: false,
        borderColor: "rgb(255, 99, 132)",
        tension: 0.1,
      },
    ],
  };

  // Prepare data for memory usage
  const memUsageData = {
    labels: data.map((point) => new Date(point.time).toLocaleTimeString()), // Time labels
    datasets: [
      {
        label: "Memory Usage",
        data: data.map((point) => point.memory_pcnt), // Memory usage data
        fill: false,
        borderColor: "rgb(255, 206, 86)",
        tension: 0.1,
      },
    ],
  };

  return (
    <div>
      <h2>CPU Usage Stats</h2>
      <Line data={cpuUsageData} />
      <h2>CPU Temperature</h2>
      <Line data={cpuTempData} />
      <h2>Memory Usage</h2>
      <Line data={memUsageData} />
    </div>
  );
};

export default CpuStatsGraph;
