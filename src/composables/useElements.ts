import axios from 'axios';
import api from '@/router/api.ts'
import { ref } from 'vue'

const useElements = () => {
  const elements = ref<object[]>([]);

  const getElements = async () => {
    const {data} = await api.fetchElements<{data: object[]}>()
    elements.value = data;
  };


  return {
      getElements,
      elements,
  }
}

export default useElements;
