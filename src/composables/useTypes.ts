import api from '@/router/api.ts';
import { AtomeqElementType, type IElementType } from '@/types/elementType.ts';
import { transformElementTypes } from '@/types/utils.ts';
import { ref } from 'vue';

export const useTypes = () => {
  const types = ref<IElementType[]>([]);

  const getTypes = async () => {
    try {
      const response = await api.fetchTypes();
      types.value = transformElementTypes(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getFormattedTypes = () => {
    const formatted: Map<AtomeqElementType, AtomeqElementType[]> = new Map();

    types.value.filter((item) => item.parentId === null).forEach((item) => formatted.set(item, []));

    const children = types.value.filter((item) => item.parentId !== null);
    children.forEach((child) => {
      const foundParent: AtomeqElementType | undefined = types.value.find(
        (item) => item.id === child.parentId,
      );

      if (foundParent) {
        formatted.get(foundParent)?.push(child);
      }
    });

    return formatted;
  };

  return {
    getTypes,
    getFormattedTypes,
    types,
  };
};
