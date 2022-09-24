import { RecipeRequestModel } from "models";
import { axiosPrivate } from "config/axiosConfig";
import queryString from "query-string";

const apiPath = "/foods";

export const getRecipeList = async (params: RecipeRequestModel) => {
  return await axiosPrivate.get(`${apiPath}?${queryString.stringify(params)}`);
};