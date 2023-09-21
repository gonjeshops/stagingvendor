import { RETRIEVE_USER } from "./type";
import UserDataService from "../services/UserService";
export const retrieveUser = () => async (dispatch) => {
  try {
    const res = await UserDataService.get();
    dispatch({
      type: RETRIEVE_USER,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};
