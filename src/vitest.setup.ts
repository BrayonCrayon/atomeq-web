import { type Mocked, vi } from 'vitest';
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
