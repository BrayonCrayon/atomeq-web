import type { IElementType } from '@/types/elementType.ts';
import axios from 'axios';
import type { IElement } from '@/types/element.ts';

const axiosClient = axios.create({ data: false });
export const fetchElements = () => {
  return axiosClient.get<{ data: IElement[] }>(`${import.meta.env.VITE_BASE_PATH}/api/elements`, {
    params: {
      relations: ['state', 'type'],
    },
  });
};

export const fetchTypes = () => {
  return axiosClient.get<{ data: IElementType[] }>(`${import.meta.env.VITE_BASE_PATH}/api/types`);
};

export default {
  fetchElements,
  fetchTypes,
};
