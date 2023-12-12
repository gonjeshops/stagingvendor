import { useState } from 'react';
import { EditB2cQuotes } from './EditB2cQuotes';
import { BtnSpinner } from '@/componentsB2b/Loader/Spinner/BtnSpinner';
import { updateB2cQuoteRequest } from '@/componentsB2b/Api2';
import { Button } from '@/components/ui/button';
import { toast } from 'react-toastify';
import ReceivedQuotesAction from './ReceivedQuotesAction';

const renderImageCell = (item) => {
  const product = JSON.parse(item.cart_items)[0].product;
  return (
    <td className="px-2 cursor-pointer">
      <div className="flex gap-2 text-[10px] items-center">
        <div className="h-10 w-10 shrink-0 overflow-hidden border rounded">
          <img src={product.image.thumbnail} alt={item.id} className="object-cover w-full h-full" />
        </div>
        <p className="text-sm">{product.name}</p>
      </div>
    </td>
  );
};

const renderTextCell = (text) => (
  <td className="px-2 cursor-pointer">
    <p className="text-">{text}</p>
  </td>
);

const QuotesTableRow = ({ data, type, setRefresh }) => {

  const [quotes, setQuotes] = useState(data);
  const [loading, setIsLoading] = useState(false);

  const handleSend= async (item) => {
    setIsLoading(item.id);
    try {
      const newFormData = {
        ...item,
        status: 'SENT',
        reason: 'Updating status',
        cart_items: JSON.parse(item?.cart_items)
      }
      const response = await updateB2cQuoteRequest(newFormData, item?.id);
      if (response?.status === 200) {
        console.log("updateB2cQuoteRequest API  response:", response);
        toast.success('Quote resquest update was successfull.')
        setRefresh(prev=>!prev)
      } else {
        console.log("Quote resquest API response error:", response);
        toast.error(response?.error  || response?.message || 'Error submitting the form. Please try again.');
      }
    } catch (error) {
      console.error("Catching Quote resquest Catch error:", error);
      toast.error('An error occurred. Please try again later.')
    } finally{
      setIsLoading(false)
    } 
  };

  return (
    <>
      {data?.map((item, i) => ( 
        <tr key={item?.id} className="relative border-b border-light300 bg-hover300 duration-300 px-4 text-sm">
          {renderTextCell(item?.quote_number)}
          {renderTextCell(item?.quote_name)}
          {renderImageCell(item)}
          {renderTextCell(`AUD ${item?.subtotal}`)}
          {renderTextCell(item?.quantity)}
          {renderTextCell(new Date(item?.created_at).toDateString())}
          {renderTextCell(item?.due_date)}
          {renderTextCell(item?.status)}
          <td className="px-2 cursor-pointer pt-3">
            {type === 'received' ? (
              <ReceivedQuotesAction item={item} setRefresh={setRefresh}/>
            ) : (
              <div className="flex gap-2 pb-3 text-sm text-center">
                <button 
                onClick={()=>handleSend(item)}
                disabled={item?.status==='ACCEPTED'}  
                className={ `${item?.status==='ACCEPTED' ? 'disable ' : 'bg-gonje-green text-white'} px-2 w-16 text-center py-2    rounded` }>
                  {loading===item?.id ? <BtnSpinner/> : 'Send'}
                </button>
                <EditB2cQuotes quotes={item} setRefresh={setRefresh} setQuotes={setQuotes}/>
              </div>
            )}
          </td>
        </tr>
      ))}
    </>
  );
};

export default QuotesTableRow;
