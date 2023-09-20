import types from "../types/auth";

const initialState = {
  user: null,
  isRegistered: false,
  isLoggedIn: false,
  token: "",
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    //
    // REGISTER
    //
    case types.REGISTER_REQUEST:
      return {
        ...state,
      };
    case types.REGISTER_SUCCESS:
      return {
        ...state,
        token: payload.data.token,
        user: payload.data,
        isRegistered: true,
      };

    case types.REGISTER_ERROR:
      return {
        ...state,
      };

    //
    // Login
    //

    case types.LOGIN_REQUEST:
      return {
        ...state,
      };
    case types.LOGIN_SUCCESS:
      return {
        ...state,
      };
    case types.LOGIN_FAILURE:
      return {
        ...state,
      };

    //
    // Logout
    //

    case types.LOGOUT_REQUEST:
      return {
        ...state,
      };
    case types.LOGOUT_SUCCESS:
      return {
        ...state,
      };
    case types.LOGOUT_FAILURE:
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default reducer;
