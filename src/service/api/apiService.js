import axios from "axios";
import { appConfig } from "../../config/api.config";
import { IsAuth } from "../../components/Helper/Helper";

export const apiService = axios.create({
  baseURL: appConfig.apiBaseURL,
  timeout: appConfig.timeout,
});
export const apiServiceWithToken = axios.create({
  baseURL: appConfig.apiBaseURL,
  headers: appConfig.API_HEADER,
  timeout: appConfig.timeout,
});

apiService.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiServiceWithToken.interceptors.request.use(
  (config) => {
    const token = IsAuth();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
