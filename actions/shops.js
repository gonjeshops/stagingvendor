import { SET_SHOPID } from "./type";

export const storeShopId = (data) => (dispatch) => {
  dispatch({
    type: SET_SHOPID,
    payload: data,
  });
};
