import { getNewAccessToken } from "api/TokenApi";
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import { setToken } from "redux/slices/AuthSlice";
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
        return axiosPrivate(error.config);
      }
    );
  }

  return Promise.reject(error);
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
  return response.data?.result;
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

export const axiosPublic = setupInterceptors(axios);

export const axiosPrivate = setupInterceptors(
  axios.create({
    headers: {
      Authorization: `Bearer ${store.getState().auth.auth?.accessToken}`,
      Accept: "application/json",
      "Content-type": "application/json; charset=utf-8",
    },
  })
);
