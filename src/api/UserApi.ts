import { axiosPrivate } from "config/axiosConfig";
import queryString from "query-string";

const apiPath = "/users";

export const getProfile = async () => {
  return await axiosPrivate.get(`${apiPath}/profile`);
};
