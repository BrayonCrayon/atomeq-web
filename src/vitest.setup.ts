import { type Mocked } from 'vitest'
import api from '@/router/api'

export const apiService = api as Mocked<typeof api>
