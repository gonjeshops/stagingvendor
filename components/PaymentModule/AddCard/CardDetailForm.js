import React, { useState } from "react";
import { connect } from "react-redux";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
} from "@stripe/react-stripe-js";
import { addCard } from "../../../redux/actions/addCard";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Loader from "../../common/Loader";

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "green",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      // "::placeholder": {
      //   color: "#CFD7DF",
      // },
    },
    invalid: {
      color: "#red",
    },
  },
};

const CardDetailForm = (props) => {
  const [cardHolderName, setCardHolderName] = useState("");
  const stripe = useStripe();
  const [isLoading, setLoading] = useState(false);

  const elements = useElements();
  const route = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }
    const cardElement = elements.getElement(CardNumberElement);
    const payload = await stripe.createToken(cardElement, {
      name: cardHolderName,
    });

    if (cardHolderName == "") {
      toast.error("enter card holder name");
    } else if (payload.error) {
      toast.error(payload.error.message);
    }
    if (payload.token) {
      setLoading(true);
      props.addCard({ source_id: payload.token.id }).then((action) => {
        setLoading(false);
        toast.success(
          action?.payload?.data?.data?.message +
            "Please check your email and contact the admin@gonje.com.au or helpcenter@gonje.com.au for further enquiries and issues."
        );

        route.push("/login");
      });
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <div>
        <p className="text-center">Fill Your Card Details</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <CardNumberElement
              className="form-control"
              options={{ ...CARD_ELEMENT_OPTIONS, placeholder: "Card Number" }}
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="Name on Card"
              value={cardHolderName}
              onChange={(e) => {
                setCardHolderName(e.target.value);
              }}
            />
          </div>
          <div className="row">
            <div className="col-md-6">
              <CardExpiryElement
                options={{ ...CARD_ELEMENT_OPTIONS, placeholder: "Expiration" }}
                className="form-control"
              />
            </div>
            <div className="col-md-6">
              <CardCvcElement
                options={CARD_ELEMENT_OPTIONS}
                className="form-control"
              />
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-light w-100"
            disabled={!stripe}
          >
            submit
          </button>
        </form>
      </div>
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addCard: (data) => {
      return dispatch(addCard(data));
    },
  };
};

export default connect(null, mapDispatchToProps)(CardDetailForm);
