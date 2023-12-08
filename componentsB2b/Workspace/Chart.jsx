// ChartExample.js
import React from 'react';
import { Bar, Pie, Line, Doughnut } from 'react-chartjs-2';
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { useState } from "react";
import { chartdata } from '@/data/chartdata'; 

Chart.register(CategoryScale);
 

const ExampleChart = ({type, heading, description }) => {
  const [chartData, setChartData] = useState({
    labels: chartdata.map((data) => data.year), 
    datasets: [
      {
        label: "Users Gained ",
        data: chartdata.map((data) => data.userGain),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "&quot;#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0"
        ],
        borderColor: "black",
        borderWidth: 0,
      //  height: '100%',
      }
    ]
  });


 

  return (
    <div className='flex flex-col sm:w-[400px] sm:h-full justify-between gap-8 '>
      <div className="">
        <h2 className='text-lg font-medium'>{heading}</h2>
        <p>{description}</p>
      </div>

      {type==='Pie' && <Pie
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Users Gained between 2016-2020"
            }
          }
        }}
      />}

      {type==='Bar' && <Bar
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Users Gained between 2016-2020"
            }
          }
        }}
      />}

       {type==='Line'&&<Line
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Users Gained between 2016-2020"
            }
          }
        }}
      />}
       {type==='Doughnut' && <Doughnut
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Users Gained between 2016-2020"
            }
          }
        }}
      />}
      
    </div>
  );
};

export default ExampleChart;