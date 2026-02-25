import AtomeqElement from '@/components/AtomeqElement.vue';
import type { IElement } from '@/types/element.ts';
import { VueWrapper } from '@vue/test-utils';
import { type Mocked, vi, expect } from 'vitest';
import api from '@/router/api';
import { AxiosHeaders, type AxiosResponse } from 'axios';

vi.mock('@/router/api');
export const apiService = api as Mocked<typeof api>;

apiService.fetchElements.mockResolvedValue({ data: [] } as AxiosResponse);
apiService.fetchTypes.mockResolvedValue({ data: [] } as AxiosResponse);

export const generateAxiosResponse = <T>(
  data: T,
  overrides: Partial<AxiosResponse> = {},
): AxiosResponse<T> => {
  return {
    config: {
      headers: new AxiosHeaders(),
    },
    headers: {},
    request: {},
    status: 0,
    statusText: '',
    ...overrides,
    data,
  };
};

export const expectFadedOnElements = (
  elements: VueWrapper<InstanceType<typeof AtomeqElement>>[],
  faded = true,
) => {
  elements.forEach((element) => {
    expect(element.props('faded')).toEqual(faded);
  });
};
