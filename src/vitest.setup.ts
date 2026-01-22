import { type Mocked, vi } from 'vitest';
import api from '@/router/api';
import type { AxiosResponse } from 'axios';

vi.mock('@/router/api');
export const apiService = api as Mocked<typeof api>;

apiService.fetchElements.mockResolvedValue({ data: [] } as AxiosResponse);
apiService.fetchTypes.mockResolvedValue({ data: [] } as AxiosResponse);
