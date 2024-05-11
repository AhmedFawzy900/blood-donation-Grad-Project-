import React from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const LineChart = () => {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        label: 'Cancelled Process',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        data: [0, 10, 5, 2, 20],
      },{
        label: 'Done Process',
        backgroundColor: 'rgb(23 135 224)',
        borderColor: 'rgb(23 135 224)',
        data: [0, 5, 4, 15, 10],
      }
    ],
  };

  return (
    <div className='line-chart'>
      <Line data={data} />
    </div>
  );
};

export default LineChart;
