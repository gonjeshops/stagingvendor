import { useEffect, React, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardService from "../../services/CardService.js";
import { useRouter } from "next/router";
import { addMoneyToWal } from "../../components/Api/Api.js";
import { retrieveUser } from "../../actions/users";
import toasts from "../shared/toast.js";
import Loader from "../Loader.js";

const AddMoneyToWallet = ({
  onCloseAddmoneyModal,
  isUpdate,
  getWalletInfo,
  stripeAmount,
}) => {
  const { pathname } = useRouter();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({});

  const users = useSelector((state) => state.users);
  console.log("usersusers-", users);
  const getCardInfo = (card) => {
    CardService.getCardDetail(card) //getting address detail here
      .then((response) => {
        setLoading(false);
        setValues({
          last4: response.data.data.last4,
          exp: response.data.data.exp_month + "/" + response.data.data.exp_year,
        });
      })
      .catch((e) => {
        setLoading(false);
        console.log(e);
      });
  };

  const addMoney = async (event) => {
    event.preventDefault();
    setLoading(true);
    let valuess = {
      wallet_id: users?.wallet?.id,
      source: users?.card[0]?.stripe_card_id,
      amount: stripeAmount,
      currency: "usd",
      customerStripeId: users?.stripe_cus_id,
      payment_gateway: "stripe",
    };

    const json = await addMoneyToWal(valuess);
    if (json?.status == 1) {
      setLoading(false);
      toasts.notifySucces(json.message);
      getWalletInfo(users.wallet.id);
      onCloseAddmoneyModal();
    } else {
      setLoading(false);
      toasts.notifyError(json.message);
    }
  };

  useEffect(() => {
    if (users && typeof users.card !== "undefined" && users.card.length > 0) {
      getCardInfo(users.card[0].stripe_card_id);
      setLoading(true);
    }
  }, [!users.card, isUpdate]);

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <>
      {loading && <Loader />}
      <div className="form">
        <form onSubmit={addMoney}>
          <div>
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Credit/Debit Card
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="enter credit/debit card number"
              value={values.last4}
              readOnly
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
                readOnly
              />
            </div>

            <div className="col-md-4">
              <label htmlFor="inputEmail4" className="form-label">
                Enter amount
              </label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter amount"
                name="amount"
                value={stripeAmount}
                disabled={true}
                // onChange={handleChange}
                required
              />
            </div>

            {/* <a
              className="btn btn-light"
              type="button"
              onClick={addSubscribe}
            >
                Add Money
            </a> */}
            <button type="submit" className="add-money-btn btn btn-light">
              Add Money
            </button>

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
        </form>
        {/* <button type="button" className="btn btn-light">
            UPDATE
          </button> */}
      </div>
    </>
  );
};
export default AddMoneyToWallet;
