import { useEffect, React, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckoutService from "../../services/CheckoutService";
import toasts from "../shared/toast.js";
import Loader from "../Loader";

export default function Checkout() {
  const [loading, setLoading] = useState(false);

  const users = useSelector((state) => state.users);
  const [checkedInput, setCheckedInput] = useState();

  useEffect(() => {
    if (users.auto_checkout == 1) {
      setCheckedInput(true);
    } else {
      setCheckedInput(false);
    }
  }, [users]);

  const setCheckedFun = (checked) => {
    CheckoutService.autoCheckout(checked == true ? 1 : 0); //getting address detail here
    toasts.notifySucces("Auto checkout status update successfully.");
  };

  return (
    <>
      <div className="col-xl-6 col-lg-12">
        <div className="checkout my-schedule">
          <div className="top-heading">
            <h3>Checkout</h3>
          </div>
          <div className="checkout-options mt-3 d-flex justify-content-between align-items-center">
            <p className="mb-0">Automatic checkout</p>
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                id="flexSwitchCheckDefault"
                checkedInput={checkedInput}
                checked={checkedInput}
                onChange={(e) => {
                  setCheckedFun(e.target.checked);
                  setCheckedInput(e.target.checked);
                }}
              />
            </div>
          </div>
          <hr />
          {/* <div className="checkout-options mt-3 d-flex justify-content-between align-items-center">
            <p className="mb-0">Manual checkout</p>
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                id="flexSwitchCheckDefault"
              />
            </div>
          </div>
          <hr /> */}
        </div>
      </div>
    </>
  );
}
