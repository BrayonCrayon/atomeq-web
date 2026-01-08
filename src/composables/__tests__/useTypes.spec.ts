import { useTypes } from '@/composables/useTypes.ts';
import { elementTypeFactory } from '@/testUtils/elementTypeFactory.ts';
import { AtomeqElementType } from '@/types/elementType.ts';
import { apiService } from '@/vitest.setup.ts';
import type { AxiosResponse } from 'axios';
import { describe, it, vi, expect } from 'vitest';

describe('useTypes', () => {
  it('will fetch the type data', async () => {
    const data = Array.from({ length: 5 }).map(() => elementTypeFactory());
    apiService.fetchTypes.mockResolvedValue({ data } as AxiosResponse);
    const { getTypes, types } = useTypes();

    await getTypes();

    expect(types.value.length).toEqual(5);
    expect(types.value).toEqual(data);
    expect(types.value[0]).instanceof(AtomeqElementType);
  });

  it('will catch error when api fails', async () => {
    const errorMessage = { error: { message: 'Opps, something happened' } };
    const consoleSpy = vi.spyOn(console, 'error').mockImplementationOnce(() => {});
    apiService.fetchTypes.mockRejectedValue(errorMessage);
    const { getTypes, types } = useTypes();

    await getTypes();

    expect(types.value).toEqual([]);
    expect(consoleSpy).toHaveBeenCalledWith(errorMessage);
    consoleSpy.mockRestore();
  });
});
