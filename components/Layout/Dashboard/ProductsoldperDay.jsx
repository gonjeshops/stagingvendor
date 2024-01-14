import React from 'react';

const ProductsoldPerDay = ({ productSold }) => {

  return (
    <div className="cards flex-shrink-0">
      <h2 className="cardh4 mb-4">Product sold per day</h2>
      <table className="min-w-full border rounded-md">
        <thead>
          <tr>
            <th className="border p-2">Day</th>
            <th className="border p-2">Total Sold</th>
          </tr>
        </thead>
        <tbody>
          {productSold &&
            productSold.map((item) => (
              <tr key={item.day}>
                <td className="border p-2">{item.day}</td>
                <td className="border p-2">{item.total_sold}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsoldPerDay;
