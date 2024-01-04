import { useEffect, React, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toasts from "../shared/toast.js";
import CardService from "../../services/CardService.js";
import { walletValidation } from "../shared/Validation.js";
import Loader from "../Loader.js";

const Wallet = () => {
  const [loading, setLoading] = useState(false);

  const users = useSelector((state) => state.users);
  const [balance, setBalance] = useState();
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({});
  const getWalletInfo = (wallet_id) => {
    const data = {
      wallet_id: wallet_id,
    };
    CardService.walletDetails(data) //getting address detail here

      .then((response) => {
        setBalance(response.data.data[0].current_balance);
        // setWalletTrans(response.data.data[0].wallet_transactions)
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (users && typeof users.wallet !== "undefined") {
      getWalletInfo(users?.wallet?.id);
    }
  }, [users, !users.wallet]);

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // const codeValue = {
    //   coupon_code:event.target.elements.coupon_code.value
    // }
    const returnValidations = walletValidation(values);

    setErrors(returnValidations);
    if (Object.keys(returnValidations).length === 0) {
      let Collected_data = {
        coupon_code: values.coupon_code,
      };
      redeemCoupon(Collected_data);
      setLoading(true);
    }
  };

  const redeemCoupon = async (Collected_data) => {
    const data = {
      coupon_code: Collected_data.coupon_code,
      wallet_id: users.wallet.id,
    };

    CardService.RedeemGiftCard(data)
      .then((response) => {
        if (response.data.status == 1) {
          setLoading(false);
          getWalletInfo(response.data.wallet_id);
          toasts.notifySucces(response.data.message);
        } else {
          // closeModal()
          setLoading(false);
          toasts.notifyError(response.data.message);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <>
      {loading && <Loader />}
      <div className="col-xl-6 col-lg-12 redeem_card">
        <div className="my-schedule shipping-address">
          <div className="top-heading">
            <h3>Redeem Gift Card</h3>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <p className="wallett-points">Wallet amount: ${balance || 0}</p>
            </div>
            <div className="form">
              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label"
                >
                  Redeem
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="coupon_code"
                  placeholder="coupon_code"
                  onChange={handleChange}
                  value={values.coupon_code}
                />
                {errors.coupon_code ? (
                  <div className="shipping_error">{errors.coupon_code}</div>
                ) : null}
              </div>
              <button type="submit" className="btn btn-light">
                SUBMIT
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Wallet;
