import {DELIVERY_DATE} from "./type";
  import DeliveryDateService from "../services/DeliveryDateService";
  export const retrieveDeliveryDate = (shop_id) => async (dispatch) => {
    try {
      const res = await DeliveryDateService.get(shop_id);
  
      dispatch({
        type: DELIVERY_DATE,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
  