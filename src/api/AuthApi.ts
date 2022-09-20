import { axiosPublic } from "config/axiosConfig";

const apiPath = "/external-auth";

export const postIdToken = async (idToken: string) => {
  return await axiosPublic.post(apiPath + "/google-login", {
    idToken: idToken,
  });
};
