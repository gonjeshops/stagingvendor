import {PRODUCT_RETRIEVE} from "./type";
  import productService from "../services/productService";
  export const retrieveProduct = (slug) => async (dispatch) => {
    try {
      const res = await retrieveProduct.get(slug);
  
      dispatch({
        type: PRODUCT_RETRIEVE,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
  