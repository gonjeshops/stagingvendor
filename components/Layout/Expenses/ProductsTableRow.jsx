import Image from 'next/image'
import React from 'react'
import { RequestModal } from './ExpensesModals'
import { currency } from '@/lib/currency'

const ProductsTableRow = ({data, }) => {
    console.log('PRODUCTS===',data)

  return (
    <>
         {data?.map((item,i ) => {
             return ( <tr key={item?.id} className='border-b border-light300  bg-hover300  duration-300' 
            >
              <td className=" ">
                <div className='w-20 h-20 border rounded shrink-0 overflow-hidden'>
                    <Image width={100} height={100} src={item?.image?.thumbnail} alt={'product'+i} className='object-cover w-full h-full '/>
                </div>
              </td>

              <td>
               {item?.name}
              </td>

              <td>
                {item?.name_of_shop}
              </td>

              <td>
                {item?.price&& currency() + item?.price}
              </td>

              <td>
                {item?.discount}%
              </td>

              <td>
               {item?.sale_price && currency() + item?.sale_price}
              </td>

              <td>
                ${item?.quantity}
              </td>

              <td className='  uppercase'>
                {item?.status}
              </td>
              <th className='px-2   bg-light100'>
              <RequestModal item={item} />
              </th>
            </tr>
             )
           })}
    </>
  )
}

export default ProductsTableRow