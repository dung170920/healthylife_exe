import { axiosPrivate } from "config/axiosConfig";

const apiPath = "/recipes";

export const getIngredientList = async () => {
  return await axiosPrivate.get(`${apiPath}/all`);
};
