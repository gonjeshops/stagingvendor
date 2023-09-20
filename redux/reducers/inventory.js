import types from "../types/inventory";

const inventoryReducer = (state = {}, { type, payload }) => {
  switch (type) {
    //
    // INVENTORY
    //
    case types.GET_INVENTORY_REQUEST:
      return {
        ...state,
      };
    case types.GET_INVENTORY_SUCCESS:
      return {
        ...state,
        inventoryData: payload.data,
      };

    case types.GET_INVENTORY_FAILURE:
      return {
        ...state,
      };


    //
    // get single INVENTORY
    //
    case types.GET_SINGLE_INVENTORY_REQUEST:
      return {
        ...state,
      };
    case types.GET_SINGLE_INVENTORY_SUCCESS:
      return {
        ...state,
        singleInventoryData: payload.data,
      };

    case types.GET_SINGLE_INVENTORY_FAILURE:
      return {
        ...state,
      };



    /// delete
    case types.DELETE_INVENTORY_REQUEST:
      return {
        ...state,
      };
    case types.DELETE_INVENTORY_SUCCESS:
      return {
        ...state,
      };

    case types.DELETE_INVENTORY_FAILURE:
      return {
        ...state,
      };

    //  inventory group list
    case types.GET_INVENTORY_GROUP_REQUEST:
      return {
        ...state,
      };
    case types.GET_INVENTORY_GROUP_SUCCESS:
      return {
        ...state,
        inventoryGroups: payload?.data?.data,
      };
    case types.GET_INVENTORY_GROUP_FAILURE:
      return {
        ...state,
      };

    //  inventory category list
    case types.GET_INVENTORY_CATEGORIES_REQUEST:
      return {
        ...state,
      };
    case types.GET_INVENTORY_CATEGORIES_SUCCESS:
      return {
        ...state,
        inventoryCategories: payload?.data?.data,
      };
    case types.GET_INVENTORY_CATEGORIES_FAILURE:
      return {
        ...state,
      };

    //  inventory attribute list
    case types.GET_ATTRIBUTES_REQUEST:
      return {
        ...state,
      };
    case types.GET_ATTRIBUTES_SUCCESS:
      return {
        ...state,
        attributes: payload?.data?.data,
      };
    case types.GET_ATTRIBUTES_FAILURE:
      return {
        ...state,
      };

/// add attachments 
      case types.ADD_ATTACHMENTS_REQUEST:
        return {
          ...state,
        };
      case types.ADD_ATTACHMENTS_SUCCESS:
        return {
          ...state,
          attachmentsList: payload?.data?.data,
        };
      case types.ADD_ATTACHMENTS_FAILURE:
        return {
          ...state,
        };

        /// add Inventory 
      case types.ADD_INVENTORY_REQUEST:
        return {
          ...state,
        };
      case types.ADD_INVENTORY_SUCCESS:
        return {
          ...state,
        };
      case types.ADD_INVENTORY_FAILURE:
        return {
          ...state,
        };


        /// Edit Inventory 
        case types.EDIT_INVENTORY_REQUEST:
          return {
            ...state,
          };
        case types.EDIT_INVENTORY_SUCCESS:
          return {
            ...state,
          };
        case types.EDIT_INVENTORY_FAILURE:
          return {
            ...state,
          };


    default:
      return state;
  }
};

export default inventoryReducer;
