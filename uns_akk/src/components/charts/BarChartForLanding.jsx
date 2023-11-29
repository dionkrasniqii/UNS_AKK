import React from 'react';
import { Bar } from 'react-chartjs-2';
const BarChartForLanding = ({ data, description }) => {
  const years = Object.keys(data);
  const colors = ['rgba(75,192,192,0.2)', 'rgba(255,99,132,0.2)', 'rgba(255,206,86,0.2)'];

  const chartData = {
    labels: years,
    datasets: Object.keys(data[years[0]]).map((label, index) => ({
      label,
      backgroundColor: colors[index],
      borderColor: colors[index],
      borderWidth: 1,
      data: years.map(year => data[year][label]),
    })),
  };

  const options = {
    indexAxis: 'x',
    elements: {
      bar: {
        barThickness: 0.2,
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
  };

  return (
    <React.Fragment>
      <Bar data={chartData} options={options} />
      {description && <p style={{ textAlign: 'center' }}>{description}</p>}
    </React.Fragment>
  );
};

export default BarChartForLanding;