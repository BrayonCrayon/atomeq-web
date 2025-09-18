import axios from 'axios';

const axiosClient = axios.create({ data: false });
export const fetchElements = () => {
  return axiosClient.get(`${import.meta.env.VITE_BASE_PATH}/api/elements`);
};

export default {
  fetchElements,
};
