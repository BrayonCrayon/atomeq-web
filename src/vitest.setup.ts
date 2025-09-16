import { type Mocked, vi } from 'vitest'
import api from '@/router/api'

vi.mock('@/router/api');
export const apiService = api as Mocked<typeof api>;
