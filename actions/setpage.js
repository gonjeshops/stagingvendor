import { SET_PAGENAME } from "./type";

export const storePageName = (data) => (dispatch) => {
  dispatch({
    type: SET_PAGENAME,
    payload: data,
  });
};
