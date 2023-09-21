import Httpcommon from "../components/shared/Httpcommon";
import AppConfig from "../configs/AppConfig";
import axios from "axios";
import authHeader from "../components/Api/auth-header";

let url = AppConfig.base_url;

// const get  = data => {
//   return Httpcommon.get(`/products?${data}`);
// };

// const getproduct  = slug => {                 //work with slug
//   return Httpcommon.get(`/products/${slug}`);
// };

const get = (data) => {
  return axios({
    method: "get",
    headers: authHeader(),
    url: url + `products?${data}`,
  });
};

const getproduct = (slug) => {
  return axios({
    method: "get",
    headers: authHeader(),
    url: url + `products/${slug}`,
  });
};

const reorderproduct = (data) => {
  // console.log(data,'cart data')
  return Httpcommon.post(`/reorder/${data}`);
};

const getproductdata = (data, action) => {
  // console.log(data,'cart data')
  if (action == 1) {
    return Httpcommon.post("/whatsNew/", data);
  } else if (action == 2) {
    return Httpcommon.post("/todaySale/", data);
  } else if (action == 3) {
    return Httpcommon.post("/topDeals/", data);
  } else {
    return Httpcommon.post("/whatsNew/", data);
  }
};

const productService = {
  get,
  getproduct,
  reorderproduct,
  getproductdata,
};

export default productService;
