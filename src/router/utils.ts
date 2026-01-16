import axios from 'axios';
import type { AxiosResponse } from 'axios';

export const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_PATH,
});

export const removeDataLayer = (response: AxiosResponse) => {
  if ('data' in response.data) {
    response.data = response.data.data;
  }
  return response;
};

axiosClient.interceptors.response.use(removeDataLayer);
