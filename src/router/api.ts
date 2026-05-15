import { axiosClient } from '@/router/utils.ts';
import type { IElementState } from '@/types/elementState.ts';
import type { IElementType } from '@/types/elementType.ts';
import type { IElement } from '@/types/element.ts';

export const fetchElements = () => {
  return axiosClient.get<IElement[]>(`/api/elements`, {
    params: {
      relations: ['state', 'type'],
    },
  });
};

export const fetchTypes = () => {
  return axiosClient.get<IElementType[]>(`/api/types`);
};

export const fetchStates = () => {
  return axiosClient.get<IElementState[]>(`/api/states`);
};

export const postEquation = (equation: string) => {
  return axiosClient.post(`/api/compute-chemical-equation`, { equation });
};

export default {
  fetchElements,
  fetchTypes,
  fetchStates,
  postEquation,
};
