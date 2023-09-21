import Httpcommon from "../components/shared/Httpcommon";
import AppConfig from "../configs/AppConfig";
import axios from "axios";
import authHeader from "../components/Api/auth-header";

let url = AppConfig.base_url;

// const get = data => {
//   return Httpcommon.get(`showTypeWithAllProducts?${data}`);
// };

// const getRecipe = data => {
//   return Httpcommon.get(`recipes?shop_id=${data}`);
// };

const get = (data) => {
  return axios({
    method: "get",
    headers: authHeader(),
    url: url + `showTypeWithAllProducts?${data}`,
  });
};

const getRecipe = (data) => {
  return axios({
    method: "get",
    headers: authHeader(),
    url: url + `recipes?shop_id=${data}`,
  });
};

const CategoryService = {
  get,
  getRecipe,
};

export default CategoryService;
