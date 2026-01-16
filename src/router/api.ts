import { axiosClient } from '@/router/utils.ts';
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

export default {
  fetchElements,
  fetchTypes,
};
