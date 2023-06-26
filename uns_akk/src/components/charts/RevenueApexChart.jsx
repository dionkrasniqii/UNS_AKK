import { max } from "moment/moment";
import Chart from "react-apexcharts";

export default function RevenueChart({ data, title }) {
  const options = {
    chart: {
      height: 350,
      type: "line",
      toolbar: {
        show: false,
      },
      stacked: false,
      zoom: {
        enabled: false,
      },
    },
    stroke: {
      curve: "smooth",
      width: [3, 3],
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    fill: {
      type: "solid",
      opacity: [0, 1],
    },
    colors: ["#188ae2"],
    xaxis: {
      categories: Object.keys(data),
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          colors: "#adb5bd",
        },
      },
    },
    yaxis: {
      tickAmount: 4,
      min: 0,
      max: Math.max(...Object.values(data)),
      labels: {
        style: {
          colors: "#adb5bd",
        },
      },
    },
    grid: {
      show: true,
      padding: {
        top: 0,
        bottom: 0,
      },
    },
    tooltip: {
      theme: "dark",
    },
  };

  const series = [
    {
      name: "",
      type: "area",
      data: Object.values(data),
    },
  ];
  return (
    <div className='card card-body'>
      <h4 className='header-title mt-0'>{title}</h4>

      <div dir='ltr'>
        <Chart
          options={options}
          series={series}
          type='line'
          height={268}
          className='apex-charts mt-2'
        />
      </div>
    </div>
  );
}
