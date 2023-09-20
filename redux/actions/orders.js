import {
  changeOrderStatus,
  getOrders,
  getOrderStatus,
  getSingleOrders,
} from "../../api/order";
import { types } from "../types/orders";

export const orderList = (values) => {
  return async (dispatch) => {
    dispatch({
      type: types.GET_ORDERS_REQUEST,
    });
    try {
      const res = await getOrders(values);
      return dispatch({
        type: types.GET_ORDERS_SUCCESS,
        payload: {
          data: res?.data || {},
        },
      });
    } catch (error) {
      return dispatch({
        type: types.GET_ORDERS_FAILURE,
        payload: error.response,
      });
    }
  };
};

export const orderDetail = (id) => {
  return async (dispatch) => {
    dispatch({
      type: types.GET_ORDER_DETAIL_REQUEST,
    });
    try {
      const res = await getSingleOrders(id);
      return dispatch({
        type: types.GET_ORDER_DETAIL_SUCCESS,
        payload: {
          data: res?.data || {},
        },
      });
    } catch (error) {
      return dispatch({
        type: types.GET_ORDER_DETAIL_FAILURE,
        payload: error.response,
      });
    }
  };
};

export const orderStatusList = (values) => {
  return async (dispatch) => {
    dispatch({
      type: types.GET_ORDER_STATUS_LIST_REQUEST,
    });
    try {
      const res = await getOrderStatus(values);
      return dispatch({
        type: types.GET_ORDER_STATUS_LIST_SUCCESS,
        payload: {
          data: res?.data || {},
        },
      });
    } catch (error) {
      return dispatch({
        type: types.GET_ORDER_STATUS_LIST_FAILURE,
        payload: error.response,
      });
    }
  };
};

export const orderStatuChange = (values) => {
  return async (dispatch) => {
    dispatch({
      type: types.UPDATE_ORDER_STATUS_REQUEST,
    });
    try {
      const res = await changeOrderStatus(values);
      return dispatch({
        type: types.UPDATE_ORDER_STATUS_SUCCESS,
        payload: {
          data: res?.data || {},
        },
      });
    } catch (error) {
      return dispatch({
        type: types.UPDATE_ORDER_STATUS_FAILURE,
        payload: error.response,
      });
    }
  };
};
