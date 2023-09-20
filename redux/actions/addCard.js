import { addCardDetails } from '../../api/signUp';
import types from '../types/auth'

export const addCard = (values)=>{

    return async (dispatch)=>{
        dispatch({
            type:types.ADD_CARD_REQUEST
        });
        try{
            let data = await addCardDetails(values);
            return  dispatch({
                 type : types.ADD_CARD_SUCCESS,
                 payload : {
                     data : data
                 }
             })
        }catch(err){
            dispatch({
                type: types.ADD_CARD_FAILURE,
                payload: err,
              });
        }
    }

}