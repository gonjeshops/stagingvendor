import React, { useState, useEffect, useRef } from 'react';
import { FaPrint, FaRedo, FaFile, FaTrashAlt } from 'react-icons/fa';
import DashboardHeading from './DashboardHeading';
import { useRouter } from 'next/router';
import { useGlobalState } from '@/context/GlobalStateContext';
import { truncateText } from '@/lib/truncateText';
import { formatDate } from '@/lib/formatDate';
import ChangeQuoteStatusForm from '../forms/ChangeQuoteStatusForm';
import { AddressDetails } from '../Order/OrderDetails';
import EditQuoteForm from '../forms/EditQuoteForm';
import generatePDF from 'react-to-pdf';


export const DisabledBtn = ({ control, route, quoteData }) => {
  const router = useRouter();
  const { setCheckoutData, useB2Bcart:{} } = useGlobalState();
  const buttonClass = control
    ? 'disable'
    : 'hover-blue'; 

  return (
    <button 
      className={`rounded py-3 px-8 ${buttonClass}`}
      disabled={control}
      onClick={()=>{
        setCheckoutData(quoteData)
        router.push(route)
    }}
    >
      Go to invoice
    </button >
  );
};

const QuoteRequestDetails = ({ setRefresh, data }) => {
  const downloadQuoteRef = useRef()

  const {openModal, editQuote, setEditQuote, useB2Bcart:{quoteCartcalculator}} = useGlobalState()
 

  const [quoteData, setQuoteData] = useState(data);
  const [summarySubtotal, setSummarySubtotal] = useState(0);
  const [total, setTotal] = useState(0);

  const [quoteProducts, setQuoteProducts] = useState([])
  const [calculatedSubtotal, setSubtotal] = useState(0)
  const [quoteQuantity, setQty] = useState(0)
  

  useEffect(() => {
    if (data) {
      setQuoteData(data)
      const {quoteProducts, calculatedSubtotal, quoteQuantity} = quoteCartcalculator(data?.quote)
      setQuoteProducts(quoteProducts)
      setSubtotal(calculatedSubtotal)
      setQty(quoteQuantity)

      setSummarySubtotal(calculatedSubtotal - (quoteProducts[0]?.product?.is_taxable || 0) - (data?.products?.discount || 0));
      setTotal(calculatedSubtotal + (data?.products?.shipping_class_id || 0) - (data?.products?.is_taxable || 0) - (data?.products?.discount || 0) );
    }
  }, [data,]);

  const summaryItems = [
    { title: 'Items Subtotal:', value: calculatedSubtotal },
    { title: 'Discount:', value: data?.products?.discount || 0 },
    { title: 'Tax:', value: data?.products?.is_taxable || 0 },
    { title: 'Subtotal:', value: summarySubtotal },
    { title: 'Shipping Cost:', value: data?.products?.shipping_class_id || 0 },
  ];


  const address = data?.quote?.shipping_details;
  const billing = data?.quote?.billing_details;


  return (
    <div className='pb-20 px-4 space-y-8'>
      <EditQuoteForm setRefresh={setRefresh}/>
      
      <DashboardHeading>Quote Request Details</DashboardHeading>

      <div ref={downloadQuoteRef}>
        <p className='text- pb-2'>Quote Number: <span className='text-dark100 font-medium capitalize'> {quoteData?.quote?.quote_number}</span></p>
        <div className="flex pb-2 gap-2 justify-between items-center flex-wrap">
          <p className='text- '>Quote Name: <span className='text-dark100 font-medium capitalize'>{quoteData?.quote?.quote_name}</span></p>
          <p className='text-  capitalize'>Shop: <span className='text-dark100 font-medium'>{quoteData?.quote?.shop_name}</span></p>
        </div>

        <div className="flex pb-3 gap-2 justify-between items-center flex-wrap">
          <p className='text-'>Status: <span className='text-dark100 font-'>{quoteData?.quote?.status}</span></p>
          {quoteData?.quote?.updated_at && <p className='text-'>Updated at: <span className='text-dark100 font-'>{formatDate(new Date(quoteData?.quote.updated_at))}</span></p>}
          <p className='text-'>Created at: <span className='text-dark100 font-'>{  formatDate(new Date(quoteData?.quote?.created_at))}</span></p>
        </div>

        <div className="flex justify-end border-t pt-3 items-center gap-6 flex-wrap">
          <div className="flex gap-6 items-center justify-end">

          {quoteData?.quote.status !=='SENT' && <button onClick={()=>{
                openModal('editquote')
                setEditQuote(data?.quote)
                }}
                className=" text-hover-blue flex gap-1 items-center"
                >
              <FaFile />
              <p className='' > Edit Quote </p >
            </button>}

 

            <button onClick={() => generatePDF(downloadQuoteRef, {filename: `${data?.quote?.quote_name}.pdf`})}  className="flex gap-1 items-center">
              <FaPrint />
              <p>Print Quote</p>
            </button>

            <button onClick={()=>setRefresh(new Date().toISOString())} className="flex gap-1 items-center">
              <FaRedo />
              <p>Refresh Quote</p>
            </button>

      
          </div>
        </div>
      </div>

      {/* product listing */}
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">

          <div className="py-3 text-[10px] border-light300 sm:text-sm md:text-md border-y font-medium capitalize grid grid-cols-8 gap- items-center">
            <div className="flex col-span-4 items-center justify-start gap-2">
              <p className="space-x-2 ">Products </p>
            </div>
            <div className="flex items-center justify-end gap-2">
              <p className="space-x-1 col-span-1 text-end">InStock</p>
            </div>
            <div className="flex items-center justify-end gap-2">
              <p className="space-x-1 col-span-1 text-end">Quantity</p>
            </div>
            <div className="flex items-center justify-end gap-2">
              <p className="space-x-1 col-span-1 text-end">Price</p>
            </div>
            <div className="flex items-center justify-end gap-2">
              <p className="space-x-1 col-span-1 text-end">Subtotal</p>
            </div>
          </div>

          {quoteProducts?.map((item) => (
            <div key={item?.id} 
            // onClick={()=> {
            //     setEachProduct(item)
            //     setIsOpen(true)
            // }}
            className="py-6 border-b border-light300 grid grid-cols-8 gap-3 items-center text-[10px] sm:text-sm md:text-md">
              <div className="flex flex-col col-span-4 gap-3 sm:flex-row items-">
                <div className="border-2 overflow-hidden bg-light200 flex-shrink-0 w-12 h-12 ">
                  <img src={item?.product?.image?.thumbnail} alt="product" className='w-full h-full object-cover'/>
                </div>
                <p 
                className='text-[12px] text-blue-600'><span className='pr-2 font-semibold'>{item?.product?.name}:</span>{truncateText(item?.product?.description,  200)}</p>
              </div>
                  <p className="col-span-1 text-end">{item?.product?.in_stock}{item?.unit}
                  </p>
                  <p className="col-span-1 text-end">{item?.quantity}{item?.unit}
                  </p>
                  <p className="col-span-1 text-end">${item?.price}
                  </p>
                  <p className="col-span-1 text-end">${item?.subtotal}
                  </p>
            </div>
          ))}

          <div className="py-6 border-b flex justify-between items-center">
            <p className="">Items Subtotal:</p>
            <p className="">${calculatedSubtotal}</p>
          </div>
        </div>

        <div className="lg:col-span-1 mb-4">

          <div className="w-full shadow-sm bg-light200 px-6 py-8 rounded-lg ">
            <h4 className="font-medium text-lg pb-6">Summary</h4>
            <div className="grid gap-3 py-4 border-y">
              {  summaryItems.map((item, index) => (
                <div key={index} className="flex justify-between gap-6 items-center">
                  <p>{item.title}:</p>
                  <p>{item.value}</p>
                </div>
              ))}
            </div>
            <div className="pt-4 text-lg font-medium flex justify-between">
              <p>Total:</p>
              <p>${total}</p>
            </div>
          </div>

          <div className="mt-8 shadow-sm">
            <div className=' col-span-1 bg-light200 rounded-lg w-full px-6 py-8 space-y-3'>
              <ChangeQuoteStatusForm
                status={quoteData?.quote?.status} quoteData={quoteData} quoteQuantity={quoteQuantity} reason={quoteData?.quote?.reason}  setQuoteData={setQuoteData}
              />
              <DisabledBtn control={quoteData?.quote?.status !== 'ACCEPTED'} route={'/vendorb2b/workspace/invoices'} 
              quoteData={
                { 
                  calculatedSubtotal, 
                  quoteName: quoteData?.quote?.quote_name, 
                  quoteId: quoteData?.quote?.id, 
                  quoteNumber: quoteData?.quote?.quote_number, 
                  quantity: quoteData?.quote?.quantity,  
                }
                } />
            </div>
        </div>

        </div>

      </div>

      <div className="flex flex-col-reverse md:grid grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 grid">
          <div className="sm:grid-cols-2 md:grid-cols-1 lg:col-span-2 grid gap-6 lg:grid-cols-2">
            
          <div className="">
              <h4 className="text-lg font-medium">Billing Details</h4>
              <AddressDetails address={billing}/>
            </div>
            <div className="">
              <h4 className="text-lg font-medium">Shipping Details</h4>
              <AddressDetails address={address}/>
            </div>
            

          </div>
          
        </div>

       
      </div>
    </div>
  );
};

export default QuoteRequestDetails;
