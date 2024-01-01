import axios, { AxiosRequestConfig } from "axios";

import { getAuthToken } from "./authToken";

const request = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL_DELIVERY,
  // timeout: 10000, // 10s
  responseType: "json",
  withCredentials: true,
});

/**
 * Injeta o Auth Token nas requisições
 */
request.interceptors.request.use(async (config) => {
  const token = await getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

/**
 * Cliente para consultar a API Rest.
 */
export default {
  get: (url: string, config?: AxiosRequestConfig<any>) =>
    request.get(url, config),
  delete: (url: string, config?: AxiosRequestConfig<any>) =>
    request.delete(url, config),
  post: (url: string, data?: any, config?: AxiosRequestConfig<any>) =>
    request.post(url, data, config),
  put: (url: string, data: any, config?: AxiosRequestConfig<any>) =>
    request.put(url, data, config),
  patch: (url: string, data: any, config?: AxiosRequestConfig<any>) =>
    request.patch(url, data, config),
  postForm: (url: string, data: any, config?: AxiosRequestConfig<any>) =>
    request.postForm(url, data, config),
};
