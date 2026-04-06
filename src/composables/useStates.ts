import api from '@/router/api.ts';
import type { ElementState } from '@/types/elementState.ts';
import { transformElementStates } from '@/types/utils.ts';
import { ref } from 'vue';

export const useStates = () => {
  const states = ref<ElementState[]>([]);

  const getStates = async () => {
    try {
      const response = await api.fetchStates();
      states.value = transformElementStates(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    getStates,
    states,
  };
};
