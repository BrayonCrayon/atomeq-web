import mockElements from '@/views/__tests__/mockElements.ts';
import { describe, it, expect } from 'vitest';
import { flushPromises, mount } from '@vue/test-utils';
import AtomeqTable from '@/views/AtomeqTable.vue';
import { apiService } from '@/vitest.setup';

describe('AtomeqTable', () => {
  it('will call endpoint to retrieve elements and load them in', async () => {
    apiService.fetchElements.mockResolvedValue({ data: { data: [] } });
    mount(AtomeqTable);
    await flushPromises();

    expect(apiService.fetchElements).toHaveBeenCalled();
  });

  it('will render all the elements on the screen', async () => {
    const elements = mockElements.data;
    apiService.fetchElements.mockResolvedValue({ data: mockElements });

    const wrapper = mount(AtomeqTable);
    await flushPromises();

    elements.forEach((element) => {
      expect(wrapper.text()).toContain(element.symbol);
    });
  });
});
