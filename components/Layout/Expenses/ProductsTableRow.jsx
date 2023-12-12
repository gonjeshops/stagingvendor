import Image from 'next/image'
import React from 'react'
import { RequestModal } from './ExpensesModals'

const ProductsTableRow = ({data, }) => {
    console.log('PRODUCTS===',data)

  return (
    <>
         {data?.map((item,i ) => {
             return ( <tr key={item?.id} className='border-b   border-light300 bg-hover300  duration-300' 
            >
              <td className="p-2 cursor-pointer">
                <div className='w-full h-14 border rounded shrink-0 cursor-pointer overflow-hidden'>
                    <Image width={100} height={100} src={item?.image?.thumbnail} alt={'product'+i} className='object-cover w-full h-full '/>
                </div>
              </td>

              <td className="px-2 cursor-pointer">
                <p className="text-">{item?.name}</p>
              </td>

              <td className="px-2 cursor-pointer">
                <p className="text-">{item?.name_of_shop}</p>
              </td>

              <td className="px-2 cursor-pointer">
                <p className="text-">AUD{item?.price}</p>
              </td>

              <td className="px-2 cursor-pointer">
                <p className="text-">{item?.discount}%</p>
              </td>

              <td className="px-2  " >
                <p className="text-">AUD{item?.sale_price}</p>
              </td>

              <td className='px-2 cursor-pointer'>
                ${item?.quantity}
              </td>

              <td className='px-2 cursor-pointer uppercase'>
                {item?.status}
              </td>
              <td className='px-2 cursor-pointer'>
              <RequestModal item={item} />
              </td>
            </tr>
             )
           })}
    </>
  )
}

export default ProductsTableRow