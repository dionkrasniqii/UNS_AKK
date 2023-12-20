import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Bar } from "react-chartjs-2";
import { useMediaQuery } from "react-responsive";
const BarChartForLanding = ({ data, description }) => {
  const barRef = useRef();
  const [barWidth, setBarWidth] = useState(0);
  const isMobileOrTablet = useMediaQuery({ maxWidth: 767 });

  const years = Object.keys(data);
  const colors = [
    "	rgba(59, 96, 198,1)",
    "rgba(95, 133, 117,1)",
    "rgba(125, 249, 255,1)",
  ];

  const chartData = {
    labels: years,
    datasets: Object.keys(data[years[0]]).map((label, index) => ({
      label,
      backgroundColor: colors[index],
      borderColor: colors[index],
      borderWidth: 1,
      data: years.map((year) => data[year][label]),
    })),
  };
  useEffect(() => {
    if (barRef.current) {
      setBarWidth(barRef.current.clientWidth);
    }
  }, [chartData,barRef.current]);

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
          callback: function (value) {
            return Number.isInteger(value) ? value : null; // Return only integer values
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
            weight: "normal",
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
  return (
    <React.Fragment>
      <Bar data={chartData} options={options} ref={barRef} />

      {description && (
        <p style={{ maxWidth: barWidth, textAlign: "center", margin: 0 }}>
          {description}
        </p>
      )}
    </React.Fragment>
  );
};

export default BarChartForLanding;
