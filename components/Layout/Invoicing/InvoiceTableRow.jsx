import { useState } from 'react';
import { BtnSpinner } from '@/componentsB2b/Loader/Spinner/BtnSpinner';
import { updateB2cQuoteRequest } from '@/componentsB2b/Api2';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { useGlobalState } from '@/context/GlobalStateContext';



const InvoiceTableRow = ({ data, type, setRefresh }) => {
  const router = useRouter()
  const {setCheckoutData} = useGlobalState()

  const renderImageCell = (item) => {
    const products = JSON.parse(item.cart_items);
    return (
      <td className="px-2 space-y-2 h-full">
        {products.map((product, i)=><div key={i} className="flex gap-2 text-[10px] items-center">
          <div className="h-10 w-10 shrink-0 overflow-hidden border rounded">
            <img src={product.product.image.thumbnail} alt={item.id} className="object-cover w-full h-full" />
          </div>
          <p className="text-sm">{product.product.name}</p>
        </div>)}
      </td>
    );
  };
  
  const renderTextCell = (text) => (
    <td className="px-3 py-3">
      <p className="text-">{text}</p>
    </td>
  );

  const [loading, setIsLoading] = useState(false);

  
  return (
    <tbody className='text-sm'>
      {data?.map((item, i) => (
        <tr key={item?.id} className="px-6 relative border-b border-light300 bg-hover300 duration-300">
          {renderTextCell(item?.id)}
          {renderTextCell('INV'+item?.id)}
          {renderTextCell(`${item?.quote_name}`)}
          {renderTextCell(item?.shop_name)}
          {renderTextCell(item?.user_name)}
          {renderImageCell(item)}
          {renderTextCell('AUD'+item?.subtotal)}
          {renderTextCell(item?.status)}
          {renderTextCell(new Date(item?.created_at).toDateString())}
          <td className="px-2 pt- text-sm">
            {type === 'sent' ? (
               <div className=" px-2 text-sm text-center">
                  <button 
                  onClick={()=>router.push(`/invoicing/${item.id}?t=pay`)}
                  disabled={item?.status==='PAID'}  
                  className={ `${item?.status==='PAID' ? 'disable ' : 'hover-blue text-white'} px-2  text-center py-2    rounded` }>
                    {loading===item?.id ? <BtnSpinner/> : 'Checkout'}
                  </button>
                </div>
            ) : (
              <button 
              onClick={()=>router.push(`/invoicing/${item.id}?t=view`)}
              className={ `${item?.status==='PAID' ? 'disable ' : 'bg-gonje-green text-white'} px-3  text-center py-2    rounded` }>
                {loading===item?.id ? <BtnSpinner/> : 'Veiw'}
              </button>
            )}
          </td>
        </tr>
      ))}
   </tbody>
  );
};

export default InvoiceTableRow;
