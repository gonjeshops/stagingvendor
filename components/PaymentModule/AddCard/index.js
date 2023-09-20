import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements} from "@stripe/react-stripe-js";
import CardDetailForm from "./CardDetailForm";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);
const AddCard = () => {
  return (
    <Elements stripe={stripePromise}>
      <CardDetailForm />
    </Elements>
  );
};

export default AddCard;
