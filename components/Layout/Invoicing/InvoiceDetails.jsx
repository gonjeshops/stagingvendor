import  { useRef, useState } from 'react'
import { FaPrint, FaSave } from 'react-icons/fa'
import { truncateText } from '@/lib/truncateText'
import { useGlobalState } from '@/context/GlobalStateContext'
import { useRouter } from 'next/router'
import generatePDF from 'react-to-pdf';
import Image from 'next/image'
import DashboardHeading from '@/componentsB2b/Workspace/DashboardHeading'
import { AddressDetails } from '@/componentsB2b/Order/OrderDetails'
import { Button } from '@/components/ui/button'

const InvoiceDetails = ({ data, path}) => {
    const downloadInvoiceRef = useRef()
    const router = useRouter()
    const { setCheckoutData} = useGlobalState();

  const address = data?.shipping_details
  const billing = data?.billing_details;

  return (
    <div className='pt-12 space-y-8 '>

        <div className="">
            <DashboardHeading>           
                Invocie <span>INV-{data.id}</span>
            </DashboardHeading>
            <div className="flex justify-between font-semibold gap-3">
                <div className="flex items-center gap-4">
                {data?.status === 'PAID' || path==='received' ? null : <Button onClick={()=>{
                    router.push(`/checkout?invoiceId=${data?.id}`)
                }}
                className='hover-blue rounded px-6 py-2'>Checkout
                </Button >}

                <div className="flex items-center gap-2 uppercase">
                    <p>STATUS:</p>
                    <p>{data?.status}</p>
                </div>
                </div>

                <div className="flex gap-2">
                    <Button onClick={() => generatePDF(downloadInvoiceRef, {filename: `${data?.quote_name}.pdf`})} className=" text-black bg-light100 hover:shadow-md duration-500  flex px-4 py-3 border items-center gap-2">
                        <FaSave/>
                       Download invoice
                    </Button>
              
                </div>
            </div>
        </div> 

        <div ref={downloadInvoiceRef} className="max-w-4xl p-4 mx-auto">
            <div className="flex justify-center pb-6">
                <Image src={'/logo.png'} alt='logo' width={100} height={60} />
            </div>
            <div className="w-full pb-4 h-20 flex justify-between gap-6 items-center">
                <h3 className='text-2xl font-semibold '>INVOICE</h3>
                <div className="space-y-2">
                    <p className='font-medium'>Invoice No: <span>{data?.id}</span></p>
                    <p className='font-medium'>Invoice Date: <span>{new Date(data?.updated_at)?.toDateString()}</span></p>
                </div>
            </div>
            <div className="rounded-sm bg-bg-light100 w-full p-4 flex items- justify-between flex-wrap">

                <div className="gap-12 flex flex-col justify-between shrink-0">
                    <div className="space-y-2">
                        <p className='font-medium'>Sold By: {data?.shop_name}</p>
                        <p className='font-medium'>Shop Id: {data?.shop_id}</p>
                    </div>

                    <div className="space-y-2">
                        <p className='font-medium'>Buyer: {data?.user_name}</p>
                        {/* <p className='font-medium'>Buyer shop: </p> */}
                        <p className='font-medium'>Quote Name: {data?.quote_name}</p>
                    </div>
                </div>

                <div className="space-y-2 shrink-0">
                    <h4 className="text-lg font-medium">Billing Details</h4>
                    <AddressDetails address={billing}/>
                </div>
                <div className="space-y-2 shrink-0">
                    <h4 className="text-lg font-medium">Shipping Details</h4>
                    <AddressDetails address={address}/>
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

                {JSON.parse(data?.cart_items)?.map((item, i) => (
                <div key={item?.id} 

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
                <p className="">${data?.subtotal}</p>
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
                <p>${data?.subtotal}</p>
            </div> 

            <div className="pt-28 pb-10 border-b border-light300 flex justify-end ">
                <div className="">
                <h4 className="text-xl font-semibold"> Authorized Signatory</h4>
                <h6 className="font-semibold">{data?.user_name} </h6>
                </div>
            </div>
        </div>

        <div className='py-16'>
        {data?.status === 'PAID' || path==='received' ? null : <Button onClick={()=>{
                    router.push(`/checkout?invoiceId=${data?.id}`)
                }}
                className='hover-blue rounded px-6 py-2'>Checkout
                </Button >}
        </div>

        <div className=" bg-light300 h-40 w-full  px-4 flex items-center justify-between">
        </div> 

    </div>
  )
}

export default InvoiceDetails