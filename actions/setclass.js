import { SET_CLASSNAME } from "./type";

export const storeClassName = (data) => (dispatch) => {
  dispatch({
    type: SET_CLASSNAME,
    payload: data,
  });
};
