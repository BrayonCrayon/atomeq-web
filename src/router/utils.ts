import axios from 'axios';

export const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_PATH,
});

export const removeDataLayer = (response): object => {
  if ('data' in response.data) {
    response.data = response.data.data;
  }
  return response;
};

axiosClient.interceptors.response.use(removeDataLayer);
