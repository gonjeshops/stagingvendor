import React from 'react';

const TopSalesOfDay = ({ topSales }) => {
  console.log('==topSales==', topSales);

  return (
    <div className="cards">
      <h2 className="cardh4 mb-4">Top Sales of the Day</h2>
      <table className="min-w-full">
        <thead>
          <tr className=''>
            <th className="text-left p-2">ID</th>
            <th className="text-left p-2">Image</th>
            <th className="text-left p-2">Name</th>
            <th className="text-left p-2">Quantity</th>
          </tr>
        </thead>
        <tbody>
          {topSales &&
            topSales?.map((product) => (
              <tr key={product.product_id} className="border-b border-gray-300">
                <td className="p-2">{product.product_id}</td>
                <td className="p-2">
                  <img
                    src={product.image.thumbnail}
                    alt={product.name}
                    className="h-24 w-24 rounded-full object-cover"
                  />
                </td>
                <td className=" p-2 text-wrap">{product.name}</td>
                <td className="p-2 ">{product.total_quantity}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default TopSalesOfDay;
