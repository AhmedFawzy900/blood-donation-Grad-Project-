import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';

ChartJS.register(ArcElement, Tooltip);

const DoughnutChart = () => {
  const data = {
    labels: ['Cancelled Requests', 'Done Requests', 'Pending Requests'],
    datasets: [
      {
        data: [3, 4, 2],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  const options = {
    // You can customize chart options here
  };

  return (
  <div className='doughnut'>
      <Doughnut data={data} options={options} />
  </div>
);
};

export default DoughnutChart;
