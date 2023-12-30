import React from 'react';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { fetchStatss } from './fetchStats';

const Dashboard = ({  }) => {
    const {data} = fetchStatss()
  const totalSalesData = {
    labels: data?.transactionsForLast12Months?.map(item => item.month),
    datasets: [{
      label: 'Total Sales',
      data: data?.transactionsForLast12Months?.map(item => item.total_revenue),
      borderColor: 'blue',
      borderWidth: 2,
      fill: false
    }]
  };

  const transactionsData = {
    labels: data?.transactionsForLast12Months?.map(item => item.month),
    datasets: [{
      label: 'Total Revenue',
      data: data?.transactionsForLast12Months?.map(item => item.total_revenue),
      borderColor: 'green',
      borderWidth: 2,
      fill: false,
      innerHeight: '500px'
    }]
  };

  const topSellingProductsData = {
    labels: data?.topSellingProducts?.map(product => product.name),
    datasets: [{
      label: 'Total Quantity Sold',
      data: data?.topSellingProducts?.map(product => product.total_quantity),
      backgroundColor: ['bg-red-500', 'bg-orange-500', 'bg-yellow-500'], // Customize colors as needed
      borderWidth: 1
    }]
  };
console.log('data', data)
  return (
    <p>salessssss</p>
    // <div className="container mx-auto my-8 p-8 bg-white rounded shadow-md">
    //   <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

    //   <div className="flex gap-12 ">
    //   <div className="mb-8 h-">
    //     <h2 className="text-xl font-bold mb-4">Total Sales Over Time</h2>
    //     <Line data={totalSalesData} />
    //   </div>
    //   <div className="mb-8">
    //     <h2 className="text-xl font-bold mb-4">Top Selling Products</h2>
    //     <Doughnut data={topSellingProductsData} />
    //   </div>

    //   </div>

     

    //   <div className="mb-8">
    //     <h2 className="text-xl font-bold mb-4">Total Customer Orders</h2>
    //     <p className="text-lg">Number: {data?.$totalCustomerOrders}</p>
    //   </div>

    //   <div className="mb-8">
    //     <h2 className="text-xl font-bold mb-4">Average Order Value</h2>
    //     <p className="text-lg">Value: ${data?.averageOrderValue}</p>
    //   </div>

    

    //   <div className="mb-8">
    //     <h2 className="text-xl font-bold mb-4">Total Received Quote Requests and Invoices</h2>
    //     {/* Use two separate Bar charts here */}
    //   </div>

    //   <div>
    //     <h2 className="text-xl font-bold mb-4">Transactions for Last 12 Months</h2>
    //     <Bar data={transactionsData} />
    //   </div>
      
    // </div>
  );
};

export default Dashboard;
