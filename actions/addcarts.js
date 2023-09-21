import { ADD_CART_PRODUCT, LISTING_CART_PRODUCT } from "./type";
import cartService from "../services/CartService.js";
export const addCartProduct =
  (user_id, product_id, shop_id, product_quantity) => async (dispatch) => {
    try {
      const res = await cartService.addCart(
        user_id,
        product_id,
        shop_id,
        product_quantity
      );
      dispatch({
        type: ADD_CART_PRODUCT,
        payload: res.data,
      });
      return Promise.resolve(res.data);
    } catch (err) {
      console.log(err);
      return Promise.reject(err);
    }
  };

export const listingCartProduct = (user_id) => async (dispatch) => {
  try {
    const res = await cartService.getAllCartItems(user_id);
    dispatch({
      type: LISTING_CART_PRODUCT,
      payload: res.data,
    });
    return Promise.resolve(res.data);
  } catch (err) {
    console.log(err);
  }
};
