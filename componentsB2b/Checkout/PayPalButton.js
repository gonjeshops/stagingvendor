import {useState, useEffect } from "react";
import {
    PayPalScriptProvider,
    PayPalButtons,
    usePayPalScriptReducer,
    BraintreePayPalButtons
} from "@paypal/react-paypal-js";
import { useGlobalState } from "@/context/GlobalStateContext";
import { toast } from "react-toastify";
import { useRouter } from "next/router";



export default function PayPal({checkoutData}) {
    const router = useRouter()
    const {user} = useGlobalState()
    const [paidFor, setPaidFor] = useState(false)
    const [error, setError] = useState(false)
    const [currency, setCurrency] = useState('AUD')
    

    console.log('PAYPAL=====', checkoutData)

    const [{ isPending }, { options }, dispatch] = usePayPalScriptReducer();

    // dispatch({
    //     type: "resetOptions",
    //     value: {
    //         ...options,
    //         currency: 'AUD',
    //     },
    // });

    const handleApprove = (orderId) => {
        // send request to api to handle the order

        // if response is success
        setPaidFor(true);
        router.push('/vendorb2b/workspace/invoices')
        toast.success('Thank you for your purchase!')

        // Refresh the user account or subscription status.

        // if response is error
        // alert the user of the eror message
        // toast.error('Your payment was processed successfully, however there are issues in completing your purchase. Please contact support team')
    }





	return (
		<div >
            {isPending ? <div className="spinner" /> : null}

            <PayPalScriptProvider options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_ID }}>
                <PayPalButtons
                    style={{
                        layout: 'horizontal',
                        tagline: false,
                    }}
                    onClick={(data,actions)=>{
                        // check if user has already purchased this product
                        const hasPurchasedProduct = false;
                        if (hasPurchasedProduct) { 
                            setError('You have purchased this product')
                            return actions.reject()
                        } else {
                            return actions.resolve()
                        }
                    }}
                    createOrder={(data, actions) => {
                        return actions.order.create({
                            purchase_units: [
                                {
                                    // description: 'rrrrrrrrrrrrrrrrrr',
                                    description: checkoutData?.quoteName,
                                    amount: {
                                        // value: 4,                
                                        value:  checkoutData?.subtotal || 0,
                                        // currency_code: currency             
                                    },
                                   
                                }
                            ]
                        })
                    }}
                    onApprove={async (data, actions) => {
                        const order = await actions.order.capture();
                        console.log('OREDER FDBK', order)
                        handleApprove(data?.orderID)
                    }}
                    onCancel={()=>{
                        // redirect user to checkout page
                        toast.warning('Purchase was canceled')
                        router.push('/vendorb2b/checkout')
                    }}
                    onError={err => {
                        setError(err)
                        toast.error('Error in response')
                        console.log('PAYPAL ERROR', err)
                    }}
                />
            </PayPalScriptProvider>

		</div>
	);
}