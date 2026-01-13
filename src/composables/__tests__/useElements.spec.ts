import { describe, expect, it, vi } from 'vitest';
import useElements from '@/composables/useElements';
import api from '@/router/api';
import { elementFactory } from '@/testUtils/elementFactory';
import type { AxiosResponse } from 'axios';
import { apiService } from '@/vitest.setup.ts';
import { Element, type IElement } from '@/types/element';

describe('useElements', () => {
  it('will get all elements coming from the backend endpoint', async () => {
    const data: IElement[] = [elementFactory()];
    const compareElement = new Element(data[0]);
    apiService.fetchElements.mockResolvedValue({ data } as AxiosResponse<IElement[]>);

    const { getElements, elements } = useElements();

    await getElements();

    expect(api.fetchElements).toHaveBeenCalled();
    const target: Element = elements.value[0];

    Object.entries(target).forEach(([key, value]) => {
      expect(value).toEqual(compareElement[key as keyof Element]);
    });
  });

  it('will handle errors gracefully', async () => {
    apiService.fetchElements.mockRejectedValue({ message: 'bad data' });
    using spy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const { getElements, elements } = useElements();

    await getElements();

    expect(spy).toHaveBeenCalled();
    expect(elements.value).toEqual([]);
    spy.mockRestore();
  });
});
