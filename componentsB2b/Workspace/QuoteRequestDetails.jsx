import React, { useState, useEffect } from 'react';
import { FaPrint, FaRedo, FaEllipsisV } from 'react-icons/fa';
import Select from 'react-select';
import DashboardHeading from './DashboardHeading';
import { updateQuoteRequest } from '../Api2';
import { useRouter } from 'next/router';
import { useGlobalState } from '@/context/GlobalStateContext';
import { truncateText } from '@/lib/truncateText';
import { formatDate } from '@/lib/formatDate';
import ChangeQuoteStatusForm from '../forms/ChangeQuoteStatusForm';


export const DisabledBtn = ({ control, route, quoteData }) => {
  const router = useRouter();
  const { setCheckoutData } = useGlobalState();

  const buttonClass = control
    ? 'bg-blue-300 cursor-not-allowed'
    : 'hover-blue';
console.log('control==', control)
  return (
    <button 
      className={`rounded text-white py-2 px-8 ${buttonClass}`}
      disabled={control}
      onClick={()=>{
        setCheckoutData(quoteData)
        router.push(route)
    }}
    >
      Checkout
    </button >
  );
};

const QuoteRequestDetails = ({ content, data }) => {
  console.log('FETCHED QUOTE DATA=', data);

  const [quoteData, setQuoteData] = useState(data);
  const [subtotal, setSubtotal] = useState(0);
  const [itemSubtotal, setItemSubtotal] = useState(0);
  const [summarySubtotal, setSummarySubtotal] = useState(0);
  const [Total, setTotal] = useState(0);

  const [statusOptions, setStatusOptions] = useState([
    { value: 'PENDING', label: 'PENDING' },
    { value: 'SENT', label: 'SENT' },
  ]);

  useEffect(() => {
    if (data) {
      setQuoteData(data);
      let calculatedSubtotal = 0;
      for (const product of data?.products) {
        if (product.product && product.product.price) {
          calculatedSubtotal += product.product.price;
        }
      }
      setSubtotal(calculatedSubtotal);
      setItemSubtotal(calculatedSubtotal)
      setSummarySubtotal(calculatedSubtotal + data?.products?.is_taxable || 0  - data?.products?.discount  || 0)
      setTotal(calculatedSubtotal + data?.products?.is_taxable || 0  - data?.products?.discount || 0 + data?.products?.shipping_class_id || 0)

      // if (data.quote.status === 'SENT') {
      //   if (!statusOptions.some((option) => option.value === 'FINALIZED')) {
      //     setStatusOptions((prevStatusOptions) => [
      //       ...prevStatusOptions,
      //       { value: 'FINALIZED', label: 'FINALIZED' },
      //     ]);
      //   }
      // } else {
      //   setStatusOptions([
      //     { value: 'PENDING', label: 'PENDING' },
      //     { value: 'SENT', label: 'SENT' },
      //   ]);
      // }
    }
  }, [data]);

  const [darkmode, setDarkmode] = useState('');
  const [summary, setSummary] = useState([
    { title: 'Items Subtotal:', value: itemSubtotal },
    { title: 'Discount:', value: data?.products?.discount || 0},
    { title: 'Tax:', value: data?.products?.is_taxable || 0},
    { title: 'Subtotal:', value: summarySubtotal},
    { title: 'Shipping Cost:', value: data?.products?.shipping_class_id },
    // { title: 'Total:', value: Total },
  ]);

  useEffect(() => {
    setDarkmode(parseInt(localStorage.getItem('bgLightness')));
    setSummary([
        { title: 'Items Subtotal:', value: itemSubtotal },
        { title: 'Discount:', value: data?.products?.discount || 0},
        { title: 'Tax:', value: data?.products?.is_taxable || 0},
        { title: 'Subtotal:', value: summarySubtotal},
        { title: 'Shipping Cost:', value: data?.products?.shipping_class_id || 0},
        // { title: 'Total:', value: Total },
    ]);
  }, [data]);

  const [selected, setSelected] = useState(data?.quote?.status)

  const handleSelect = async (selectedOption) => {
    setSelected(selectedOption);
    try {
      const response = await updateQuoteRequest({
        status: selectedOption?.value,
        quantity: quoteData?.quote?.quantity,
        reason: 'Updating quote status.',
      }, quoteData?.quote?.id);

      if (response?.status === 200) {
        console.log('Updated quote res===', response?.data);
        setQuoteData(response?.data);

        // if (response?.data.quote.status === 'SENT') {
        //   if (!statusOptions.some((option) => option.value === 'FINALIZED')) {
        //     setStatusOptions((prevStatusOptions) => [
        //       ...prevStatusOptions,
        //       { value: 'FINALIZED', label: 'FINALIZED' },
        //     ]);
        //   }
        // } else {
        //   setStatusOptions([
        //     { value: 'PENDING', label: 'PENDING' },
        //     { value: 'SENT', label: 'SENT' },
        //   ]);
        // }
      } else {
        console.log('Api Error res===', response);
      }
    } catch (error) {
      console.log('CATCH ERROR', error);
    }
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: 'inherit',
      color: `${darkmode === 25 ? 'white' : 'black'}`,
      padding: '0.25rem',
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: 'inherit',
      color: `${darkmode === 25 ? 'white' : 'black'}`,
    }),
  };

// modal control
  const [isOpen, setIsOpen] = useState(false)
  const [eachProduct, setEachProduct] = useState('')


  return (
    <div className='pb-20 px-4 space-y-8'>
        {/* <ProductDetailsModal isOpen={isOpen} closeModal={()=>setIsOpen(false)}  product={eachProduct}/> */}
      <div>
        <DashboardHeading>Request details for {quoteData?.quote?.quote_number}</DashboardHeading>
        <div className="flex pb-2 gap-2 justify-between items-center flex-wrap">
          <p className='text-lg'>Quote Name: <span className='text-blue-600 font-medium'>{quoteData?.quote.quote_name}</span></p>
          <p className='text-lg'>Store Owner: <span className='text-blue-600 font-medium'>{'-------'}</span></p>
        </div>
        <div className="flex pb-3 gap-2 justify-between items-center flex-wrap">
          <p className='text-lg'>Status: <span className='text-blue font-'>{quoteData?.quote?.status}</span></p>
          {quoteData?.quote.updated_at && <p className='text-lg'>Updated at: <span className='text-blue-600 font-'>{formatDate(new Date(quoteData?.quote.updated_at))}</span></p>}
          <p className='text-lg'>Created at: <span className='text-blue-600 font-'>{  formatDate(new Date(quoteData?.quote.created_at))}</span></p>
        </div>
        <div className="flex justify-end border-t pt-3 items-center gap-6 flex-wrap">
          <div className="flex gap-6 items-center justify-end">
            <div className="flex gap-3 items-center">
              <FaPrint />
              <p>Print</p>
            </div>
            <div className="flex gap-3 items-center">
              <FaRedo />
              <p>Refund</p>
            </div>
            <div className="flex gap-3 items-center">
              <p>More action</p>
              <FaEllipsisV/>
            </div>
          </div>
        </div>
      </div>
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="py-3 text-[10px] border-light300 sm:text-sm md:text-md border-y font-medium capitalize grid grid-cols-6 gap- items-center">
            <div className="flex col-span-4 items-center justify-start gap-2">
              <p className="space-x-2 ">PRODUCTS </p>
            </div>
            <div className="flex items-center justify-end gap-2">
              <p className="space-x-1 col-span-1 text-end">PRICE</p>
            </div>
            <div className="flex items-center justify-end gap-2">
              <p className="space-x-1 col-span-1 text-end">QUANTITY</p>
            </div>
          </div>
          {data?.products?.map((item) => (
            <div key={item?.id} 
            // onClick={()=> {
            //     setEachProduct(item)
            //     setIsOpen(true)
            // }}
            className="py-6 border-b border-light300 grid grid-cols-6 gap-3 items-center text-[10px] sm:text-sm md:text-md">
              <div className="flex flex-col col-span-4 gap-3 sm:flex-row items-">
                <div className="border-2 overflow-hidden bg-light200 flex-shrink-0 w-12 h-12 ">
                  <img src={item?.product?.image?.thumbnail} alt="product" className='w-full h-full object-cover'/>
                </div>
                <p 
                className='text-[12px] text-blue-600'><span className='pr-2 font-semibold'>{item?.product?.name}:</span>{truncateText(item?.product?.description,  200)}</p>
              </div>
              <p className="col-span-1 text-end">${item?.product?.price}</p>
              <p className="col-span-1 text-end">{data?.quote?.quantity}{data?.quote?.unit}</p>
            </div>
          ))}
          <div className="py-6 border-b flex justify-between items-center">
            <p className="">Items Subtotal:</p>
            <p className="">${subtotal}</p>
          </div>
        </div>
        <div className="lg:col-span-1">
          <div className="w-full bg-light200 px-6 py-8 rounded-lg ">
            <h4 className="font-medium text-lg pb-6">Summary</h4>
            <div className="grid gap-3 py-4 border-y">
              {summary.map((item, index) => (
                <div key={index} className="flex justify-between gap-6 items-center">
                  <p>{item.title}:</p>
                  <p>{item.value}</p>
                </div>
              ))}
            </div>
            <div className="pt-4 text-lg font-medium flex justify-between">
              <p>Total:</p>
              <p>${subtotal}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col-reverse md:grid grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 grid">
          <div className="sm:grid-cols-2 md:grid-cols-1 lg:col-span-2 grid gap-6 lg:grid-cols-2">
            <div className="grid gap-4">
              <h4 className="text-lg font-medium">Billing Details</h4>
              {content.billingDetails.map(({ title, value, icon }, i) => (
                <div key={i} className="flex gap-2 items-center">
                  <div className="pt-1">{icon}</div>
                  <div>
                    <h5 className='font-medium pb-2'>{title}</h5>
                    <p className='text-blue-600 text-[11px]'>{value}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="grid gap-4">
              <h4 className="text-lg font-medium">Shipping Details</h4>
              {content.shippingDetails.map(({ title, value, icon }, i) => (
                <div key={i} className="flex gap-2 items-center">
                  <div className="pt-1">{icon}</div>
                  <div>
                    <h5 className='font-medium pb-2'>{title}</h5>
                    <p className='text-blue-600 text-[11px]'>{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-span-1 w-full grid gap-4">
            <h4 className="text-lg font-medium">Other Details</h4>
            {content.otherDetails.map(({ title, value, icon }, i) => (
              <div key={i} className="flex gap-2 items-center">
                <div className="pt-1">{icon}</div>
                <div>
                  <h5 className='font-medium pb-2'>{title}</h5>
                  <p className='text-blue-600 text-[11px]'>{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="">
          <div className=' col-span-1 bg-light200 rounded-lg w-full px-6 py-8 space-y-3'>
            
          <ChangeQuoteStatusForm
              status={quoteData?.quote?.status} quoteData={quoteData} reason={quoteData?.quote?.reason}  setQuoteData={setQuoteData}
             />



            <DisabledBtn control={quoteData?.quote?.status !== 'ACCEPTED'} route={'/vendorb2b/checkout'} 
            quoteData={
              { 
                subtotal, 
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
  );
};

export default QuoteRequestDetails;
