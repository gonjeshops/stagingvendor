import {useState, useEffect } from "react";
import {
    PayPalScriptProvider,
    PayPalButtons,
    usePayPalScriptReducer,
    BraintreePayPalButtons
} from "@paypal/react-paypal-js";


// Custom component to wrap the PayPalButtons and handle currency changes

// const ButtonWrapper = ({  }) => {
//     // let amount = 45, deliveryFee = 3
//     //     console.log('=====c', amount, deliveryFee)
//     // // const amount = amount
//     // // const currency = currency;
//     // const style = {"layout":"horizontal"};


//     // // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
//     // // This is the main reason to wrap the PayPalButtons in a new component
//     // const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

//     // useEffect(() => {
//     //     dispatch({
//     //         type: "resetOptions",
//     //         value: {
//     //             ...options,
//     //             currency: 'aud',
//     //         },
//     //     });
//     // }, []);


//     return (<>
            
//             <PayPalButtons
//                 style={style}
//                 // disabled={false}
//                 // forceReRender={[amount, style]}
//                 // fundingSource={undefined}
//                 // createOrder={(data, actions) => {
//                 //     return actions.order
//                 //         .create({
//                 //             purchase_units: [
//                 //                 {
//                 //                     amount: {
//                 //                         currency_code: currency,
//                 //                         value: amount,
//                 //                     },
//                 //                 },
//                 //             ],
//                 //         })
//                 //         .then((orderId) => {
//                 //             // Your code here after create the order
//                 //             return orderId;
//                 //         });
//                 // }}
//                 // onApprove={function (data, actions) {
//                 //     return actions.order.capture().then(function () {
//                 //         // Your code here after capture the order
//                 //     });
//                 // }}
//             />
//         </>
//     );
// }

export default function PayPal({}) {
    
	return (
		<div style={{ maxWidth: "750px", minHeight: "200px" }}>

            <PayPalButtons
                style={{
                    layout: 'horizontal',
                    tagline: false,
                   
                }}
            />

            {/* <PayPalScriptProvider
                options={{
                    "client-id": process.env.NEXT_PUBLIC_PAYPAL_ID,
                    components: "buttons",
                    currency: "USD"
                }}
            >
				<ButtonWrapper
                    currency='USD'
                    showSpinner={false}
                    deliveryFee={deliveryFee}
                    amount={amount}
                    callOrderApi={callOrderApi}
                    walletBalance={walletBalance}
                />
			</PayPalScriptProvider> */}
		</div>
	);
}