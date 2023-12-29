import {useState} from 'react';
import { FaEnvelope, FaAngleDown } from 'react-icons/fa';
import ImgCard from '../card/ImgCard';
import Pagination from '../Pagination';
import { useRouter } from 'next/router';
import { currency } from '@/lib/currency';

const OrderTbale = ({data, orderlist}) => {
    const router = useRouter()
    
    // paginaation
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 50; // Replace this with the total number of pages in your data

    const handlePageChange = (page) => {
        setCurrentPage(page);
        // Fetch data from the server here based on the selected page.
    };

    const [selectedOption, setSelectedOption] = useState('');

    const handleRadioBtn = (event) => {
        const newValue = event.target.value;
        setSelectedOption((prevValue) => (prevValue === newValue ? '' : newValue)); 
    };

  return (
    <div className="overflow-x-scroll lg:overflow-visible">
      <table className="min-w-full text-sm table-auto lg:w-full">
        <thead>
          <tr className='border-b border-light300'>
            {/* <th className="pl-2 py-4 text-start ">
  
                <input
                    type="radio"
                    name="product"
                    value={"option"}
                    checked={selectedOption === 'option'}
                    onClick={handleRadioBtn}
                    className="w-4 h-4 border rounded-md border-zinc-400"
                />
              
            </th> */}

           {
            ['ORDER ID', 'TOTAL', 'CUSTOMER', 'ORDER STATUS',  'FULFILMENT STATUS', 'DELIVERY TYPE', 'TRACKING NUMBER', 'DATE', 'SHIPPING DETAILS'].map((item, i )=>(
                <th key={i} className={`px-2 py-4 ${i===6?'text-end pr-2':'text-start'}`} >
                  {item}
              </th>
            ))
           }

          </tr>
        </thead>

        <tbody>
        {orderlist?.map(({ id, subtotal, user_name, order_status, status, shipping_details, billing_details, tracking_number, updated_at }) => {
          let address = JSON.parse(shipping_details);
          const addressLine = `${address?.apt ?? ''}${address?.apt ? ', ' : ''}${address?.address ?? ''}, ${address?.city ?? ''}, ${address?.state ?? ''}, ${address?.postcode ?? ''}`;


            return <tr key={id} className='border-b  border-light300 hover:bg-gray-300  duration-300' 
                      >
              {/* <td className="pl-2 py-4 text-start w-10">
                <label>
                <input
                    type="radio"
                    name="product"
                    value={"option"+id}
                    checked={selectedOption === 'option'+id}
                    onClick={handleRadioBtn}
                    // onChange={''}
                    className="w-4 h-4 border rounded-md border-zinc-400"
                />
                </label>
              </td> */}

              <td className="px-2 py-2" >
                <p onClick={()=>router.push(`/vendorb2b/workspace/orders/${id}`)}  
                className="text-blue hover:underline duration-300 cursor-pointer"  >ORDER{id}</p>
              </td>

              <td className="px-2">
                <p className="text-">{currency + subtotal}</p>
              </td>

              <td className="px-2  ">
                <div className="flex gap-2 items-center">
                    <div className="overflow-hidden h-6 w-6 rounded-full flex-shrink-0 bg-blue-200">
                        <h4 className='flex items-center w-full h-full justify-center text-sm font-bold text-blue'>{user_name[0]}</h4>
                    </div>
                    <p className="">{user_name}</p>
                </div>
              </td>

              <td className='px-2'>
                {order_status}

              </td>
              <td className='px-2'>
                {status}

              </td>
              <td className='px-2'>
                {'-'}
              </td>
              <td className='px-2'>
                {tracking_number}
              </td>
              <td className='px-2'>
                {new Date(updated_at).toLocaleDateString()}
              </td>
              <td className='px-2 py-2'>
                {addressLine}
              </td>
            </tr>
            })}
        </tbody>
      </table>

    </div>
  );
};

export default OrderTbale;
