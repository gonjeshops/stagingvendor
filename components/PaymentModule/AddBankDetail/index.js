import React from 'react';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import BankDetailForm from './BankDetailForm';

const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  );
const AddBankDetails = () => {
    return (
        <Elements stripe={stripePromise}>
            <BankDetailForm/>
        </Elements>
    );
};

export default AddBankDetails;