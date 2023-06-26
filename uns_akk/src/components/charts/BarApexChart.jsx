import Chart from "react-apexcharts";
import { useTranslation } from "react-i18next";

export default function BarApexChart({ data, colors, title }) {
  const { t } = useTranslation();

  const apexOpts = {
    chart: {
      type: "bar",
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        columnWidth: "30%",
        distributed: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: false,
    },
    xaxis: {
      categories: [""],
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
      labels: {
        style: {
          colors: "#adb5bd",
        },
      },
    },
    grid: {
      show: false,
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
    },
    fill: {
      opacity: 1,
    },
    colors: colors,
    tooltip: {
      theme: "dark",
    },
  };
  const apexData = [];

  Object.entries(data).forEach((obj) => {
    apexData.push({
      name: t(obj[0]),
      data: [obj[1]],
    });
  });

  return (
    <div className='card card-body'>
      <h4 className='header-title mt-0'>{title}</h4>

      <div dir='ltr'>
        <Chart
          options={apexOpts}
          series={apexData}
          type='bar'
          height={268}
          className='apex-charts mt-2'
        />
      </div>
    </div>
  );
}
