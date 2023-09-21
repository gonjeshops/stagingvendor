import { SET_USER_DETAIL } from "./type";

export const storeUserDetail = (data) => (dispatch) => {
  dispatch({
    type: SET_USER_DETAIL,
    payload: data,
  });
};
