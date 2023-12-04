import {useState} from 'react'
import RadioBtn from '../btn/RadioBtn';
import SelectInput from '../btn/SelectInput';
import CheckoutForm from './CheckoutForm';
import { FaUser, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';
import DashboardHeading from '../Workspace/DashboardHeading';
import StripeCheckout from './StripeCheckout';
import PayPal from './PayPalButton';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { useGlobalState } from '@/context/GlobalStateContext';
import { AddressDetails } from '../Order/OrderDetails';
import { truncateText } from '@/lib/truncateText';


const Checkout = ({ checkoutData}) => {

    const { query } = useRouter();

    const address = checkoutData?.shipping_details;
    const billing = checkoutData?.billing_details;

  return (
    <div className='w-full'>
       <DashboardHeading>Checkout</DashboardHeading>

        <div className="flex sm:flex-row gap-8  pb-6">
            
            <div className="md:w-3/5">
                <div className="bg-light200  rounded-lg py-10 px-4 sm:px-10   ">
                 
                        <h5 className='font-medium text-2xl'>Summary</h5>
                        
                        <div className=" w-full">
                <div className="border-b h-16 w-full rounded px-4 py-3 text-[10px] border-light300 sm:text-sm md:text-md font-medium capitalize grid grid-cols-7 gap- items-center">
                    <div className="flex col-span-4 items-center gap-2">
                        <p className="space-x-1 shrink-0 ">S/No.</p>
                        <p className="space-x-2 ">Products </p>
                    </div>
                    <p className="space-x-1 col-span-1 text-end">Quantity</p>
                    <p className="space-x-1 col-span-1 text-end">Price</p>
                    <p className="space-x-1 col-span-1 text-end">Subtotal</p>
                </div>

                {checkoutData?.cart_items?.map((item, i) => (
                    <div key={item?.id} 

                    className="py-6 px-4 border-b border-light300 grid grid-cols-7 gap-3 items-center text-[10px] sm:text-sm md:text-md md:overflow-hidden">
                    <div className="flex flex-col col-span-4 gap-3 sm:flex-row items-">
                        <p className='shrink-0 w-6'>{i+1}</p>
                        <div className="border-2 overflow-hidden bg-light200 flex-shrink-0 w-12 h-12 ">
                            <img src={item?.product?.image?.thumbnail} alt="product" className='w-full h-full object-cover'/>
                        </div>
                        <p 
                        className='text-[12px] text-blue-600'><span className='pr-2 font-semibold'>{item?.product?.name}:</span>{truncateText(item?.product?.description,  100)}</p>
                    </div>
                        <p className="col-span-1 text-end">{item?.quantity}{item?.unit}
                        </p>
                        <p className="col-span-1 text-end">${item?.price}
                        </p>
                        <p className="col-span-1 text-end">${item?.subtotal}
                        </p>
                    </div>
                ))}

            </div> 

                    <div className="space-y-3 py-6 ">
                        <div className="flex items-center justify-between">
                            <p className="">Items subtotal:</p>
                            <p className='text-lg'> ${checkoutData?.subtotal || 0}</p>
                        </div><div className="flex items-center justify-between">
                            <p className="">Discount:</p>
                            <p className='text-lg'> ${checkoutData?.discount    || 0}</p>
                        </div><div className="flex items-center justify-between">
                            <p className="">Tax:</p>
                            <p className='text-lg'> ${checkoutData?.tax || 0}</p>
                        </div><div className="flex items-center justify-between">
                            <p className="">Shipping cost:</p>
                            <p className='text-lg'> ${checkoutData?.shipping_cost   || 0}</p>
                        </div>
                    </div>

                    <div className="font-medium text-xl flex justify-between">
                        <p>Total</p>
                        <p>${checkoutData?.subtotal}</p>
                    </div>
                </div>


                <div className="pt-6 md:flex gap-6 justify-between">
                    <div className="shipp pb-6 border-light300">
                        <h4 className="text-lg font-medium">Shipping Details</h4>
                        <AddressDetails address={address}/>
                    </div>
                    <div className="bill">
                        <h4 className="text-lg font-medium">Billing Details</h4>
                        <AddressDetails address={billing}/>
                    </div>
                </div>
            
            
            
            </div>


            <div className="space-y-6 font-medium md:w-2/5 ">
                <h3 className='text-2xl text-semibold'>Payment Method</h3>
                <StripeCheckout checkoutData={checkoutData}/>
                <PayPal checkoutData={checkoutData}/>

                {/* <CheckoutForm cardData={cardtypes}/> */}
            </div>

            


        </div>


       
        
    </div>
  )
}

export default Checkout

