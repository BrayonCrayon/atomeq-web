import api from '@/router/api';
import { AtomeqElement } from '@/types/element.ts';
import { transformMultipleElements } from '@/types/utils.ts';
import { ref } from 'vue';
import type { IAtomeqElement } from '@/types/element.ts';

const useElements = () => {
  const elements = ref<AtomeqElement[]>([]);

  const getElements = async () => {
    try {
      const response = await api.fetchElements<{ data: IAtomeqElement[] }>();
      elements.value = transformMultipleElements(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    getElements,
    elements,
  };
};

export default useElements;
