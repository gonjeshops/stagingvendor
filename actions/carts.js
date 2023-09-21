
import { GETTING_CART_COUNT } from "./type";

export const retrieveCount = (data) => (dispatch) => {

  dispatch({
    type: GETTING_CART_COUNT,
    payload: data,
  });
};

