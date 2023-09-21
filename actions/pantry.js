import { ORDER_LISTING } from "./type";
import PantryService from "../services/PantryService.js";
export const retrieveOrder = (page) => async (dispatch) => {
  try {
    const res = await PantryService.getAll(page);

    dispatch({
      type: ORDER_LISTING,
      payload: res.data,
    });
    return Promise.resolve(res.data);
  } catch (err) {
    console.log(err);
  }
};
