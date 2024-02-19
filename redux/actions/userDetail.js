import { userDashboard, userDetail } from "../../api/userDetail";
import { types } from "../types/userDetail";

const fetchUser = () => {
  let url = "https://backendapi.gonje.com/";

  return axios({
    method: "get",
    headers: authHeader(),
    url: url + `me`,
  })
    .then((response) =>{ 
      console.log('USER DETAILS====', response)
      return response})
    .catch((error) => {
      console.log("Error in fetchUser api", error);
    });
} 

export const getUserDetail = (values) => {
  return async (dispatch) => {
    dispatch({
      type: types.GET_USER_REQUEST,
    });
    try {
      const res = await userDetail(values);
      return dispatch({
        type: types.GET_USER_SUCCESS,
        payload: {
          data: res.data,
        },
      });
    } catch (error) {
      return dispatch({
        type: types.GET_USER_FAILURE,
        payload: error.response,
      });
    }
  };
};
export const getUserDashboard = (values) => {
  return async (dispatch) => {
    dispatch({
      type: types.GET_DASHBOARD_REQUEST,
    });
    try {
      const res = await userDashboard(values);
      return dispatch({
        type: types.GET_DASHBOARD_SUCCESS,
        payload: {
          data: res.data,
        },
      });
    } catch (error) {
      return dispatch({
        type: types.GET_DASHBOARD_FAILURE,
        payload: error.response,
      });
    }
  };
};
