// import { RecipeRequestModel } from "models";
import { axiosPrivate } from "config/axiosConfig";
// import queryString from "query-string";

const apiPath = "/payment";

export const sendRequestPayment = async (money: number) => {
  return await axiosPrivate.post(`${apiPath}`, { amount: money });
};
