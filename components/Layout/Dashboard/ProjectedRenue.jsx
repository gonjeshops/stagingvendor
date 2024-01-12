import React from 'react';

const ProjectedRevenue = ({ revenueData }) => {
  console.log('========', revenueData);

  return (
    <div className="cards flex-shrink-0">
      <h2 className="cardh4 mb-4">Projected Revenue</h2>
      <table className="min-w-full border rounded-md">
        <thead>
          <tr>
            <th className="border p-2">Project ID</th>
            <th className="border p-2">Amount</th>
          </tr>
        </thead>
        <tbody>
          {revenueData &&
            Object?.entries(revenueData)?.map(([projectId, amount]) => (
              <tr key={projectId}>
                <td className="border p-2">Project ID {projectId}</td>
                <td className="border p-2">${amount}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectedRevenue;
