import api from '@/router/api.ts';
import type { IElementType } from '@/types/elementType.ts';
import { transformElementTypes } from '@/types/utils.ts';
import { ref } from 'vue';

export const useTypes = () => {
  const types = ref<IElementType[]>([]);

  const getTypes = async () => {
    try {
      const response = await api.fetchTypes();
      types.value = transformElementTypes(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    getTypes,
    types,
  };
};
