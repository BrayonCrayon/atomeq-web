import axios, { type AxiosResponseInterceptorUse } from 'axios';

export const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_PATH,
});

export const removeDataLayer: AxiosResponseInterceptorUse = (response) => {
  if ('data' in response.data) {
    response.data = response.data.data;
  }
  return response;
};

axiosClient.interceptors.response.use(removeDataLayer);
