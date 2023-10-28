import React, { useState, useEffect, useMemo } from 'react';
import ImgCard from './ImgCard';
import { FaTrash } from 'react-icons/fa';
import { TiDeleteOutline } from 'react-icons/ti';



const GetQuoteProductCard = ({ item, toggleCartItemQuanitity, onRemove}) => {
  const [quantity, setQuantity] = useState(item?.quantity);
  const [subtotal, setSubtotal] = useState(item?.subtotal);

  // Calculate the total price based on quantity and item price
  const totalprice = useMemo(() => {
    return (item?.quantity * item?.price);
  }, [item?.quantity, item?.price]);

  const handleIncreaseQuantity = () => {
    setQuantity((prev) => prev + 1);
    // setQuantity((prev) => prev + 1);
    toggleCartItemQuanitity(item?.id, 'inc')
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
      toggleCartItemQuanitity(item?.id, 'dec')
    }
  };

  return (
    <div className="py-4 border-b w-full flex gap-4 items-center">
      <div className="w-28 h-28 shrink-0 border rounded-lg overflow-hidden">
        <ImgCard src={item?.product?.image?.thumbnail} alt={'product'} />
      </div>

      <div className="w-full">
        <h5 className="text-lg font-medium pb-2">{item?.name}</h5>

        <div className="flex justify-between gap-3">
          <div className="">
            <div className="w-full">
              <p className="block font-medium mb-1">Quantity</p>
              <div className="flex items-center gap-1">
                <div className="border rounded w-14 sm:w-20 flex items-center">
                  <p className="text-xl w-3/4 h-full flex justify-center m-auto">
                    {item?.quantity}
                  </p>
                  <div className="w-1/4 flex flex-col">
                    <div
                      onClick={handleIncreaseQuantity}
                      className="hover-grey border cursor-pointer "
                    >
                      +
                    </div>
                    <div
                      onClick={handleDecreaseQuantity}
                      className="hover-grey cursor-pointer   border"
                    >
                      -
                    </div>
                  </div>
                </div>
                <p className="text-lg">{item?.unit}</p>
              </div>
            </div>
          </div>

          <div className="price">
            <h5 className="text font-medium mb-2">Price/1</h5>
            <h3 className="text-xl sm:text-2xl font-semibold">${item?.price}</h3>
          </div>

          <div className="total">
            <h5 className="text font-medium mb-2">Subtotal</h5>
            <h3 className="text-xl sm:text-2xl font-semibold">${totalprice}</h3>
          </div>

          <div className="shrink-0">
            <div type="button" 
            onClick={()=>onRemove(item)}
            className=" text-red text-3xl cursor-pointer font-medium p-1 rounded-full">
              <TiDeleteOutline /> 
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetQuoteProductCard;
