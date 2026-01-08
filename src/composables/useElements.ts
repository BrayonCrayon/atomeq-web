import api from '@/router/api';
import { Element } from '@/types/element.ts';
import { transformMultipleElements } from '@/types/utils.ts';
import { ref } from 'vue';

const useElements = () => {
  const elements = ref<Element[]>([]);

  const getElements = async () => {
    try {
      const response = await api.fetchElements();
      elements.value = transformMultipleElements(response.data);
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
