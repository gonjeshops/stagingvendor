import React from 'react';

const TopSellingProducts = ({ topSellingProducts }) => {
  return (
    <div className="my-8 bg-white p-8 rounded-md shadow">
      <h2 className="text-xl font-bold mb-4">Top Selling Products</h2>
      <table className="min-w-full">
        <thead>
          <tr className="">
            <th className="text-left p-2">ID</th>
            <th className="text-left p-2">Image</th>
            <th className="text-left p-2">Name</th>
            <th className="text-left p-2">Quantity</th>
          </tr>
        </thead>
        <tbody>
          {topSellingProducts &&
            topSellingProducts?.map((product) => (
              <tr key={product.product_id} className="border-b border-gray-300">
                <td className="p-2">{product.product_id}</td>
                <td className="p-2">
                  <img
                    src={product.image.thumbnail}
                    alt={product.name}
                    className="h-24 w-24 rounded-full object-cover"
                  />
                </td>
                <td className="p-2 text-wrap">{product.name}</td>
                <td className="p-2">{product.total_quantity}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default TopSellingProducts;
