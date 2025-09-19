import axios from 'axios';
import type {IAtomeqElement} from "@/types/element.ts";

const axiosClient = axios.create({ data: false });
export const fetchElements = () => {
  return axiosClient.get<{ data: IAtomeqElement[] }>(`${import.meta.env.VITE_BASE_PATH}/api/elements`);
};

export default {
  fetchElements,
};
