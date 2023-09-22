import {useState} from 'react';
import { FaEnvelope, FaAngleDown } from 'react-icons/fa';
import ImgCard from '../card/ImgCard';
import Pagination from '../Pagination';
import { useRouter } from 'next/router';

const OrderTbale = ({data}) => {
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
      <table className="min-w-full table-auto lg:w-full">
        <thead>
          <tr className='border-b border-light300'>
            <th className=" py-4 text-start ">
            <label>
                <input
                    type="radio"
                    name="product"
                    value={"option"}
                    checked={selectedOption === 'option'}
                    onClick={handleRadioBtn}
                    className="w-4 h-4 border rounded-md border-zinc-400"
                />
                </label>
            </th>

           {
            ['ORDER', 'TOTAL', 'CUSTOMER', 'PAYMENT STATUS', 'FULFILMENT STATUS', 'DELIVERY TYPE', 'DATE'].map((item, i )=>(
                <th key={i} className={`px-2 py-4 ${i===6?'text-end pr-2':'text-start'}`} >
                    <div className="flex gap-2 items-center ">
                        <p className="text-sm">{item}</p>
                        <FaAngleDown />
                    </div>
              </th>
            ))
           }

          </tr>
        </thead>

        <tbody>
          {data?.map(({id, orderId, date, total, customerImgUrl, customerName, paymentStatus, fulfillmentStatus, deliveryType}) => (
            <tr key={id} className='border-b   border-light300 bg-hover300  duration-300' 
            onClick={()=>router.push(`/workspace/orders/${id}`)}            >
              <td className=" py-4 text-start w-10">
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
              </td>

              <td className="px-2">
                <p className="text-blue">{orderId}</p>
              </td>

              <td className="px-2">
                <p className="text-">{total}</p>
              </td>

              <td className="px-2  ">
                <div className="flex gap-2 items-center">
                    <div className="overflow-hidden h-8 w-8 rounded-full flex-shrink-0 bg-blue-200">
                        <h4 className='flex items-center w-full h-full justify-center text-lg font-bold text-blue'>{customerName.slice(0,1)}</h4>
                        {/* <ImgCard/> */}
                    </div>
                    <p className="">{customerName}</p>
                </div>
              </td>

              <td className='px-2'>
                {paymentStatus}

              </td>
              <td className='px-2'>
                {fulfillmentStatus}

              </td>
              <td className='px-2'>
                {deliveryType}

              </td>
              <td className='px-2'>
                {date}

              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-center items-center">
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      </div>
    </div>
  );
};

export default OrderTbale;
