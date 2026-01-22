import mockElements from '@/testUtils/mocks/mockElements.ts';
import { describe, it, expect } from 'vitest';
import { flushPromises, mount } from '@vue/test-utils';
import AtomeqTable from '@/views/AtomeqTable.vue';
import { apiService } from '@/vitest.setup';
import type { AxiosResponse } from 'axios';
import { Element as AtomeqElementType } from '@/types/element.ts';

import AtomeqElement from '@/components/AtomeqElement.vue';
import AtomeqElementModal from '@/components/modals/AtomeqElementModal.vue';

describe('AtomeqTable', () => {
  it('will call endpoint to retrieve elements and load them in', async () => {
    const response = { data: [] };
    apiService.fetchElements.mockResolvedValue(response as AxiosResponse);
    mount(AtomeqTable);
    await flushPromises();

    expect(apiService.fetchElements).toHaveBeenCalled();
  });

  it('will render all the elements on the screen', async () => {
    const elements = mockElements.data;
    apiService.fetchElements.mockResolvedValue(mockElements as AxiosResponse);

    const wrapper = mount(AtomeqTable);
    await flushPromises();

    elements.forEach((element) => {
      expect(wrapper.text()).toContain(element.symbol);
    });
  });

  it('will display elements colour by type as default', async () => {
    const element = mockElements.data[0];
    const target = new AtomeqElementType(element);
    const response = { data: [element] };
    apiService.fetchElements.mockResolvedValue(response as AxiosResponse);

    const wrapper = mount(AtomeqTable);
    await flushPromises();
    const elementComponent = wrapper.findComponent(AtomeqElement);

    expect(elementComponent.classes()).toContain(target.typeColour);
  });

  it('will display elements colour by state when state radio option is clicked', async () => {
    const element = mockElements.data[0];
    const target = new AtomeqElementType(element);
    const response = { data: [element] };
    apiService.fetchElements.mockResolvedValue(response as AxiosResponse);

    const wrapper = mount(AtomeqTable);
    await flushPromises();

    const input = wrapper.find('label[aria-label="state-display"]');
    await input.trigger('click');

    const elementComponent = wrapper.findComponent(AtomeqElement);

    expect(elementComponent.classes()).toContain(target.stateColour);
  });

  it('will display elements colour by type when type radio is clicked', async () => {
    const element = mockElements.data[0];
    const target = new AtomeqElementType(element);
    const response = { data: [element] };
    apiService.fetchElements.mockResolvedValue(response as AxiosResponse);

    const wrapper = mount(AtomeqTable);
    await flushPromises();

    await wrapper.find("label[aria-label='type-display']").trigger('click');

    const elementComponent = wrapper.findComponent(AtomeqElement);

    expect(elementComponent.classes()).toContain(target.typeColour);
  });

  it('will display an element details modal when an element is clicked', async () => {
    const element = mockElements.data[0];
    const response = { data: [element] };
    apiService.fetchElements.mockResolvedValue(response as AxiosResponse);

    const wrapper = mount(AtomeqTable);
    await flushPromises();

    const elementComponent = wrapper.findComponent(AtomeqElement);
    const elementModalComponent = wrapper.findComponent(AtomeqElementModal);

    expect(elementModalComponent.props().show).toBe(false);
    await elementComponent.trigger('click');
    expect(elementModalComponent.props().show).toBe(true);
  });
});
