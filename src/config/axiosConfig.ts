import { getNewAccessToken } from "api/TokenApi";
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import jwtDecode from "jwt-decode";
import { setToken } from "redux/slices/AuthSlice";
import { store } from "redux/store";

const onRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
  config.headers!["Authorization"] = `Bearer ${
    store.getState().auth.auth?.accessToken
  }`;
  return config;
};

const onRequestError = async (error: AxiosError): Promise<AxiosError> => {
  if (error?.response?.status === 401) {
    await getNewAccessToken(store.getState().auth.auth!.refreshToken).then(
      (res: AxiosResponse) => {
        error.config.headers![
          "Authorization"
        ] = `Bearer ${res.data?.accessToken}`;
        store.dispatch(setToken(res.data?.accessToken));
        // store.dispatch(setUserInfo(jwtDecode(res?.accessToken)));
        return axiosPrivate(error.config);
      }
    );
  }

  return Promise.reject(error);
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
  return response.data;
};

const onResponseError = (error: AxiosError): Promise<AxiosError> => {
  console.error(`[response error] [${JSON.stringify(error)}]`);
  return Promise.reject(error);
};

function setupInterceptors(axiosInstance: AxiosInstance): AxiosInstance {
  axiosInstance.interceptors.request.use(onRequest, onRequestError);
  axiosInstance.interceptors.response.use(onResponse, onResponseError);
  return axiosInstance;
}

export const axiosPublic = setupInterceptors(
  axios.create({
    baseURL: process.env.REACT_APP_BASE_API_URL,
  })
);

export const axiosPrivate = setupInterceptors(
  axios.create({
    baseURL: process.env.REACT_APP_BASE_API_URL,
    headers: {
      Accept: "application/json",
      "Content-type": "application/json; charset=utf-8",
    },
  })
);
