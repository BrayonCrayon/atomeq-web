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

    // TODO: loop over the children and find the respected parent from types ref.
    //    Then retrieve the parent's children array from the parent key and add the new child to it. ( refer to test as an example )

    return formatted;
  };

  return {
    getTypes,
    getFormattedTypes,
    types,
  };
};
