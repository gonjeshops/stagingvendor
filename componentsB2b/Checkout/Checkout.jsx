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


const Checkout = ({content}) => {

    const {cardtypes, billingDetails, shippingDetails, summary, summary2} = content

    const [selectedOption, setSelectedOption] = useState('');

    const { query } = useRouter();

    if (query === 'success') {
      toast.success('Stripe payment was successful');
    } else if (query === 'cancelled') {
      toast.success('Stripe payment was cancelled');
    }
    

      
  return (
    <div className='w-full'>
       <DashboardHeading>Checkout</DashboardHeading>

        <div className="flex flex-col-reverse sm:flex-row gap-8 justify-between pb-6">
            <div className="grid gap-6">
                <div className="shipp pb-6 border-b border-light300">
                    <h5 className='font-medium text-2xl pb-3'>Shipping Details</h5>

                    <div className="space-y-4">
                        <div className="flex gap-3 items-center">
                            <FaUser />
                            <p className='font-medium flex-shrink-0'>{'Name :'} </p>
                            <p className='font-'>{shippingDetails.name} </p>
                        </div>
                        <div className="flex gap-3 items-center">
                            <FaMapMarkerAlt />
                            <p className='font-medium flex-shrink-0'>{'Address :'} </p>
                            <p className='font-'>{shippingDetails.address} </p>
                        </div>
                        <div className="flex gap-3 items-center">
                            <FaPhone />
                            <p className='font-medium flex-shrink-0'>{'Phone :'} </p>
                            <p className='font-'>{shippingDetails.phone} </p>
                        </div>
                    </div>

                </div>
                <div className="bill">
                <h5 className='font-medium text-2xl pb-3'>Billing Details</h5>

                    <div className="space-y-4">
                        <div className="flex gap-3 items-center">
                            <FaUser />
                            <p className='font-medium flex-shrink-0'>{'Name :'} </p>
                            <p className='font-'>{billingDetails.name} </p>
                        </div>
                        <div className="flex gap-3 items-center">
                            <FaMapMarkerAlt />
                            <p className='font-medium flex-shrink-0'>{'Address :'} </p>
                            <p className='font-'>{billingDetails.address} </p>
                        </div>
                        <div className="flex gap-3 items-center">
                            <FaPhone />
                            <p className='font-medium flex-shrink-0'>{'Phone :'} </p>
                            <p className='font-'>{billingDetails.phone} </p>
                        </div>
                    </div>

                </div>
            </div>

            <div className="">
                <div className="bg-light200  rounded-lg py-10 px-4 sm:px-10 md:max-w-[420px] min-w-[330px] flex-shrink-0 ">
                    <div className="flex justify-between items-center pb-6">
                        <h5 className='font-medium text-2xl'>Summary</h5>
                        <button className="text-blue-600">
                            Edit cart
                        </button>
                    </div>

                    <div className="space-y-4 pb-6 border-zinc">
                        {
                            summary.map((item, index)=>(
                                <div key={index} className="flex justify-between items-center gap-2 sm:gap-4">
                            <div className="img h-8 w-8 rounded-full bg-light300 flex-shrink-0">
                                <img src="" alt="a" />
                            </div>
                            <p>{item} Lorem ipsum dolor sit amet {index}</p>
                            <p>{'x1'}</p>
                            <p className="text-lg">${item}</p>
                        </div>
                            ))
                        }
                    </div>

                    <div className="space-y-3 py-6 ">
                        <div className="flex items-center justify-between">
                            <p className="">Items subtotal:</p>
                            <p className='text-lg'> ${summary2.subtotal}</p>
                        </div><div className="flex items-center justify-between">
                            <p className="">Discount:</p>
                            <p className='text-lg'> ${summary2.subtotal}</p>
                        </div><div className="flex items-center justify-between">
                            <p className="">Tax:</p>
                            <p className='text-lg'> ${summary2.subtotal}</p>
                        </div><div className="flex items-center justify-between">
                            <p className="">Shipping cost:</p>
                            <p className='text-lg'> ${summary2.subtotal}</p>
                        </div>
                    </div>

                    <div className="font-medium text-xl flex justify-between">
                        <p>Total</p>
                        <p>${summary2.total}</p>
                    </div>
                </div>
            </div>
        </div>


        <div className="space-y-6 font-medium w-full lg:max-w-3xl">
            <h3 className='text-2xl text-semibold'>Payment Method</h3>
            <StripeCheckout/>
            <PayPal/>

            <CheckoutForm cardData={cardtypes}/>
        </div>
        
    </div>
  )
}

export default Checkout

