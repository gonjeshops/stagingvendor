import {useState} from 'react';
import { FaEnvelope, FaAngleDown } from 'react-icons/fa';
import ImgCard from '../card/ImgCard';
import { useRouter } from 'next/router';

const InvoiceTable = ({data, invoicess, tableHeader}) => {
    const router = useRouter()
    console.log('INVOICE====', invoicess)

    const [selectedOption, setSelectedOption] = useState('');

    const handleRadioBtn = (event) => {
        const newValue = event.target.value;
        setSelectedOption((prevValue) => (prevValue === newValue ? '' : newValue)); 
    };

    const handleChange= () => {}

  return (
    <div className="overflow-x-scroll lg:overflow-visible">
      <table className="min-w-full table-auto lg:w-full">
        <thead>
          <tr className='border-b border-light300'>
            <th className="pl-2 py-4 text-start ">
            <label>
                <input
                    type="radio"
                    name="product"
                    value={"option"}
                    checked={selectedOption === 'option'}
                    onClick={handleRadioBtn}
                    onChange={handleChange}
                    className="w-4 h-4 border rounded-md border-zinc-400"
                />
                </label>
            </th>

           {
            tableHeader?.map((item, i )=>(
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
          {
            invoicess?.map((item, idx) => {
              console.log('==================item', item)
              
             return ( <tr key={item?.id} className='border-b   border-light300 bg-hover300  duration-300' 
            onClick={()=>router.push(`/vendorb2b/workspace/invoices/${item?.id}`)}            >
              <td className="pl-2 py-4 text-start w-10">
                <label>
                <input
                    type="radio"
                    name="product"
                    value={"option"+item?.id}
                    checked={selectedOption === 'option'+item?.id}
                    onClick={handleRadioBtn}
                    onChange={handleChange}
                    className="w-4 h-4 border rounded-md border-zinc-400"
                />
                </label>
              </td>

              <td className="px-2">
                <p className="text-blue">{item?.id}</p>
              </td>

              <td className="px-2">
                <p className="text-blue">INV-{item?.id}</p>
              </td>

              <td className="px-2">
                <p className="text-blue">{item?.id}</p>
              </td>

              <td className="px-2">
                <p className="text-">{item?.amount}</p>
              </td>

              <td className="px-2  ">
                <div className="flex gap-2 items-center">
                    <div className="overflow-hidden h-8 w-8 rounded-full flex-shrink-0 bg-blue-200">
                        <h4 className='flex items-center w-full h-full justify-center text-lg font-bold text-blue'>{item?.customer_name.slice(0,1)}</h4>
                    </div>
                    <p className="">{item?.customer_name}</p>
                </div>
              </td>

              <td className='px-2'>
                {item?.transaction_status}

              </td>

              <td className='px-2 uppercase'>
                {item?.payment_method}

              </td>
              <td className='px-2'>
                {item?.transaction_date}

              </td>
            </tr>
             )
           })
          }

          {/* {
            data?.map(({ id, transactionId,  date, amount, buyerImgUrl, buyerName, paymentStatus, paymentMethod, orderId, invoiceId }) => (
            <tr key={id} className='border-b   border-light300 bg-hover300  duration-300' 
            onClick={()=>router.push(`/vendorb2b/workspace/invoices/${id}`)}            >
              <td className="pl-2 py-4 text-start w-10">
                <label>
                <input
                    type="radio"
                    name="product"
                    value={"option"+id}
                    checked={selectedOption === 'option'+id}
                    onClick={handleRadioBtn}
                    onChange={handleChange}
                    className="w-4 h-4 border rounded-md border-zinc-400"
                />
                </label>
              </td>

              <td className="px-2">
                <p className="text-blue">{transactionId}</p>
              </td>

              <td className="px-2">
                <p className="text-blue">{invoiceId}</p>
              </td>

              <td className="px-2">
                <p className="text-blue">{orderId}</p>
              </td>

              <td className="px-2">
                <p className="text-">{amount}</p>
              </td>

              <td className="px-2  ">
                <div className="flex gap-2 items-center">
                    <div className="overflow-hidden h-8 w-8 rounded-full flex-shrink-0 bg-blue-200">

                        { buyerImgUrl ? 
                            <ImgCard src={buyerImgUrl} alt={buyerName}/>  :
                            
                            <h4 className='flex items-center w-full h-full justify-center text-lg font-bold text-blue'>{buyerName.slice(0,1)}</h4>}
                        
                    </div>
                    <p className="">{buyerName}</p>
                </div>
              </td>

              <td className='px-2'>
                {paymentStatus}

              </td>

              <td className='px-2 uppercase'>
                {paymentMethod}

              </td>
              <td className='px-2'>
                {date}

              </td>
            </tr>
          ))} */}
        </tbody>
      </table>

     
    </div>
  );
};

export default InvoiceTable;
