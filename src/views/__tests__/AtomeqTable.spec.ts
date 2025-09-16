import { describe, it, expect } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import AtomeqTable from '@/views/AtomeqTable.vue'
import { apiService } from '@/vitest.setup'

describe("AtomeqTable", () => {
  it('will call endpoint to retrieve elements and load them in', async () => {
    apiService.fetchElements.mockResolvedValue({ data: [] });
    mount(AtomeqTable);
    await flushPromises();

    expect(apiService.fetchElements).toHaveBeenCalled();
  })
})
