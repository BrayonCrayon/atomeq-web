import AtomeqElement from '@/components/AtomeqElement.vue';
import AtomeqStateLegend from '@/components/AtomeqStateLegend.vue';
import AtomeqTypeLegend from '@/components/AtomeqTypeLegend.vue';
import AtomeqElementModal from '@/components/modals/AtomeqElementModal.vue';
import SwitchDisplay from '@/components/SwitchDisplay.vue';
import mockElements from '@/testUtils/mocks/mockElements.ts';
import mockStates from '@/testUtils/mocks/mockStates.ts';
import mockTypes from '@/testUtils/mocks/mockTypes.ts';
import { Display } from '@/types/atomeq-table.ts';
import { Element as AtomeqElementType } from '@/types/element.ts';
import AtomeqTable from '@/views/AtomeqTable.vue';
import { apiService, expectFadedOnElements, generateAxiosResponse } from '@/vitest.setup';
import { flushPromises, mount, type VueWrapper } from '@vue/test-utils';
import type { AxiosResponse } from 'axios';
import { beforeEach, describe, expect, it } from 'vitest';
import { nextTick } from 'vue';

describe('AtomeqTable', () => {
  beforeEach(() => {
    apiService.fetchTypes.mockResolvedValue(generateAxiosResponse(mockTypes.data));
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

    const nobleGasIds = mockElements.data
      .filter((element) => element.type.id === nobleGas!.id)
      .map((item) => item.id);
    const nonNobleGasIds = mockElements.data
      .filter((element) => element.type.id !== nobleGas!.id)
      .map((item) => item.id);

    const wrapper = mount(AtomeqTable);
    await flushPromises();

    const typeLegend = wrapper.findComponent(AtomeqTypeLegend);
    typeLegend.vm.$emit('hover', nobleGas);
    await nextTick();

    const highlightedElements = wrapper
      .findAllComponents(AtomeqElement)
      .filter((item) => nobleGasIds.includes(item.props('element').id));
    const fadedElements = wrapper
      .findAllComponents(AtomeqElement)
      .filter((item) => nonNobleGasIds.includes(item.props('element').id));

    expectFadedOnElements(highlightedElements, false);
    expectFadedOnElements(fadedElements);
  });

  it('will highlight the correct elements by state when the state is hovered in state legend', async () => {
    apiService.fetchElements.mockResolvedValue(mockElements as AxiosResponse);
    const gas = mockStates.data.find((item) => item.name === 'gas');

    const gasIds = mockElements.data
      .filter((element) => element.elementState.id === gas!.id)
      .map((item) => item.id);
    const nonGasIds = mockElements.data
      .filter((element) => element.elementState.id !== gas!.id)
      .map((item) => item.id);

    const wrapper = mount(AtomeqTable);
    await flushPromises();

    await switchDisplays(wrapper, Display.STATE);

    const stateLegend = wrapper.findComponent(AtomeqStateLegend);
    stateLegend.vm.$emit('hover', gas);
    await nextTick();

    const highlightedElements = wrapper
      .findAllComponents(AtomeqElement)
      .filter((item) => gasIds.includes(item.props('element').id));
    const fadedElements = wrapper
      .findAllComponents(AtomeqElement)
      .filter((item) => nonGasIds.includes(item.props('element').id));

    expectFadedOnElements(highlightedElements, false);
    expectFadedOnElements(fadedElements);
  });

  it('will reset hovered type when hoverLeave is emitted from type legend', async () => {
    apiService.fetchElements.mockResolvedValue(mockElements as AxiosResponse);
    const nobleGas = mockTypes.data.find((item) => item.name === 'noble-gas');

    const wrapper = mount(AtomeqTable);
    await flushPromises();

    const typeLegend = wrapper.findComponent(AtomeqTypeLegend);
    typeLegend.vm.$emit('hover', nobleGas);
    await nextTick();

    typeLegend.vm.$emit('hoverLeave', nobleGas);
    await nextTick();

    const allElements = wrapper.findAllComponents(AtomeqElement);

    expectFadedOnElements(allElements, false);
  });

  it('will reset hovered state when hoverLeave is emitted from state legend', async () => {
    apiService.fetchElements.mockResolvedValue(mockElements as AxiosResponse);
    const gas = mockStates.data.find((item) => item.name === 'gas');

    const wrapper = mount(AtomeqTable);
    await flushPromises();

    await switchDisplays(wrapper, Display.STATE);

    const stateLegend = wrapper.findComponent(AtomeqStateLegend);
    stateLegend.vm.$emit('hover', gas);
    await nextTick();

    stateLegend.vm.$emit('hoverLeave', gas);
    await nextTick();

    const allElements = wrapper.findAllComponents(AtomeqElement);

    expectFadedOnElements(allElements, false);
  });

  it('will persist the highlighted state when the legend type is clicked', async () => {
    apiService.fetchElements.mockResolvedValue(mockElements as AxiosResponse);
    const nobleGas = mockTypes.data.find((item) => item.name === 'noble-gas');

    const wrapper = mount(AtomeqTable);
    await flushPromises();

    const typeLegend = wrapper.findComponent(AtomeqTypeLegend);
    typeLegend.vm.$emit('click', nobleGas);
    await nextTick();

    const allElements = wrapper.findAllComponents(AtomeqElement);

    const nobleGasElements = allElements.filter(
      (item) => item.props('element').typeId === nobleGas?.id,
    );
    const otherElements = allElements.filter(
      (item) => item.props('element').typeId !== nobleGas?.id,
    );

    expectFadedOnElements(nobleGasElements, false);
    expectFadedOnElements(otherElements);
  });

  it('will persist the highlighted state when the legend state is clicked', async () => {
    apiService.fetchElements.mockResolvedValue(mockElements as AxiosResponse);
    const gas = mockStates.data.find((item) => item.name === 'gas');

    const wrapper = mount(AtomeqTable);
    await flushPromises();

    await switchDisplays(wrapper, Display.STATE);

    const stateLegend = wrapper.findComponent(AtomeqStateLegend);
    stateLegend.vm.$emit('click', gas);
    await nextTick();

    const allElements = wrapper.findAllComponents(AtomeqElement);

    const gasElements = allElements.filter(
      (item) => item.props('element').elementStateId === gas?.id,
    );
    const otherElements = allElements.filter(
      (item) => item.props('element').elementStateId !== gas?.id,
    );

    expectFadedOnElements(gasElements, false);
    expectFadedOnElements(otherElements);
  });

  it('will persist highlighting when an element type is selected and another type is hovered', async () => {
    apiService.fetchElements.mockResolvedValue(mockElements as AxiosResponse);
    const nobleGas = mockTypes.data.find((item) => item.name === 'noble-gas');
    const transitionMetal = mockTypes.data.find((item) => item.name === 'transition-metal');

    const wrapper = mount(AtomeqTable);
    await flushPromises();

    const typeLegend = wrapper.findComponent(AtomeqTypeLegend);
    typeLegend.vm.$emit('click', nobleGas);
    await nextTick();

    typeLegend.vm.$emit('hover', transitionMetal);
    await nextTick();

    const allElements = wrapper.findAllComponents(AtomeqElement);

    const nobleGasElements = allElements.filter(
      (item) => item.props('element').typeId === nobleGas?.id,
    );

    const transitionMetalElements = allElements.filter(
      (item) => item.props('element').typeId === transitionMetal?.id,
    );

    const otherElements = allElements.filter(
      (item) =>
        item.props('element').typeId !== nobleGas?.id &&
        item.props('element').typeId !== transitionMetal?.id,
    );

    expectFadedOnElements(nobleGasElements, false);
    expectFadedOnElements(transitionMetalElements, false);
    expectFadedOnElements(otherElements);
  });

  it('will persist highlighting when an element state is selected and another state is hovered', async () => {
    apiService.fetchElements.mockResolvedValue(mockElements as AxiosResponse);
    const gas = mockStates.data.find((item) => item.name === 'gas');
    const liquid = mockStates.data.find((item) => item.name === 'liquid');

    const wrapper = mount(AtomeqTable);
    await flushPromises();

    await switchDisplays(wrapper, Display.STATE);

    const stateLegend = wrapper.findComponent(AtomeqStateLegend);
    stateLegend.vm.$emit('click', gas);
    await nextTick();

    stateLegend.vm.$emit('hover', liquid);
    await nextTick();

    const allElements = wrapper.findAllComponents(AtomeqElement);

    const gasElements = allElements.filter(
      (item) => item.props('element').elementStateId === gas?.id,
    );
    const liquidElements = allElements.filter(
      (item) => item.props('element').elementStateId === liquid?.id,
    );
    const otherElements = allElements.filter(
      (item) =>
        item.props('element').elementStateId !== gas?.id &&
        item.props('element').elementStateId !== liquid?.id,
    );

    expectFadedOnElements(gasElements, false);
    expectFadedOnElements(liquidElements, false);
    expectFadedOnElements(otherElements);
  });

  it('will highlight the children types if the parent type is hovered', async () => {
    apiService.fetchElements.mockResolvedValue(mockElements as AxiosResponse);
    const [nonMetal, nobleGas, halogen] = mockTypes.data.filter((item) =>
      ['nonmetal', 'noble-gas', 'halogen'].includes(item.name),
    );

    const wrapper = mount(AtomeqTable);
    await flushPromises();

    const typeLegend = wrapper.findComponent(AtomeqTypeLegend);
    typeLegend.vm.$emit('hover', nonMetal);
    await nextTick();

    const allElements = wrapper.findAllComponents(AtomeqElement);

    const nonMetalElements = allElements.filter((item) =>
      [nonMetal.id, nobleGas.id, halogen.id].includes(item.props('element').typeId),
    );

    const otherElements = allElements.filter(
      (item) => ![nonMetal.id, nobleGas.id, halogen.id].includes(item.props('element').typeId),
    );

    expectFadedOnElements(nonMetalElements, false);
    expectFadedOnElements(otherElements);
  });
});

const switchDisplays = async (wrapper: VueWrapper, type: Display) => {
  const switchDisplay = wrapper.findComponent(SwitchDisplay);
  switchDisplay.vm.$emit('update:modelValue', type);
  await nextTick();
};
