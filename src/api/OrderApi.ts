import { axiosPrivate } from "config/axiosConfig";

const apiPath = "/orders";

export const upgradeMembership = async (planId: number) => {
  return await axiosPrivate.post(`${apiPath}/upgrade-membership/${planId}`);
};
