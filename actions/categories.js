import {RETRIEVE_CATEGORY} from "./type";
  import CategoryService from "../services/CategoryService";
  export const retrieveCategory = (id) => async (dispatch) => {
    try {
      const res = await CategoryService.get(id);
  
      dispatch({
        type: RETRIEVE_CATEGORY,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
  