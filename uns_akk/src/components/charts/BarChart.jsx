import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  Title,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { useMediaQuery } from "react-responsive";

Chart.register(CategoryScale, LinearScale, Title, BarElement, Tooltip, Legend);

export default function BarChart({ data }) {
  const isMobileOrTablet = useMediaQuery({ maxWidth: 767 });

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          display: !isMobileOrTablet,
          font: {
            size: 12,
            weight: "bold",
          },
          maxRotation: 3,
          autoSkip: false,
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          font: {
            size: 12,
            weight: "bold",
          },
        },
      },
    },
    plugins: {
      legend: {
        display: !isMobileOrTablet,
        labels: {
          font: {
            size: 14,
            weight: "bold",
          },
        },
      },
    },
    elements: {
      bar: {
        borderWidth: 1,
        borderRadius: 4,
        barThickness: "flex", // Adjust th
      },
    },
    datasets: {
      bar: {
        categoryPercentage: 0.8, // Increase the value to make the bars taller
        barPercentage: 0.9, // Increase the value to make the bars taller
      },
    },
  };

  return <Bar data={data} options={options} />;
}
