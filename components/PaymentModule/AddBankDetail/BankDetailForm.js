import React, { useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import {
  useStripe,
  useElements,
  IbanElement,
  AuBankAccountElement,
  AuBECSDebitForm,
} from "@stripe/react-stripe-js";

const CARD_ELEMENT_OPTIONS = {
  // supportedCountries: ["SEPA"],
  style: {
    base: {
      color: "green",
      fontSize: "16px",
      fontSmoothing: "antialiased",
    },
    invalid: {
      color: "#red",
    },
  },
};

const InitialValues = {
  account_type: "",
  account_number: "",
};

const BankDetailForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [bankdetails, setBankDetails] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }
    const auBankAccount = elements.getElement(AuBankAccountElement);
    const result = await stripe.confirmAuBecsDebitSetup(
      "seti_1KdZYpCQ7rc17WeiL2vo7KWZ_secret_LKE05CsAbmEwP921RWNxUMbsmQ7Phzt",
      {
        payment_method: {
          au_becs_debit: auBankAccount,
          billing_details: {
            name: "sdfdg",
            email: "safds@dfd.com",
          },
        },
      }
    );
    console.log("resultresult=", result);
    // const bankData = elements.getElement(AuBankAccountElement);
    // const payload = await stripe.createToken("bank_account", {
    //   country: "US",
    //   currency: "usd",
    //   account_holder_name: "Jenny Rosen",
    //   account_holder_type: "individual",
    //   routing_number: "110000000",
    //   account_number: "000123456789",
    // });
    // console.log("payloadpayloadpayload=", payload);
    // const payload = await stripe.confirmAuBecsDebitSetup(
    //   "sk_test_51JUqxaCQ7rc17WeikU9yVbIfWkOe2aHmRiF5AE5zx6yGAyMbmK0EPoQZAPBJf1fpAFJNqE4yJCOTSg5Mp5rYyWfu00tkVGbN5M",
    //   {
    //     payment_method: {
    //       au_becs_debit: bankData,
    //       billing_details: {
    //         name: "test person",
    //         email: "test123@gmail.com",
    //       },
    //     },
    //   }
    // );
  };

  return (
    <div>
      <p className="text-center">Fill Your Bank Details</p>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Account Name"
          />
        </div>

        <div className="mb-3">
          <AuBankAccountElement
            className="form-control"
            options={CARD_ELEMENT_OPTIONS}
            onChange={(data) => {}}
          />
          {/* <AuBECSDebitForm /> */}
          {/* <input
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Account Number"
          /> */}
        </div>
        {/* <div className="mb-3">
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="BSB Code"
          />
        </div> */}
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Name of Bank"
          />
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
  );
};

export default BankDetailForm;
