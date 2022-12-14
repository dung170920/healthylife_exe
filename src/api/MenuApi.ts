import { axiosPrivate } from "config/axiosConfig";

const apiPath = "/menus";

export const getMenuByDate = async (date: string) => {
  return await axiosPrivate.get(`${apiPath}?date=${date}`);
};

export const getCurrentWeekMenu = async () => {
  return await axiosPrivate.get(`${apiPath}/current-week`);
};

export const getStatisticalMenu = async (year: number) => {
  return await axiosPrivate.get(`${apiPath}/statistic?Year=${year}`);
};
