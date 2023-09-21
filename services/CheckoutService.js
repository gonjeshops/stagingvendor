import Httpcommon from "../components/shared/Httpcommon";
import AppConfig from "../configs/AppConfig";
import axios from "axios";
import authHeader from "../components/Api/auth-header";

let url = AppConfig.base_url;

const placeOrder = (data) => {
  // console.log(data,'cart data')
  return Httpcommon.post("orders", data);
};

const autoCheckout = (data) => {
  return axios({
    method: "get",
    headers: authHeader(),
    url: url + `auto-checkout-status/${data}`,
  });
};

const checkoutService = {
  placeOrder,
  autoCheckout,
};

export default checkoutService;
