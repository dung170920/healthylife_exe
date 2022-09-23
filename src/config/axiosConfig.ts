import { getNewAccessToken } from "api/TokenApi";
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import { AuthResponseModel } from "models";
import { refreshFail, setToken } from "redux/slices/AuthSlice";
import { store } from "redux/store";

declare module "axios" {
  export interface AxiosInstance {
    request<T = any>(config: AxiosRequestConfig): Promise<T>;
    get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
    delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
    head<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
    post<T = any>(
      url: string,
      data?: any,
      config?: AxiosRequestConfig
    ): Promise<T>;
    put<T = any>(
      url: string,
      data?: any,
      config?: AxiosRequestConfig
    ): Promise<T>;
    patch<T = any>(
      url: string,
      data?: any,
      config?: AxiosRequestConfig
    ): Promise<T>;
  }
}

const onRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
  config.baseURL = process.env.REACT_APP_BASE_API_URL;
  config.headers = {
    Authorization: `Bearer ${store.getState().auth.auth?.accessToken}`,
    Accept: "application/json",
    "Content-type": "application/json; charset=utf-8",
  };
  return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error);
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
  return response.data?.result;
};

const onResponseError = async (error: AxiosError): Promise<AxiosError> => {
  console.log(error?.response?.status);

  if (error?.response?.status === 401) {
    await getNewAccessToken(store.getState().auth.auth!.refreshToken)
      .then((res: AuthResponseModel) => {
        error.config.headers!["Authorization"] = `Bearer ${res?.accessToken}`;
        store.dispatch(setToken(res?.accessToken));
        return onRequest(error.config);
      })
      .catch((err) => {
        console.log(err);
        store.dispatch(refreshFail(err.message));
      });
  }
  return Promise.reject(error);
};

function setupInterceptors(axiosInstance: AxiosInstance): AxiosInstance {
  axiosInstance.interceptors.request.use(onRequest, onRequestError);
  axiosInstance.interceptors.response.use(onResponse, onResponseError);
  return axiosInstance;
}

export const axiosPublic = axios.create({
  baseURL: process.env.REACT_APP_BASE_API_URL,
});

axiosPublic.interceptors.response.use((response) => response.data?.result);

export const axiosPrivate = setupInterceptors(axios);
