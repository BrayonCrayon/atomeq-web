import api from '@/router/api'
import { ref } from 'vue'

const useElements = () => {
  const elements = ref<object[]>([]);

  const getElements = async () => {
    try {
      const response = await api.fetchElements<{data: object[]}>()
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
