import AtomeqTypeLegend from '@/components/AtomeqTypeLegend.vue';
import { apiService } from '@/vitest.setup.ts';
import { mount } from '@vue/test-utils';
import type { AxiosResponse } from 'axios';
import { describe, it, expect } from 'vitest';

describe('AtomeqTypeLegend', () => {
  it('calls the api to retrieve all data on element type hierarchy', async () => {
    const response = { data: { data: [] } };
    apiService.fetchTypes.mockResolvedValue(response as AxiosResponse);
    const wrapper = mount(AtomeqTypeLegend);

    expect(apiService.fetchTypes).toHaveBeenCalled();
  });
});
