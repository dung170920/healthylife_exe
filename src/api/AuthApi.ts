import { LoginRequestModel, RegisterRequestModel } from "models";
import { axiosPublic } from "config/axiosConfig";

const apiPath = "/auth";

export const login = async (params: LoginRequestModel) => {
  return await axiosPublic.post(apiPath + "/login", params);
};

export const register = async (params: RegisterRequestModel) => {
  return await axiosPublic.post(apiPath + "/register", params);
};
