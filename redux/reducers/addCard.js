import types from "../types/auth";


const addCardReducer = (state = {},action)=>{
    switch (action.type) {
        //
        // REGISTER
        //
        case types.ADD_CARD_REQUEST:
          return {
            ...state,
          };
        case types.ADD_CARD_SUCCESS:
          return {
            ...state,
          };
    
        case types.ADD_CARD_FAILURE:
          return {
            ...state,
          };
        default:
          return state;
      }

}

export default addCardReducer;