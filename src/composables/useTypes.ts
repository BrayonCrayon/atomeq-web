import { fetchTypes } from '@/router/api.ts';
import type { IElementType } from '@/types/elementType.ts';
import { ref } from 'vue';

export const useTypes = () => {
  const types = ref<IElementType[]>([]);

  // TODO: try-catch
  // separate Types to a class
  const getTypes = async () => {
    const data = await fetchTypes();
    types.value = data.data;
  };

  return {
    getTypes,
    types,
  };
};
