import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';

ChartJS.register(ArcElement, Tooltip);

const DoughnutChart = ({requests , deletedRequests}) => {
  const [requestsLength , setRequestsLength] = useState(
    {
      pending : 0,
      done : 0,
      cancelled : 0
    }
  ); 
  useEffect(() => {
    if (requests && deletedRequests) {
      setRequestsLength({
        pending : requests.filter(request => request.status === 'pending').length,
        done : requests.filter(request => request.status === 'done').length,
        cancelled : deletedRequests.filter(request => request.status === 'cancelled').length
      })
    }
  },[requests , deletedRequests])
  console.log(requestsLength);
  const data = {
    labels: ['Cancelled Requests', 'Done Requests', 'Pending Requests'],
    datasets: [
      {
        data: [requestsLength.cancelled , requestsLength.done , requestsLength.pending],
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
