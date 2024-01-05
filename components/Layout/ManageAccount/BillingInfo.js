import { useEffect, React, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import CardService from "../../services/CardService.js";
import { useRouter } from "next/router";
// import { addSubscription } from "../../components/Api/Api.js";
// import { retrieveUser } from "../../actions/users";
// import toasts from "../shared/toast.js";
// import Loader from "../Loader.js";

export default function BillingInfo({ isUpdate }) {
  const [loading, setLoading] = useState(false);
  const { pathname } = useRouter();
  const dispatch = useDispatch();

  const [values, setValues] = useState({});

  const users = useSelector((state) => state.users);
  // const getCardInfo = (card) => {
  //   CardService.getCardDetail(card) //getting address detail here

  //     .then((response) => {
  //       setLoading(false);
  //       setValues({
  //         last4: response.data.data.last4,
  //         exp: response.data.data.exp_month + "/" + response.data.data.exp_year,
  //       });
  //     })
  //     .catch((e) => {
  //       setLoading(false);
  //       console.log(e);
  //     });
  // };

  const addSubscribe = async () => {
    setLoading(true);

    let values = {
      source: users.card[0].stripe_card_id,
      amount: 0.5,
      currency: "usd",
      customerStripeId: users.stripe_cus_id,
      paymentGateway: "Stripe",
    };

    const json = await addSubscription(values);
    if (json.status == 1) {
      setLoading(false);
      await dispatch(retrieveUser());
      toasts.notifySucces(json.message);
    } else {
      setLoading(false);
      toasts.notifyError(json.message);
    }
  };

  useEffect(() => {
    if (users && typeof users.card !== "undefined" && users.card.length > 0) {
      setLoading(true);
      getCardInfo(users.card[0].stripe_card_id);
    }
  }, [!users.card, isUpdate]);

  return (
    <>
      {loading && <Loader />}
      <div className="form">
        <div
          className={
            pathname && pathname === "/goclub" ? "" : "mb-3 goclubInfo"
          }
        >
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Credit/Debit Card
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="enter credit/debit card number"
            value={values.last4}
          />
        </div>
        <div className="row g-3">
          <div className="col-md-4">
            <label htmlFor="inputEmail4" className="form-label">
              Expiration
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="enter Expiration date"
              value={values.exp}
            />
          </div>
          {pathname && pathname === "/goclub" && (
            <a className="btn btn-light" type="button" onClick={addSubscribe}>
              Subscribe
            </a>
          )}
          {/* <div className="col-md-4">
                <label for="inputPassword4" className="form-label">
                  CVV
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="enter CVV"
                />
              </div> */}
          {/* <div className="col-md-4">
                <label for="inputPassword4" className="form-label">
                  ZIP CODE
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="enter ZIP code"
                />
              </div> */}
        </div>
        {/* <button type="button" className="btn btn-light">
          UPDATE
        </button> */}
      </div>
    </>
  );
}
