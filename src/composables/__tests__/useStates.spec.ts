import { useStates } from '@/composables/useStates.ts';
import { elementStateFactory } from '@/testUtils/elementStateFactory.ts';
import { ElementState } from '@/types/elementState.ts';
import { apiService } from '@/vitest.setup.ts';
import type { AxiosResponse } from 'axios';
import { describe, it, vi, expect } from 'vitest';

describe('useTypes', () => {
  it('will fetch the state data', async () => {
    const data = Array.from({ length: 5 }).map(() => elementStateFactory());
    apiService.fetchStates.mockResolvedValue({ data } as AxiosResponse);
    const { getStates, states } = useStates();

    await getStates();

    expect(states.value.length).toEqual(5);
    expect(states.value).toEqual(data);
    expect(states.value[0]).instanceof(ElementState);
  });

  it('will catch error when api fails', async () => {
    const errorMessage = { error: { message: 'Opps, something happened' } };
    const consoleSpy = vi.spyOn(console, 'error').mockImplementationOnce(() => {});
    apiService.fetchStates.mockRejectedValue(errorMessage);
    const { getStates, states } = useStates();

    await getStates();

    expect(states.value).toEqual([]);
    expect(consoleSpy).toHaveBeenCalledWith(errorMessage);
    consoleSpy.mockRestore();
  });
});
