import React from 'react'
import DashboardHeading from '../Workspace/DashboardHeading'
import {  FaPrint,FaAngleDown,FaRedo, FaEllipsisV } from 'react-icons/fa'
import Link from 'next/link'
import { useGlobalState } from '@/context/GlobalStateContext'


const OrderDetails = ({order, fakeData}) => {

  return (
    <>

        <DashboardHeading>
            Orders <span>#{order}</span>
        </DashboardHeading>

        <div className=' pb-20 space-y-8'>
            <div className="grid gap-3 md:flex justify-between items-center ">
        
            <p className='text-lg'>Customer ID: <span className='text-blue-600 font-medium'>{fakeData.customerId}</span></p>
            
            <p className='text-lg'>Status: <span className='text-blue-600 font-medium'>Pending</span></p>

            <Link href={`/vendorb2b/workspace/orders/${order}/${fakeData.customerId}`}
            className='px-4 py-2 rounded hover-blue'>View Order status </Link>


            
            <div className="flex gap-6 items-center">
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
        <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 ">
                <div className="py-3 text-[10px] border-light300 sm:text-sm md:text-md border-y font-medium capitalize grid grid-cols-6 gap- items-center ">
                    <div className="flex col-span-4 items-center justify-start gap-2">
                        <p className="space-x-2 ">PRODUCTS </p><FaAngleDown/>
                    </div>
                    <div className="flex items-center justify-end gap-2">
                    <p className="space-x-1 col-span-1 text-end">PRICE</p> <FaAngleDown/>
                    </div>
                    <div className="flex items-center justify-end gap-2">
                    <p className="space-x-1 col-span-1 text-end">QUANTITY</p> <FaAngleDown/>
                    </div>
                </div>

                {
                    fakeData.product.map(({details, imageUrl, price, quantity}, i)=>(
                        <div key={i} className="py-6  border-b border-light300 grid grid-cols-6 gap-3 items-center text-[10px] sm:text-sm md:text-md ">
                        <div className="flex flex-col col-span-4 gap-3 sm:flex-row items- ">
                            <div className="bg-light200 flex-shrink-0 w-12 h-12 flex justify-center items-center">
                                {/* <img src="" alt="" /> */}
                                4
                        </div>
                        <p  className='text-[12px] text-blue-600'>{details}</p>
                    </div>
                    <p className="col-span-1 text-end">{price}</p>
                    <p className="col-span-1 text-end">{quantity}</p>

                </div>

                    ))
                }
                

                <div className="py-6 border-b flex justify-between items-center">
                    <p className="">Items Subtotal:</p>
                    <p className="">11.19</p>

                </div>


            </div>

            <div className="lg:col-span-1 bg-light200 px-6 py-8 rounded-lg shadow">
                <h4 className="font-medium text-lg pb-6">Summary</h4>
                <div className="grid gap-4 py-4 border-y">
                    {
                        fakeData.summary.map(({title, value}, i)=>(
                            <div key={i} className="flex justify-between gap-6 items-center g">
                                <p>{title}</p>
                                <p>{value}</p>
                            
                        </div>
                        ))
                    }
                </div>
                <div className="pt-4 text-lg font-medium flex justify-between">
                    <p>Total:</p>
                    <p>$695</p>
                </div>

            </div>
        </div>

        <div className="flex flex-col-reverse md:grid grid-cols-2 lg:grid-cols-3 gap-8">

            <div className="lg:col-span-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 grid ">
               
                <div className="sm:grid-cols-2 md:grid-cols-1 lg:col-span-2 grid gap-6 lg:grid-cols-2  ">
                    <div className=" grid gap-4">
                    <h4 className="text-lg font-medium">Billing Details</h4>
                    {
                        fakeData.billingDetails.map(({title, value, icon}, i) => (
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
                        fakeData.shippingDetails.map(({title, value, icon}, i) => (
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
                        fakeData.otherDetails.map(({title, value, icon}, i) => (
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
                <div className="p-4 border rounded-md flex justify-between">
                    <p>Draft</p>
                    <FaAngleDown/>
                </div>
                <button className="mt-6 bg-blue-600 rounded-md hover:bg-blue-700 duration-300 text-white py-4 px-8">Update Status</button>
            </div>
            </div>
        </div>
    </div>
        
    </>
  )
}

export default OrderDetails