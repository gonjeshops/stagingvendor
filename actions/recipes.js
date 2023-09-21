import {RECIPE_LISTING,RECIPE_DETAIL} from "./type";
  import RecipesService from "../services/RecipesService.js";
  export const retrieveRecipes = (Collected_data) => async (dispatch) => {
    try {
      const res = await RecipesService.getRecipesList(Collected_data);
  
      dispatch({
        type: RECIPE_LISTING,
        payload: res.data.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
  
   export const recipeDetail = (Collected_data) => async (dispatch) => {
    try {
      const res = await RecipesService.getRecipesDetail(Collected_data);
  
      dispatch({
        type: RECIPE_DETAIL,
        payload: res.data.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
