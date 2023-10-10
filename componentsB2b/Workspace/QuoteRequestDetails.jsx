import {useState, useEffect } from 'react'
import { FaPrint,FaAngleDown,FaRedo, FaEllipsisV } from 'react-icons/fa'
import Select  from 'react-select';
import DashboardHeading from './DashboardHeading'
import { updateQuoteRequest } from '../Api2';


export const DisabledBtn = ({control}) => {
    console.log('===========', control)
    return (
        <button
            className={` rounded text-white py-2 px-8 ${
                control ? 'bg-blue-300 cursor-not-allowed'
                : 'hover-blue '
            }`}
            disabled={control}
            >
            Checkout
        </button>
    )
}
        

const QuoteRequestDetails = ({content, data}) => {
    console.log('FETCHED QUOTE DATA=', data)

    const [quoteData, setQuoteData] = useState(data)
    const [selected, setSelected] = useState(quoteData?.quote?.status)


    const [statusOptions, setStatusOptions] = useState([
        { value: 'PENDING', label: 'PENDING' },
        { value: 'SENT', label: 'SENT' },
      ]);

      
      useEffect(() => {
        // Update status options based on quoteData
        if (data) {
          setQuoteData(data);
      
          // Check if 'FINALIZE' is not in statusOptions and quoteData.status is 'SENT'
          if (data.quote.status === 'SENT' && !statusOptions.some((option) => option.value === 'FINALIZE')) {
            setStatusOptions((prevStatusOptions) => [
              ...prevStatusOptions,
              { value: 'FINALIZE', label: 'FINALIZE' },
            ]);
          } else if (data.quote.status !== 'SENT') {
            // Reset statusOptions if the status is not 'SENT'
            setStatusOptions([
              { value: 'PENDING', label: 'PENDING' },
              { value: 'SENT', label: 'SENT' },
            ]);
          }
      
          setSelected(data.quote.status);
        }
      }, [data,]);
      
    

    const [darkmode, setDarkmode] = useState('')

    const [summary, setSummary] = useState(
        [
            {
                title: `Items Subtotal:`,
                value: 0
            },
            {
                title: `Discount:`,
                value: 0
            },
            {
                title: `Tax:`,
                value: 0
            },
            {
                title: `Subtotal:`,
                value: 0
            },
            {
                title: `Shipping Cost:`,
                value: 0
            },
            {
                title: `Total:`,
                value: 0
            }
        ]
    )
    

    useEffect(() => {
        setDarkmode(parseInt(localStorage.getItem('bgLightness')));
      }, [])


    const handleSelect = async (slectedOption) => {
        setSelected(slectedOption)
       
        try {
            const response = await updateQuoteRequest( {status: slectedOption?.value, quantity: quoteData?.quote?.quantity, reason: 'Updating quote status.'}, quoteData?.quote?.id)
            if(response?.status===200) {
                console.log('Updated quote res===', response?.data)
                setQuoteData(response?.data)
                if (response?.data.quote.status === 'SENT' && !statusOptions.some((option) => option.value === 'FINALIZE')) {
                    setStatusOptions((prevStatusOptions) => [
                      ...prevStatusOptions,
                      { value: 'FINALIZE', label: 'FINALIZE' },
                    ]);
                  } else if (response?.data.quote.status !== 'SENT') {
                    // Reset statusOptions if the status is not 'SENT'
                    setStatusOptions([
                      { value: 'PENDING', label: 'PENDING' },
                      { value: 'SENT', label: 'SENT' },
                    ]);
                  }
            } else {
                console.log('Api Error res===', response)
            }
        } catch (error) {
            console.log('CATCH ERROR', error)
        }

      }


    const customStyles = {
        control: (provided, state) => ({
          ...provided,
          backgroundColor: 'inherit',
          color: `${darkmode===25 ? 'white': 'black'}`,
          padding: '0.25rem'
        }),
        menu: (provided) => ({
          ...provided,
          backgroundColor: 'inherit',
          color: `${darkmode===25 ? 'white': 'black'}`,
        }),
      };

  return (
    <div className=' pb-20 px-4 space-y-8'>

        <div className="">
           
            <DashboardHeading>Request details for {quoteData?.quote?.quote_number}</DashboardHeading>
           
            <div className="flex pb-2 gap-2 justify-between items-center flex-wrap">

                <p className='text-lg'>Quote Name: <span className='text-blue-600 font-medium'>{quoteData?.quote.quote_name}</span></p>

                <p className='text-lg'>Store Owner: <span className='text-blue-600 font-medium'>{'-------'}</span></p>
            
            </div>

            <div className="flex pb-3 gap-2 justify-between items-center flex-wrap">
                <p className='text-lg'>Status: <span className='text-blue-600 font-medium'>{quoteData?.quote.status}</span></p>

                <p className='text-lg'>Created at: <span className='text-blue-600 font-medium'>{ new Date(quoteData?.quote.updated_at).toLocaleString()}</span></p>

            </div>

            <div className="flex justify-between border-t pt-3  items-center gap-6 flex-wrap">
                <DisabledBtn control={quoteData?.quote?.status!=='FINALIZE'}/>

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
            <div className="lg:col-span-2 ">
                <div className="py-3 text-[10px] border-light300 sm:text-sm md:text-md border-y font-medium capitalize grid grid-cols-6 gap- items-center ">
                    <div className="flex col-span-4 items-center justify-start gap-2">
                        <p className="space-x-2 ">PRODUCTS </p>
                        {/* <FaAngleDown/> */}
                    </div>
                    <div className="flex items-center justify-end gap-2">
                    <p className="space-x-1 col-span-1 text-end">PRICE</p> 
                    {/* <FaAngleDown/> */}
                    </div>
                    <div className="flex items-center justify-end gap-2">
                    <p className="space-x-1 col-span-1 text-end">QUANTITY</p>
                     {/* <FaAngleDown/> */}
                    </div>
                </div>

                {
                    <div className="py-6  border-b border-light300 grid grid-cols-6 gap-3 items-center text-[10px] sm:text-sm md:text-md ">
                            <div className="flex flex-col col-span-4 gap-3 sm:flex-row items- ">
                                <div className="border-2 overflow-hidden bg-light200 flex-shrink-0 w-12 h-12 ">
                                    <img src={quoteData?.products?.image?.thumbnail} alt="product" 
                                    className='w-full h-full object-cover'/>
                                </div>
                                <p  className='text-[12px] text-blue-600'><span className='pr-2 font-semibold'>{quoteData?.products?.name}:</span>{quoteData?.products?.description}</p>
                            </div>
                            <p className="col-span-1 text-end">${quoteData?.products?.price}</p>
                            <p className="col-span-1 text-end">{quoteData?.products?.quantity}</p>
                        </div>                 
                }


                <div className="py-6 border-b flex justify-between items-center">
                    <p className="">Items Subtotal:</p>
                    <p className="">{summary[0]?.value}</p>

                </div>


            </div>

            <div className="lg:col-span-1 bg-light200 px-6 py-8 rounded-lg shadow">
                <h4 className="font-medium text-lg pb-6">Summary</h4>
                <div className="grid gap-4 py-4 border-y">
                    {
                        summary?.map(({title, value}, i)=>(
                            <div key={i} className="flex justify-between gap-6 items-center g">
                                <p>{title}</p>
                                <p>{value}</p>
                            
                        </div>
                        ))
                    }
                </div>
                <div className="pt-4 text-lg font-medium flex justify-between">
                    <p>Total:</p>
                    <p>${summary[5]?.value}</p>
                </div>

            </div>
        </div>

        <div className="flex flex-col-reverse md:grid grid-cols-2 lg:grid-cols-3 gap-8">

            <div className="lg:col-span-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 grid ">
               
                <div className="sm:grid-cols-2 md:grid-cols-1 lg:col-span-2 grid gap-6 lg:grid-cols-2  ">
                    <div className=" grid gap-4">
                    <h4 className="text-lg font-medium">Billing Details</h4>
                    {
                        content.billingDetails.map(({title, value, icon}, i) => (
                            <div key={i} className="flex gap-2 items-cente">
                                <div className="pt-1">{icon}</div>
                                <div className="">
                                    <h5 className='font-medium pb-2'>{title}</h5>
                                    <p className='text-blue-600 text-[11px]'>{value}</p>
                                </div>
                            </div>
                        ))
                    }


                    </div>

                    <div className=" grid gap-4">
                    <h4 className="text-lg font-medium">Shipping Details</h4>
                    {
                        content.shippingDetails.map(({title, value, icon}, i) => (
                            <div key={i} className="flex gap-2 items-cente">
                                <div className="pt-1">{icon}</div>
                                <div className="">
                                    <h5 className='font-medium pb-2'>{title}</h5>
                                    <p className='text-blue-600 text-[11px]'>{value}</p>
                                </div>
                            </div>
                        ))
                    }
                    </div>
                </div>
                
                <div className="col-span-1 w-full grid gap-4">
                    <h4 className="text-lg font-medium">Other Details</h4>
                    {
                        content.otherDetails.map(({title, value, icon}, i) => (
                            <div key={i} className="flex gap-2 items-cente">
                                <div className="pt-1">{icon}</div>
                                <div className="">
                                    <h5 className='font-medium pb-2'>{title}</h5>
                                    <p className='text-blue-600 text-[11px]'>{value}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>



            <div className="">
            <div className='bg-light200 rounded-lg col-span-1 px-6 py-8'>
                <h4 className='font-medium text-lg pb-6'>Request Status</h4>
                <p className="text-sm pb-2">Status</p>
                
                <Select 
                // isClearable
                // isSearchable={true}
                value={selected}
                onChange={handleSelect}
                options={statusOptions}
                className="bg-light100 w-full text-zinc-600 focus:outline-none focus:ring focus:border-blue-300 mb-3"
                // placeholder="Select a unit of measurement"
                styles={customStyles} 
                
              />

                <DisabledBtn control={quoteData?.quote?.status!=='FINALIZE'}/>

            </div>
            </div>
        </div>
    </div>
  )
}

export default QuoteRequestDetails



