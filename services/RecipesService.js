import Httpcommon from "../components/shared/Httpcommon";
import AppConfig from "../configs/AppConfig";
import axios from "axios";
import authHeader from "../components/Api/auth-header";

let url = AppConfig.base_url;

// const getRecipesList = (data) => {
//   return Httpcommon.get(`recipesListingWithCategory?${data}`);
// };

// const getRecipesDetail = (data) => {
//   return Httpcommon.get(`recipes/${data}`);
// };

const addToWishList = (data) => {
  return Httpcommon.post("addToWishlist", data);
};
// const SeeAllRecipesListData = (data) => {
//   return Httpcommon.get(`showAllRecipeByCategory?${data}`);
// };

/* get api's */

const getRecipesList = (data) => {
  return axios({
    method: "get",
    headers: authHeader(),
    url: url + `recipesListingWithCategory?${data}`,
  });
};

const getRecipesDetail = (data) => {
  return axios({
    method: "get",
    headers: authHeader(),
    url: url + `recipes/${data}`,
  });
};

const SeeAllRecipesListData = (data) => {
  return axios({
    method: "get",
    headers: authHeader(),
    url: url + `showAllRecipeByCategory?${data}`,
  });
};

const RecipesService = {
  getRecipesList,
  getRecipesDetail,
  addToWishList,
  SeeAllRecipesListData,
};

export default RecipesService;
