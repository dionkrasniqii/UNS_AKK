import Chart from "react-apexcharts";

export default function DonutChart({ data, labels, colors, title }) {
  const apexOpts = {
    chart: {
      type: "donut",
    },
    plotOptions: {
      pie: {
        expandOnClick: true,
        donut: {
          labels: {
            show: true,
            name: {
              show: true,
              formatter: (val) => {
                return val;
              },
              offsetY: 4,
              color: "#98a6ad",
            },
            value: {
              show: true,
              formatter: (val) => {
                return val;
              },
              color: "#98a6ad",
            },
          },
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    colors: colors,
    legend: {
      show: true,
      position: "bottom",
      height: 40,
      labels: {
        useSeriesColors: true,
      },
    },
    labels: labels,
    tooltip: {
      enabled: false,
    },
  };
  const apexData = data;

  return (
    <div className="card card-body">
      <h4 className="card-title text-center">{title}</h4>
      <Chart
        options={apexOpts}
        series={apexData}
        type="donut"
        height={302}
        className="apex-charts mt-2"
      />
    </div>
  );
}
