import React from 'react';

const SalesByCity = ({ salesData }) => {
  return (
    <div className="cards flex-shrink-0">
      <h2 className="cardh4 mb-4">Sales By City</h2>
      <ul>
        {salesData?.map((item, index) => (
          <li key={index} className="flex justify-between items-center border-b py-2">
            <span className="text-gray-600">{item.city || 'Unknown City'}:</span>
            <span className="text-green-600 font-bold">{item.total_sold} units</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SalesByCity;
