import Httpcommon from "../components/shared/Httpcommon";
import AppConfig from "../configs/AppConfig";
import axios from "axios";
import authHeader from "../components/Api/auth-header";

let url = AppConfig.base_url;

// const get = () => {
//   return Httpcommon.get("me");
// };
const getAddressDetail = (id) => {
  return Httpcommon.get(`address/${id}`);
};
const updateAddressDetail = (id, data) => {
  return Httpcommon.put(`storeaddress/${id}`, data);
};

const get = () => {
  return axios({
    method: "get",
    headers: authHeader(),
    url: url + "me",
  });
};

const UserService = {
  get,
  getAddressDetail,
  updateAddressDetail,
};

export default UserService;
