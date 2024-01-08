import React, { useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa'; // Assuming you have React Icons installed

const CartNotificationDropdown = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Item 1', price: 20 },
    { id: 2, name: 'Item 2', price: 30 },
    { id: 3, name: 'Item 3', price: 15 }
  ]);

  const totalItems = cartItems.length;

  return (
    <div className="">
      {/* <button
        type="button"
        className="inline-flex items-center justify-center p-2 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring focus:border-blue-300"
        id="cartButton"
      >
        <FaShoppingCart className="w-6 h-6" />
        {totalItems > 0 && (
          <span className="ml-1 font-semibold text-sm text-white bg-red-500 rounded-full w-5 h-5 flex items-center justify-center">
            {totalItems}
          </span>
        )}
      </button> */}

      {totalItems > 0 ? (
        <div className="w-full flex flex-col justify-between gap-6 h-full" role="menu" aria-orientation="vertical" aria-labelledby="cartButton" tabIndex="-1">
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex  w-full items-center justify-between  gap-4">

                <div className="flex  w-full items-center   gap-4 ">
                  <div className="bg-gray-100 rounded-md w-16 h-16"></div>
                  <div className="">{item.name}</div>
                </div>
                
                  <div className="font-semibold">${item.price}</div>
              </div>
            ))}
          </div>
          <div className="flex justify-end gap-4 px- py-2 border-t gray-200">
            <div className="font-semibold">Total:</div>
            <div className="font-semibold">${cartItems.reduce((acc, item) => acc + item.price, 0)}</div>
          </div>
        </div>
      ) : (
        <div className="h-full w-full flex flex-col justify-center items-center gap-4" role="menu" aria-orientation="vertical" aria-labelledby="cartButton" tabIndex="-1">
          <FaShoppingCart size={60} className={'text-gray-500'}/>
          <div className="px-4 py-2 text-gray-500">Your cart is empty.</div>
        </div>
      )}
    </div>
  );
};

export default CartNotificationDropdown;
