import Image from 'next/image'
import ChangeQuoteStatusForm from '../Quotes/ChangeQuoteStatusForm'
import { useState } from 'react'
import { RequestModal } from './ExpensesModals'
import { createB2cQuoteRequest } from '@/componentsB2b/Api2'

const QuotesTableRow = ({data, type}) => {
    console.log('QuotesTableRow=====', data)
    const [show, setShow] = useState(false)
    const [quotes, setQuotes] = useState(data)
    

    const sendQuotes = async () => {
           try {
              const newFormData = {
                status: "SENT",
                user_name: `${user?.user_name} ${user?.user_lastname}`,
              }
      
              const response = await createB2cQuoteRequest(newFormData);
              if (response?.status === 200) {
                console.log("createQuoteRequest API  response:", response);
                setQuotes(response?.data?.data?.quote)
                // setSuccess('Quote resquest was successfull.')
                toast.success('Quote resquest was successfull.')
              } else {
                console.log("Quote resquest API response error:", response);
                toast.error(response?.error  || response?.message || 'Error submitting the form. Please try again.');
              }
            } catch (error) {
              console.error("Catching Quote resquest Catch error:", error);
              toast.error('An error occurred. Please try again later.')
            } finally{
            }    
        
      
    }
  
    const editQuotes = () => {
        // setShow(true)
    }

  return (
    <>
    {show && <RequestModal/>}
    {data?.map((item,i ) => {
        return ( <tr key={item?.id} className='relative  border-b   border-light300 bg-hover300  duration-300' 
       // onClick={()=>router.push(`/vendorb2b/workspace/invoices/${item?.id}`)} 
       >

         <td className="px-2 cursor-pointer">
           <p className="text-">{item?.quote_number}</p>
         </td>

         <td className="px-2 cursor-pointer">
           <p className="text-">{item?.quote_name}</p>
         </td>

         <td className="px-2 cursor-pointer">
         <div className="flex gap-2 text-[10px] items-center">
           <div className="h-10 w-10 shrink-0  overflow-hidden border rounded">
            <img src={JSON.parse(item?.cart_items)[0].product?.image?.thumbnail} alt={item?.id} className="object-cover w-full h-full"/>
           </div>
           <p className="text-sm">{JSON.parse(item?.cart_items)[0].product?.name}</p>
        </div>
         </td>

         <td className="px-2 cursor-pointer">
           <p className="text-">AUD{item?.subtotal}</p>
         </td>

         <td className="px-2 cursor-pointer">
           <p className="text-">{item?.quantity}</p>
         </td>

         <td className="px-2  " >
           <p className="text-">{new Date(item?.created_at).toDateString()}</p>
         </td>

         <td className='px-2 cursor-pointer'>
           {item?.due_date}
         </td>

         <td className='px-2 cursor-pointer uppercase'>
           {item?.status}
         </td>
         <td className='px-2 cursor-pointer pt-3'>
            {type === 'received' ? 
                <ChangeQuoteStatusForm item={item}/> : 
                <div className='flex gap-2 pb-3 text-sm text-center  '>
                    <button onClick={sendQuotes} className='bg-gonje-green py-1 px-2 text-white rounded'>Send</button>
                    <button onClick={editQuotes} className='bg-yellow-600 px-2 py-1 rounded ' >Edit</button>
                </div>
            
            }
         </td>
       </tr>
        )
      })}
</>
  )
}

export default QuotesTableRow