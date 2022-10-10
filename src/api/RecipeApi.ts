import { RecipeRequestModel } from "models";
import { axiosPrivate } from "config/axiosConfig";
import queryString from "query-string";

const apiPath = "/foods";

export const getRecipeList = async (params: RecipeRequestModel) => {
  return await axiosPrivate.get(`${apiPath}?${queryString.stringify(params)}`);
};

export const getRecipeById = async (params: string | undefined) => {
  return await axiosPrivate.get(`${apiPath}/${params}`);
};

export const addRecipe = async (params: any) => {
  return await axiosPrivate.post(`${apiPath}`, params);
};
