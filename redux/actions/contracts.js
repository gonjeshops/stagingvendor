import { contractList, signContract } from "../../api/contract";
import { types } from "../types/contracts";

// getContracts List
export const getContractList = (values) => {
  return async (dispatch) => {
    dispatch({
      type: types.GET_CONTRACTS_REQUEST,
    });
    try {
      const res = await contractList(values);
      return dispatch({
        type: types.GET_CONTRACTS_SUCCESS,
        payload: {
          data: res.data,
        },
      });
    } catch (error) {
      return dispatch({
        type: types.GET_CONTRACTS_FAILURE,
        payload: error.response,
      });
    }
  };
};

export const addSignOnContract = (values) => {
  return async (dispatch) => {
    dispatch({
      type: types.SIGN_CONTRACT_REQUEST,
    });
    try {
      const res = await signContract(values);
      return dispatch({
        type: types.SIGN_CONTRACT_SUCCESS,
        payload: {
          data: res.data,
        },
      });
    } catch (error) {
      return dispatch({
        type: types.SIGN_CONTRACT_FAILURE,
        payload: error.response,
      });
    }
  };
};
