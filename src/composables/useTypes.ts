import api from '@/router/api.ts';
import type { IElementType } from '@/types/elementType.ts';
import { ref } from 'vue';

export const useTypes = () => {
  const types = ref<IElementType[]>([]);

  // separate Types to a class
  const getTypes = async () => {
    try {
      const data = await api.fetchTypes();
      types.value = data.data;
    } catch (error) {
      console.error(error);
    }
  };

  return {
    getTypes,
    types,
  };
};
