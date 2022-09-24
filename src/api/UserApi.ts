import { UsersRequestModel } from "models";
import { axiosPrivate } from "config/axiosConfig";
import queryString from "query-string";

const apiPath = "/users";

export const getProfile = () => {
  return axiosPrivate.get(`${apiPath}/profile`);
};

export const getUsers = async (params: UsersRequestModel) => {
  return await axiosPrivate.get(`${apiPath}?${queryString.stringify(params)}`);
};
