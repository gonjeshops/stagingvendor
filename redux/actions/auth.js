import { login_vendor } from "../../api/login";
import { registerVendor } from "../../api/signUp";
import types from "../types/auth";
import { toast } from "react-toastify";
import { logout_vendor } from "../../api/logout";

export const register = (values) => {
  return async (dispatch) => {
    dispatch({
      type: types.REGISTER_REQUEST,
    });
    try {
      const res = await registerVendor(values);
      localStorage.setItem("token", res?.data?.token);
      return dispatch({
        type: types.REGISTER_SUCCESS,
        payload: {
          data: res?.data || {},
        },
      });
    } catch (error) {
      toast.error(error.response.data.message);
      return dispatch({
        type: types.REGISTER_ERROR,
        payload: error.response,
      });
    }
  };
};

export const login = (values) => {
  return async (dispatch) => {
    dispatch({
      type: types.LOGIN_REQUEST,
    });
    try {
      const res = await login_vendor(values);
      if (res?.data.status === 1) {
        localStorage.setItem("token", res?.data?.token);
        localStorage.setItem("shop_id", res?.data?.shop_id);
        return dispatch({
          type: types.LOGIN_SUCCESS,
          payload: {
            data: res?.data || {},
          },
        });
      } else {
        toast.error(res.data.message);
        return dispatch({
          type: types.LOGIN_FAILURE,
          payload: res.data,
        });
      }
    } catch (error) {
      console.log("errorrr", error);
      return dispatch({
        type: types.LOGIN_FAILURE,
        payload: error.response,
      });
    }
  };
};

export const logout = (values) => {
  return async (dispatch) => {
    dispatch({
      type: types.LOGOUT_REQUEST,
    });
    try {
      const res = await logout_vendor(values);
      if (res?.data.status === 1) {
        toast.success(res.data.message);
        // localStorage.setItem("token", res?.data?.token);
        // localStorage.setItem("shop_id", res?.data?.shop_id);
        return dispatch({
          type: types.LOGOUT_SUCCESS,
          payload: {
            data: res?.data || {},
          },
        });
      } else {
        toast.error(res.data.message);
        return dispatch({
          type: types.LOGOUT_FAILURE,
          payload: res.data,
        });
      }
    } catch (error) {
      console.log("errorrr", error);
      return dispatch({
        type: types.LOGIN_FAILURE,
        payload: error.response,
      });
    }
  };
};
