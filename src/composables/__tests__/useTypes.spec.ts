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

  it('will transform types into a group based on the parent types', async () => {
    const parentTypeOne = elementTypeFactory();
    const subTypeOne = elementTypeFactory({ parentId: parentTypeOne.id });
    const parentTypeTwo = elementTypeFactory();
    const subTypeTwo = elementTypeFactory({ parentId: parentTypeTwo.id });
    const subTypeThree = elementTypeFactory({ parentId: parentTypeTwo.id });
    const payload = [parentTypeOne, parentTypeTwo, subTypeOne, subTypeTwo];

    const expectedResult = new Map();
    expectedResult.set(parentTypeOne, [subTypeOne]);
    expectedResult.set(parentTypeTwo, [subTypeTwo]);
    expectedResult.get(parentTypeTwo).push(subTypeThree);

    // TODO: remove this
    console.log(expectedResult);

    apiService.fetchTypes.mockResolvedValue({ data: payload } as AxiosResponse);

    const { getTypes, getFormattedTypes } = useTypes();
    await getTypes();

    const result = getFormattedTypes();

    expect(result).toEqual(expectedResult);
  });
});
