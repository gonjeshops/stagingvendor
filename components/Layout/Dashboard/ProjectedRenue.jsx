import { currency } from '@/lib/currency';
import React from 'react';

const ProjectedRevenue = ({ revenueData }) => {


  return (
    <div className="cards flex-shrink-0">
      <h2 className="cardh4 mb-4">Projected Revenue For Top 4 Products</h2>
      <table className="min-w-full border rounded-md">
        <thead>
          <tr>
            <th className="border p-2">Product name</th>
            <th className="border p-2">Amount</th>
          </tr>
        </thead>
        <tbody>
          {revenueData &&
            Object?.entries(revenueData)?.map(([projectId, amount]) => (
              <tr key={projectId}>
                <td className="border p-2">{projectId}</td>
                <td className="border p-2">{'$'+ Number(amount)?.toLocaleString("en-US")}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectedRevenue;
