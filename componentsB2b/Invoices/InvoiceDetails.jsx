import React, { useRef, useState } from 'react'
import DashboardHeading from '../Workspace/DashboardHeading'
import { FaPrint, FaSave } from 'react-icons/fa'
import Link from 'next/link'
import { truncateText } from '@/lib/truncateText'
import { useGlobalState } from '@/context/GlobalStateContext'
import { useRouter } from 'next/router'
import generatePDF from 'react-to-pdf';
import { InvoiceDownload } from '../DownloadPrint/InvoiceDownload'

const InvoiceDetails = ({invoiceId, data, }) => {
    const downloadInvoiceRef = useRef()
    const router = useRouter()
    const { setCheckoutData} = useGlobalState();
    console.log('INVOCIE DATA == ', data)
    const [invoice, setInvoice] = useState(data?.quote)

  return (
    <div className='pt-12 space-y-8 '>

        <div className="">
            <DashboardHeading>           
                Invocie <span>#{invoiceId}</span>
            </DashboardHeading>
            <div className="flex justify-between font-semibold gap-3">
                <div className="flex items-center gap-4">
                {data?.quote?.status === 'PAID' ? null : <button onClick={()=>{
                    setCheckoutData(data?.quote)
                    router.push('/vendorb2b/checkout')
                }}
                className='hover-blue rounded px-6 py-2'>Checkout
                </button >}

                <div className="flex items-center gap-2 uppercase">
                    <p>STATUS:</p>
                    <p>{data?.quote?.status}</p>
                </div>
                </div>

                <div className="flex gap-2">
                    <button className=" bg-light300 hover:bg-zinc-400 duration-500 border-zinc-400 border flex px-4 py-2 rounded-sm items-center gap-2">
                        <FaSave/>
                        <div onClick={() => generatePDF(downloadInvoiceRef, {filename: `${data?.quote?.quote_name}.pdf`})} className="">Download invoice</div>
                        
                    </button>
                    {/* <InvoiceDownload invoiceData={data?.quote}>Download Pdf</InvoiceDownload> */}
                    {/* <div className="bg-light300  hover:bg-zinc-400 duration-500 border-zinc-400 border flex px-4 py-2 rounded-sm items-center gap-2">
                        <FaPrint/>
                        <div className="">Print</div>
                    </div> */}
                </div>
            </div>
        </div> 

        <div ref={downloadInvoiceRef} className="max-w-4xl mx-auto">
            <div className="rounded-sm bg-light300 h-60 w-full px-4 flex items-center justify-between flex-wrap">

                <div className="space-y-12 shrink-0">
                    <div className="space-y-2">
                        <p className='font-medium'>Invoice No: <span>{invoice?.id}</span></p>
                        <p className='font-medium'>Invoice Date: <span>{new Date(data?.quote?.updated_at)?.toDateString()}</span></p>
                    </div>
                    <div className="space-y-2">
                        <p className='font-medium'>Sold By:</p>
                        <p className='font-'>{data?.quote?.shop_name}</p>
                        <p className='font-'>------- ----- -----:</p>
                        <p className='font-medium'>Sold Id: {data?.quote?.shop_id}</p>
                    </div>
                </div>



            </div> 

            <div className=" w-full">
                <div className="bg-light300 h-16 w-full rounded px-4 py-3 text-[10px] border-light300 sm:text-sm md:text-md border-y font-medium capitalize grid grid-cols-8 gap- items-center">
                    <div className="flex col-span-4 items-center gap-2">
                        <p className="space-x-1 shrink-0 ">S/No.</p>
                        <p className="space-x-2 ">Products </p>
                    </div>
                    <p className="space-x-1 col-span-1 text-end">Unit</p>
                    <p className="space-x-1 col-span-1 text-end">Quantity</p>
                    <p className="space-x-1 col-span-1 text-end">Price</p>
                    <p className="space-x-1 col-span-1 text-end">Subtotal</p>
                </div>

                {data?.quote?.cart_items?.map((item, i) => (
                <div key={item?.id} 
                // onClick={()=> {
                //     setEachProduct(item)
                //     setIsOpen(true)
                // }}
                className="py-6 px-4 border-b border-light300 grid grid-cols-8 gap-3 items-center text-[10px] sm:text-sm md:text-md md:overflow-hidden">
                <div className="flex flex-col col-span-4 gap-3 sm:flex-row items-">
                    <p className='shrink-0 w-6'>{i+1}</p>
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

            </div> 

            <div className="rounded-sm bg-light300 h-16 w-full  px-4 flex items-center justify-between">
                <p className="">Items Subtotal:</p>
                <p className="">${data?.quote?.subtotal}</p>
            </div> 

            <div className="rounded-sm  h-16 w-full border-b  border-light300 px-4 flex items-center gap-14 justify-end">
                <p>Shipping cost</p>
                <p>--</p>
            </div> 
            <div className="rounded-sm  h-16 w-full border-b  border-light300  px-4 flex items-center gap-14 justify-end">
                <p>Discount/Voucher</p>
                <p>--</p>
            </div> 

            <div className="rounded-sm bg-light300 h-16 w-full  px-4 flex items-center gap-14 justify-end">
                <p>Grand Total</p>
                <p>${data?.quote?.subtotal}</p>
            </div> 

            <div className="pt-28 pb-10 border-b border-light300 flex justify-end ">
                <div className="">
                <h4 className="text-xl font-semibold"> Authorized Signatory</h4>
                <h6 className="font-semibold">{data?.quote?.user_name} </h6>
                </div>
            </div>
        </div>

        <div className='py-16'>
        {data?.quote?.status === 'PAID' ? null : <button onClick={()=>{
                    setCheckoutData(data?.quote)
                    router.push('/vendorb2b/checkout')
                }}
                className='hover-blue rounded px-6 py-2'>Checkout
                </button >}
        </div>

        <div className=" bg-light300 h-40 w-full  px-4 flex items-center justify-between">
        </div> 

    </div>
  )
}

export default InvoiceDetails