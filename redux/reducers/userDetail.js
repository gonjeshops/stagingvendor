import { types } from "../types/userDetail";

const addUserReducer = (state = {}, { type, payload }) => {
  switch (type) {
    //
    // user deatil List
    //
    case types.GET_USER_REQUEST:
      return {
        ...state,
      };
    case types.GET_USER_SUCCESS:
      return {
        ...state,
        userDetail: payload.data,
      };

    case types.GET_USER_FAILURE:
      return {
        ...state,
      };

    //
    // user dashboard detail
    //
    case types.GET_DASHBOARD_REQUEST:
      return {
        ...state,
      };
    case types.GET_DASHBOARD_SUCCESS:
      return {
        ...state,
        dashboardDetail: payload.data,
      };

    case types.GET_DASHBOARD_FAILURE:
      return {
        ...state,
      };

    default:
      return state;
  }
};
export default addUserReducer;
