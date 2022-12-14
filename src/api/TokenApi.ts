import { axiosPublic } from "config/axiosConfig";

const apiPath = "/tokens";

export const getNewAccessToken = async (refreshToken: string) => {
  return await axiosPublic.post(apiPath + "/access-token", {
    refreshToken: refreshToken,
  });
};
