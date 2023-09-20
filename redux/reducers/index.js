import { combineReducers } from "redux";
import addCardReducer from "./addCard";
import register from "./auth";
import addContractReducer from "./contracts";
import { employeeReducer } from "./employee";
import inventoryReducer from "./inventory";
import { orderReducer } from "./orders";
import addUserReducer from "./userDetail";

const rootReducer = combineReducers({
  register,
  addCard: addCardReducer,
  inventory: inventoryReducer,
  employee: employeeReducer,
  order: orderReducer,
  contract: addContractReducer,
  user: addUserReducer,
});

export default rootReducer;
