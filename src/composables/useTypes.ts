import api from '@/router/api.ts';
import type { IElementType } from '@/types/elementType.ts';
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
      const formattedTypes = [];
      types.value.forEach( (type) => {
      if(type.parentId === null) {
        //was intending to key one array with the id of the parent and then put all other types whose parentId is that type's id into that array
      }
      })
    }
  };

  return {
    getTypes,
    types,
  };
};
