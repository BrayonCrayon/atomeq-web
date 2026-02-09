import AtomeqTypeLegend from '@/components/AtomeqTypeLegend.vue';
import mockElements from '@/testUtils/mocks/mockElements.ts';
import mockTypes from '@/testUtils/mocks/mockTypes.ts';
import { describe, it, expect, beforeEach } from 'vitest';
import { flushPromises, mount } from '@vue/test-utils';
import AtomeqTable from '@/views/AtomeqTable.vue';
import { apiService } from '@/vitest.setup';
import type { AxiosResponse } from 'axios';
import { Element as AtomeqElementType } from '@/types/element.ts';

import AtomeqElement from '@/components/AtomeqElement.vue';
import AtomeqElementModal from '@/components/modals/AtomeqElementModal.vue';

describe('AtomeqTable', () => {
  beforeEach(() => {
    apiService.fetchTypes.mockResolvedValue(mockTypes);
  });

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

  it('will not display type legend when its on state display', async () => {
    apiService.fetchElements.mockResolvedValue(mockElements as AxiosResponse);

    const wrapper = mount(AtomeqTable);
    await flushPromises();

    const [, stateButton] = wrapper.findAllComponents({ name: 'AtomeqRadioInput' });

    await stateButton.trigger('click');

    expect(wrapper.findComponent(AtomeqTypeLegend).exists()).toBe(false);
  });

  it('will highlight the correct elements by type when the type is hovered in type legend', async () => {
    apiService.fetchElements.mockResolvedValue(mockElements as AxiosResponse);
    const nobleGas = mockTypes.data.find((item) => item.name === 'noble-gas');

    const nobleGases = mockElements.data.filter((element) => element.type.id === nobleGas!.id);
    const nonNobleGases = mockElements.data.filter((element) => element.type.id !== nobleGas!.id);

    const wrapper = mount(AtomeqTable);
    await flushPromises();

    // find the whole type legend component
    // emit from type legend that something was hovered over
    const typeLegend = wrapper.findComponent(AtomeqTypeLegend);
    typeLegend.vm.$emit('hover', nobleGas);

    const nobleGasIds = nobleGases.map((item) => item.id);

    const highlightedElements = wrapper
      .findAllComponents(AtomeqElement)
      .filter((item) => nobleGasIds.includes(item.props('element').id));

    highlightedElements.forEach((element) => {
      expect(element.props('faded')).toEqual(true);
    });

    // we need to know elements that belong to this type
    // we need to expect that the correct elements were highlighted
    // expect that the rest of the elements are gray
  });
});
