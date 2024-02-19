import React from 'react';

const Fake = ({ monthlyRevenue, monthlyOrders }) => {
  return (
    <div className='flex gap-8  w-full'>
      <div className="my-8 bg-white p-8 rounded-md shadow w-1/3">
        <h2 className="text-xl font-bold mb-4">Monthly Revenue</h2>
        <table className="min-w-full">
          <thead>
            <tr className="">
              <th className="text-left p-2">Month</th>
              <th className="text-left p-2">Total Revenue</th>
            </tr>
          </thead>
          <tbody>
            {monthlyRevenue &&
              monthlyRevenue.map((entry) => (
                <tr key={entry.month} className="border-b border-gray-300">
                  <td className="p-2">{entry.month}</td>
                  <td className="p-2">{entry.total_revenue}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div className="my-8 bg-white p-8 rounded-md shadow w-1/3">
        <h2 className="text-xl font-bold mb-4">Monthly Orders</h2>
        <table className="min-w-full">
          <thead>
            <tr className="">
              <th className="text-left p-2">Month</th>
              <th className="text-left p-2">Total Orders</th>
            </tr>
          </thead>
          <tbody>
            {monthlyOrders &&
              monthlyOrders.map((entry) => (
                <tr key={entry.month} className="border-b border-gray-300">
                  <td className="p-2">{entry.month}</td>
                  <td className="p-2">{entry.total_orders}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Fake;
