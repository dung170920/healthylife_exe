import {
  UserRequestModel,
  UsersRequestModel,
  UserInfoUpdateRequestModel,
  HealthInfoUpdateRequestModel,
} from "models";
import { axiosPrivate } from "config/axiosConfig";
import queryString from "query-string";

const apiPath = "/users";

export const getProfile = () => {
  return axiosPrivate.get(`${apiPath}/profile`);
};

export const getUsers = async (params: UsersRequestModel) => {
  return await axiosPrivate.get(`${apiPath}?${queryString.stringify(params)}`);
};

export const getUserById = async (params: UserRequestModel) => {
  return await axiosPrivate.get(
    `${apiPath}/info?${queryString.stringify(params)}`
  );
};

export const updateUserInfo = async (params: UserInfoUpdateRequestModel) => {
  return await axiosPrivate.patch(`${apiPath}/profile`, params);
};

export const updateHealthInfo = async (
  params: HealthInfoUpdateRequestModel
) => {
  return await axiosPrivate.patch(`${apiPath}/health-status`, params);
};
