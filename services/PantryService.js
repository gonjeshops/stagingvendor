import Httpcommon from "../components/shared/Httpcommon";
import AppConfig from "../configs/AppConfig";
import axios from "axios";
import authHeader from "../components/Api/auth-header";

let url = AppConfig.base_url;

// const getAll  = () => {
//   console.log("orders========")
//   return Httpcommon.get("orders");
// };

const getAll = (page) => {
  // console.log("orders api====",authHeader())
  return axios({
    method: "get",
    headers: authHeader(),
    url: url + "orders?page=" + page + "&limit=12",
  });
};

const PantryService = {
  getAll,
};

export default PantryService;
