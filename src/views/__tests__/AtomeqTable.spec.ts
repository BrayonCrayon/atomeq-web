import mockElements from '@/views/__tests__/mockElements.ts';
import { describe, it, expect } from 'vitest';
import { flushPromises, mount } from '@vue/test-utils';
import AtomeqTable from '@/views/AtomeqTable.vue';
import { apiService } from '@/vitest.setup';
import type { AxiosResponse } from 'axios';
import { AtomeqElement } from '@/types/element.ts';
import renderedElement from '@/components/AtomeqElement.vue';

describe('AtomeqTable', () => {
  it('will call endpoint to retrieve elements and load them in', async () => {
    const response = { data: { data: [] } };
    apiService.fetchElements.mockResolvedValue(response as AxiosResponse);
    mount(AtomeqTable);
    await flushPromises();

    expect(apiService.fetchElements).toHaveBeenCalled();
  });

  it('will render all the elements on the screen', async () => {
    const elements = mockElements.data;
    const response = { data: mockElements };
    apiService.fetchElements.mockResolvedValue(response as AxiosResponse);

    const wrapper = mount(AtomeqTable);
    await flushPromises();

    elements.forEach((element) => {
      expect(wrapper.text()).toContain(element.symbol);
    });
  });

  it('will display elements colour by type as default', async () => {
    const element = mockElements.data[0];
    const target = new AtomeqElement(element);
    const response = { data: { data: [element] } };
    apiService.fetchElements.mockResolvedValue(response as AxiosResponse);

    const wrapper = mount(AtomeqTable);
    await flushPromises();
    const elementComponent = wrapper.findComponent(renderedElement);

    expect(elementComponent.classes()).toContain(target.typeColour);
  });

  it('will display elements colour by state when state radio option is clicked', async () => {
    const element = mockElements.data[0];
    const target = new AtomeqElement(element);
    const response = { data: { data: [element] } };
    apiService.fetchElements.mockResolvedValue(response as AxiosResponse);

    const wrapper = mount(AtomeqTable);
    await flushPromises();

    const input = wrapper.find('input[aria-label="state-display"]');
    await input.setValue('state');

    const elementComponent = wrapper.findComponent(renderedElement);

    expect(elementComponent.classes()).toContain(target.stateColour);
  });

  it('will display elements colour by type when type radio is clicked', async () => {
    const element = mockElements.data[0];
    const target = new AtomeqElement(element);
    const response = { data: { data: [element] } };
    apiService.fetchElements.mockResolvedValue(response as AxiosResponse);

    const wrapper = mount(AtomeqTable);
    await flushPromises();

    await wrapper.find("input[aria-label='type-display']").trigger('click');

    const elementComponent = wrapper.findComponent(renderedElement);

    expect(elementComponent.classes()).toContain(target.typeColour);
  });
});
