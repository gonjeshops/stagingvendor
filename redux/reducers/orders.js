import { types } from "../types/orders";

export const orderReducer = (state = {}, { type, payload }) => {
  switch (type) {
    //
    // GET Orders List
    //
    case types.GET_ORDERS_REQUEST:
      return {
        ...state,
      };
    case types.GET_ORDERS_SUCCESS:
      return {
        ...state,
        orderList: payload.data,
      };

    case types.GET_ORDERS_FAILURE:
      return {
        ...state,
      };

    //
    // GET Order detail
    //
    case types.GET_ORDER_DETAIL_REQUEST:
      return {
        ...state,
      };
    case types.GET_ORDER_DETAIL_SUCCESS:
      return {
        ...state,
        orderDetail: payload.data,
      };

    case types.GET_ORDER_DETAIL_FAILURE:
      return {
        ...state,
      };

    //
    // GET availavle Order statuses list
    //
    case types.GET_ORDER_STATUS_LIST_REQUEST:
      return {
        ...state,
      };
    case types.GET_ORDER_STATUS_LIST_SUCCESS:
      return {
        ...state,
        statusList: payload.data,
      };

    case types.GET_ORDER_STATUS_LIST_FAILURE:
      return {
        ...state,
      };

    //
    // update Order status
    //
    case types.UPDATE_ORDER_STATUS_REQUEST:
      return {
        ...state,
      };
    case types.UPDATE_ORDER_STATUS_SUCCESS:
      return {
        ...state,
      };

    case types.UPDATE_ORDER_STATUS_FAILURE:
      return {
        ...state,
      };

    default:
      return state;
  }
};
