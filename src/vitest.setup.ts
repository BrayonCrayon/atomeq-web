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

export type ElementKey = keyof Element;

export const retrieveElementsByIds = <T>(
  wrapper: VueWrapper<InstanceType<typeof AtomeqTable>>,
  ids: T[],
  key: ElementKey = 'id',
) => {
  return wrapper.findAllComponents(AtomeqElement).filter((item) => {
    const element = item.props('element');
    const elementId: T = element[key] as T;
    return ids.includes(elementId);
  });
};

export const retrieveElementsNotInIds = <T>(
  wrapper: VueWrapper<InstanceType<typeof AtomeqTable>>,
  ids: T[],
  key: ElementKey = 'id',
) => {
  return wrapper.findAllComponents(AtomeqElement).filter((item) => {
    const element = item.props('element');
    const elementId: T = element[key] as T;
    return !ids.includes(elementId);
  });
};

export const expectFadedOnElements = (
  elements: VueWrapper<InstanceType<typeof AtomeqElement>>[],
  faded = true,
) => {
  elements.forEach((element) => {
    expect(element.props('faded')).toEqual(faded);
  });
};
