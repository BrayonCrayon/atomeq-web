import api from '@/router/api'
import { ref } from 'vue'
import type { IElement } from '@/types/element.ts'

const useElements = () => {
  const elements = ref<IElement[]>([]);

  const getElements = async () => {
    try {
      const response = await api.fetchElements<{data: IElement[]}>()
      elements.value = response.data;
    }
    catch(error) {
      console.error(error)
    }
  };

  return {
      getElements,
      elements,
  }
}

export default useElements;
