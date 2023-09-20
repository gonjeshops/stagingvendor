import { types } from "../types/contracts";

const addContractReducer = (state = {}, { type, payload }) => {
  switch (type) {
    //
    // Contract List
    //
    case types.GET_CONTRACTS_REQUEST:
      return {
        ...state,
      };
    case types.GET_CONTRACTS_SUCCESS:
      return {
        ...state,
        contractsList: payload.data,
      };

    case types.GET_CONTRACTS_FAILURE:
      return {
        ...state,
      };

    //
    // Sign Contract
    //
    case types.SIGN_CONTRACT_REQUEST:
      return {
        ...state,
      };
    case types.SIGN_CONTRACT_SUCCESS:
      return {
        ...state,
      };

    case types.SIGN_CONTRACT_FAILURE:
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default addContractReducer;
