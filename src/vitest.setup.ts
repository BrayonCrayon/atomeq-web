import AtomeqElement from '@/components/AtomeqElement.vue';
import type { Element } from '@/types/element.ts';
import type AtomeqTable from '@/views/AtomeqTable.vue';
import { VueWrapper } from '@vue/test-utils';
import { type Mocked, vi, expect } from 'vitest';
import api from '@/router/api';
import { AxiosHeaders, type AxiosResponse } from 'axios';

vi.mock('@/router/api');
export const apiService = api as Mocked<typeof api>;

apiService.fetchElements.mockResolvedValue({ data: [] } as AxiosResponse);
apiService.fetchTypes.mockResolvedValue({ data: [] } as AxiosResponse);
apiService.fetchStates.mockResolvedValue({ data: [] } as AxiosResponse);

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

// TODO: work in progress - update typing
export const retrieveElementsByIds = (
  wrapper: VueWrapper<InstanceType<typeof AtomeqTable>>,
  ids: number[],
  key: string,
) => {
  return wrapper
    .findAllComponents(AtomeqElement)
    .filter((item) => ids.includes(item.props('element')[key as keyof typeof Element]));
};

export const expectFadedOnElements = (
  elements: VueWrapper<InstanceType<typeof AtomeqElement>>[],
  faded = true,
) => {
  elements.forEach((element) => {
    expect(element.props('faded')).toEqual(faded);
  });
};
