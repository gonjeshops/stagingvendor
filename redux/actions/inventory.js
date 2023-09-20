import { addAttachments, addNewInventory, deleteInventoryItem, getAttributes, getInventoryCategories, getInventoryGroups, getInventoryList, getSingleInventory, updateInventory } from "../../api/inventory";
import types from "../types/inventory";

export const inventoryList = (values) => {
    return async (dispatch) => {
      dispatch({
        type: types.GET_INVENTORY_REQUEST,
      });
      try {
        const res = await getInventoryList(values);
        return dispatch({
          type: types.GET_INVENTORY_SUCCESS,
          payload: {
            data: res?.data || {},
          },
        });
      } catch (error) {
        return dispatch({
          type: types.GET_INVENTORY_FAILURE,
          payload: error.response,
        });
      }
    };
  };

  export const deleteInventory = (id)=>{
    return async (dispatch) => {
      dispatch({
        type: types.DELETE_INVENTORY_REQUEST,
      });
      try {
        const res = await deleteInventoryItem(id);
        if(res.status === 200){
          return dispatch({
            type: types.DELETE_INVENTORY_SUCCESS,
            payload : res.data
          });
        }else{
          return dispatch({
            type: types.DELETE_INVENTORY_FAILURE,
            payload: res,
          });
        }
      } catch (error) {
        return dispatch({
          type: types.DELETE_INVENTORY_FAILURE,
          payload: error.response,
        });
      }
    };
  }

  export const inventoryGroupList = (shop_id)=>{
    return async (dispatch) => {
      dispatch({
        type: types.GET_INVENTORY_GROUP_REQUEST,
      });
      try {
        const res = await getInventoryGroups(shop_id);
        return dispatch({
          type: types.GET_INVENTORY_GROUP_SUCCESS,
          payload: {
            data: res?.data || {},
          },
        });
      } catch (error) {
        console.log("errorerrorerror", error)
        return dispatch({
          type: types.GET_INVENTORY_GROUP_FAILURE,
          // payload: error.response,
        });
      }
    };
  }

  export const inventoryCategoryList = (type_id)=>{
    return async (dispatch) => {
      dispatch({
        type: types.GET_INVENTORY_CATEGORIES_REQUEST,
      });
      try {
        const res = await getInventoryCategories(type_id);
        return dispatch({
          type: types.GET_INVENTORY_CATEGORIES_SUCCESS,
          payload: {
            data: res?.data?.data || {},
          },
        });
      } catch (error) {
        console.log("errorerrorerror", error)
        return dispatch({
          type: types.GET_INVENTORY_CATEGORIES_FAILURE,
          // payload: error.response,
        });
      }
    };
  }

  // getAttributes

  export const getAttributeList = (shop_id)=>{
    return async (dispatch) => {
      dispatch({
        type: types.GET_ATTRIBUTES_REQUEST,
      });
      try {
        const res = await getAttributes(shop_id);
        return dispatch({
          type: types.GET_ATTRIBUTES_SUCCESS,
          payload: {
            data: res?.data || {},
          },
        });
      } catch (error) {
        return dispatch({
          type: types.GET_ATTRIBUTES_FAILURE,
          // payload: error.response,
        });
      }
    };
  }

  // add attachments
  export const addAttachmentList = (values)=>{
    return async (dispatch) => {
      dispatch({
        type: types.ADD_ATTACHMENTS_REQUEST,
      });
      try {
        const res = await addAttachments(values);
        return dispatch({
          type: types.ADD_ATTACHMENTS_SUCCESS,
          payload: {
            data: res?.data || {},
          },
        });
      } catch (error) {
        console.log("errorerrorerror", error)
        return dispatch({
          type: types.ADD_ATTACHMENTS_FAILURE,
          // payload: error.response,
        });
      }
    };
  }

 
  // add new Inventory

  export const addInventory = (values)=>{
    return async (dispatch) => {
      dispatch({
        type: types.ADD_INVENTORY_REQUEST,
      });
      try {
        const res = await addNewInventory(values);
        return dispatch({
          type: types.ADD_INVENTORY_SUCCESS,
          payload: {
            data: res?.data || {},
          },
        });
      } catch (error) {
        console.log("errorerrorerror", error)
        return dispatch({
          type: types.ADD_INVENTORY_FAILURE,
          payload: error.response,
        });
      }
    };
  }

  // update Inventory

  export const editInventory = (values)=>{
    return async (dispatch) => {
      dispatch({
        type: types.EDIT_INVENTORY_REQUEST,
      });
      try {
        const res = await updateInventory(values);
        return dispatch({
          type: types.EDIT_INVENTORY_SUCCESS,
          payload: {
            data: res?.data || {},
          },
        });
      } catch (error) {
        console.log("errorerrorerror", error)
        return dispatch({
          type: types.EDIT_INVENTORY_FAILURE,
          payload: error.response,
        });
      }
    };
  }


  // get Single inventory info
  export const singleInventory = (product_slug) => {
    return async (dispatch) => {
      dispatch({
        type: types.GET_SINGLE_INVENTORY_REQUEST,
      });
      try {
        const res = await getSingleInventory(product_slug);
        return dispatch({
          type: types.GET_SINGLE_INVENTORY_SUCCESS,
          payload: {
            data: res?.data || {},
          },
        });
      } catch (error) {
        
        return dispatch({
          type: types.GET_SINGLE_INVENTORY_FAILURE,
          payload: error.response,
        });
      }
    };
  };