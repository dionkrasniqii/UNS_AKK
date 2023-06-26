import Chart from "react-apexcharts";

export default function StatisticWidget1({
  title,
  data,
  color,
  stats,
  subTitle,
}) {
  const apexOpts = {
    chart: {
      type: "radialBar",
      sparkline: {
        enabled: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      radialBar: {
        hollow: {
          margin: 0,
          size: "75%",
        },
        track: {
          background: color,
          opacity: 0.3,
          margin: 0,
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            show: true,
            color: color,
            fontWeight: 700,
            fontSize: "18px",
            offsetY: 5,
            formatter: (val) => {
              return String(val);
            },
          },
        },
      },
    },
    states: {
      hover: {
        filter: {
          type: "none",
        },
      },
    },
    colors: [color],
  };

  const apexData = [data];

  return (
    <div className='card card-body'>
      <h4 className='header-title mt-0 mb-4'>{title}</h4>
      <div className='widget-chart-1'>
        <div className='widget-chart-box-1 float-start'>
          <Chart
            options={apexOpts}
            series={apexData}
            type='radialBar'
            width={77}
            height={77}
            className='apex-charts mt-0 '
          />
        </div>
        <div className='widget-detail-1 text-end'>
          <h2 className='fw-normal pt-2 mb-1'>{stats}</h2>
          <p className='text-muted mb-1'>{subTitle}</p>
        </div>
      </div>
    </div>
  );
}
