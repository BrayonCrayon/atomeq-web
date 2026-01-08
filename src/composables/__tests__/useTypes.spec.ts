import { useTypes } from '@/composables/useTypes.ts';
import { elementTypeFactory } from '@/testUtils/elementTypeFactory.ts';
import { apiService } from '@/vitest.setup.ts';
import { describe, it, expect } from 'vitest';

describe('useTypes', () => {
  it('will fetch the type data', async () => {
    const data = Array.from({ length: 5 }).map(() => elementTypeFactory());
    apiService.fetchTypes.mockResolvedValue({ data });
    const { getTypes, types } = useTypes();

    await getTypes();

    expect(types.value.length).toEqual(5);
    expect(types.value).toEqual(data);
  });
});
