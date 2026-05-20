import AtomeqBlockLegend from '@/components/AtomeqBlockLegend.vue';
import AtomeqElement from '@/components/AtomeqElement.vue';
import AtomeqStateLegend from '@/components/AtomeqStateLegend.vue';
import AtomeqTypeLegend from '@/components/AtomeqTypeLegend.vue';
import AtomeqElementModal from '@/components/modals/AtomeqElementModal.vue';
import SwitchDisplay from '@/components/SwitchDisplay.vue';
import {
  elements as mockElements,
  getElementsByBlocks,
  getElementsByState,
  getElementsByType,
  getElementsNotInState,
  getElementsNotInType,
} from '@/testUtils/mocks/mockElements.ts';
import mockStates from '@/testUtils/mocks/mockStates.ts';
import mockTypes from '@/testUtils/mocks/mockTypes.ts';
import { Display } from '@/types/atomeq-table.ts';
import { Element as AtomeqElementClass, ElementBlock, type IElement } from '@/types/element.ts';
import AtomeqTable from '@/views/AtomeqTable.vue';
import {
  apiService,
  expectFadedOnElements,
  generateAxiosResponse,
  retrieveElementsByIds,
  retrieveElementsNotInIds,
} from '@/vitest.setup';
import { flushPromises, mount, type VueWrapper } from '@vue/test-utils';
import type { AxiosResponse } from 'axios';
import { beforeEach, describe, expect, it } from 'vitest';
import { nextTick } from 'vue';

const mountComponent = async () => {
  const wrapper = mount(AtomeqTable);
  await flushPromises();
  return wrapper;
};

describe('AtomeqTable', () => {
  beforeEach(() => {
    apiService.fetchTypes.mockResolvedValue(generateAxiosResponse(mockTypes.data));
    mockFetchElements(mockElements.data);
  });

  it('will call endpoint and render all the elements on the screen', async () => {
    const elements = mockElements.data;
    const wrapper = await mountComponent();

    expect(apiService.fetchElements).toHaveBeenCalled();
    elements.forEach((element) => {
      expect(wrapper.text()).toContain(element.symbol);
    });
  });

  describe('AtomeqTable is displaying the correct colour based on display type', () => {
    beforeEach(() => {
      const element = mockElements.data[0];
      mockFetchElements([element]);
    });

    it('will display elements colour by type as default', async () => {
      const target = new AtomeqElementClass(mockElements.data[0]);
      const wrapper = await mountComponent();

      expect(wrapper.findComponent(AtomeqElement).classes()).toContain(target.typeColour);
    });

    it.each([
      ['state-display', 'stateColour'],
      ['type-display', 'typeColour'],
      ['block-display', 'blockColour'],
    ])(
      'will display elements colour by %s when the corresponding radio button is clicked',
      async (display, key) => {
        const target = new AtomeqElementClass(mockElements.data[0]);
        const wrapper = await mountComponent();

        await wrapper.find(`label[aria-label="${display}"]`).trigger('click');

        expect(wrapper.findComponent(AtomeqElement).classes()).toContain(
          target[key as keyof IElement],
        );
      },
    );
  });

  it('will display an element details modal when an element is clicked', async () => {
    mockFetchElements([mockElements.data[0]]);
    const wrapper = await mountComponent();

    const elementModalComponent = wrapper.findComponent(AtomeqElementModal);

    expect(elementModalComponent.props().show).toBe(false);

    await wrapper.findComponent(AtomeqElement).trigger('click');

    expect(elementModalComponent.props().show).toBe(true);
  });

  it('will not display type legend when its on state display', async () => {
    const wrapper = await mountComponent();

    const [, stateButton] = wrapper.findAllComponents({ name: 'AtomeqRadioInput' });

    await stateButton.trigger('click');

    expect(wrapper.findComponent(AtomeqTypeLegend).exists()).toBe(false);
  });

  it('will highlight the correct elements by type when the type is hovered in type legend', async () => {
    const nobleGas = mockTypes.data.find((item) => item.name === 'noble-gas');

    const nobleGasIds = getElementsByType([nobleGas!.id]).map((item) => item.id);
    const nonNobleGasIds = getElementsNotInType([nobleGas!.id]).map((item) => item.id);

    const wrapper = await mountComponent();

    const typeLegend = wrapper.findComponent(AtomeqTypeLegend);
    typeLegend.vm.$emit('hover', nobleGas);
    await nextTick();

    const highlightedElements = retrieveElementsByIds(wrapper, nobleGasIds);
    const fadedElements = retrieveElementsByIds(wrapper, nonNobleGasIds);

    expectFadedOnElements(highlightedElements, false);
    expectFadedOnElements(fadedElements);
  });

  it('will highlight the correct elements by state when the state is hovered in state legend', async () => {
    const gas = mockStates.data[0];

    const gasIds = getElementsByState([gas!.id]).map((item) => item.id);
    const nonGasIds = getElementsNotInState([gas!.id]).map((item) => item.id);

    const wrapper = await mountComponent();

    await switchDisplays(wrapper, Display.STATE);

    const stateLegend = wrapper.findComponent(AtomeqStateLegend);
    stateLegend.vm.$emit('hover', gas);
    await nextTick();

    const highlightedElements = retrieveElementsByIds(wrapper, gasIds);
    const fadedElements = retrieveElementsByIds(wrapper, nonGasIds);

    expectFadedOnElements(highlightedElements, false);
    expectFadedOnElements(fadedElements);
  });

  it('will highlight the correct elements by block when the block is hovered in block legend', async () => {
    const sBlockIds = getElementsByBlocks([ElementBlock.S]).map((item) => item.id);
    const nonSBlockIds = getElementsByBlocks([ElementBlock.P, ElementBlock.F, ElementBlock.D]).map(
      (item) => item.id,
    );

    const wrapper = await mountComponent();

    await switchDisplays(wrapper, Display.BLOCK);

    const blockLegend = wrapper.findComponent(AtomeqBlockLegend);
    blockLegend.vm.$emit('hover', ElementBlock.S);
    await nextTick();

    const highlightedElements = retrieveElementsByIds(wrapper, sBlockIds);
    const fadedElements = retrieveElementsByIds(wrapper, nonSBlockIds);

    expectFadedOnElements(highlightedElements, false);
    expectFadedOnElements(fadedElements);
  });

  it('will reset hovered type when hoverLeave is emitted from type legend', async () => {
    const nobleGas = mockTypes.data.find((item) => item.name === 'noble-gas');

    const wrapper = await mountComponent();

    const typeLegend = wrapper.findComponent(AtomeqTypeLegend);
    typeLegend.vm.$emit('hover', nobleGas);
    await nextTick();

    typeLegend.vm.$emit('hoverLeave', nobleGas);
    await nextTick();

    expectFadedOnElements(wrapper.findAllComponents(AtomeqElement), false);
  });

  it('will reset hovered state when hoverLeave is emitted from state legend', async () => {
    const gas = mockStates.data[0];

    const wrapper = await mountComponent();

    await switchDisplays(wrapper, Display.STATE);

    const stateLegend = wrapper.findComponent(AtomeqStateLegend);
    stateLegend.vm.$emit('hover', gas);
    await nextTick();

    stateLegend.vm.$emit('hoverLeave', gas);
    await nextTick();

    expectFadedOnElements(wrapper.findAllComponents(AtomeqElement), false);
  });

  it('will reset hovered block when hoverLeave is emitted from block legend', async () => {
    const wrapper = await mountComponent();

    await switchDisplays(wrapper, Display.BLOCK);

    const blockLegend = wrapper.findComponent(AtomeqBlockLegend);
    blockLegend.vm.$emit('hover', ElementBlock.S);
    await nextTick();

    blockLegend.vm.$emit('hoverLeave', ElementBlock.S);
    await nextTick();

    expectFadedOnElements(wrapper.findAllComponents(AtomeqElement), false);
  });

  it('will persist the highlighted state when the legend type is clicked and deselect previous selected elements on subsequent click', async () => {
    const nobleGas = mockTypes.data.find((item) => item.name === 'noble-gas');

    const wrapper = await mountComponent();

    const typeLegend = wrapper.findComponent(AtomeqTypeLegend);
    typeLegend.vm.$emit('click', nobleGas);
    await nextTick();

    const nobleGasElements = retrieveElementsByIds(wrapper, [nobleGas?.id], 'typeId');
    const otherElements = wrapper
      .findAllComponents(AtomeqElement)
      .filter((item) => item.props('element').typeId !== nobleGas?.id);

    expectFadedOnElements(nobleGasElements, false);
    expectFadedOnElements(otherElements);

    typeLegend.vm.$emit('click', nobleGas);
    await nextTick();

    expectFadedOnElements(nobleGasElements, false);
    expectFadedOnElements(otherElements, false);
  });

  it('will persist the highlighted state when the legend state is clicked and deselect previous selected elements on subsequent click', async () => {
    const gas = mockStates.data[0];

    const wrapper = await mountComponent();

    await switchDisplays(wrapper, Display.STATE);

    const stateLegend = wrapper.findComponent(AtomeqStateLegend);
    stateLegend.vm.$emit('click', gas);
    await nextTick();

    const gasElements = retrieveElementsByIds(wrapper, [gas?.id], 'elementStateId');
    const otherElements = wrapper
      .findAllComponents(AtomeqElement)
      .filter((item) => item.props('element').elementStateId !== gas?.id);

    expectFadedOnElements(gasElements, false);
    expectFadedOnElements(otherElements);

    stateLegend.vm.$emit('click', gas);
    await nextTick();

    expectFadedOnElements(gasElements, false);
    expectFadedOnElements(otherElements, false);
  });

  it('will persist the highlighted block when the legend block is clicked and deselect previous selected elements on subsequent click', async () => {
    const sBlockIds = getElementsByBlocks([ElementBlock.S]).map((item) => item.id);
    const nonSBlockIds = getElementsByBlocks([ElementBlock.P, ElementBlock.F, ElementBlock.D]).map(
      (item) => item.id,
    );

    const wrapper = await mountComponent();

    await switchDisplays(wrapper, Display.BLOCK);

    const blockLegend = wrapper.findComponent(AtomeqBlockLegend);
    blockLegend.vm.$emit('click', ElementBlock.S);
    await nextTick();

    const highlightedElements = retrieveElementsByIds(wrapper, sBlockIds);
    const otherElements = retrieveElementsByIds(wrapper, nonSBlockIds);

    expectFadedOnElements(highlightedElements, false);
    expectFadedOnElements(otherElements);

    blockLegend.vm.$emit('click', ElementBlock.S);
    await nextTick();

    expectFadedOnElements(highlightedElements, false);
    expectFadedOnElements(otherElements, false);
  });

  it('will persist highlighting when an element type is selected and another type is hovered', async () => {
    const nobleGas = mockTypes.data.find((item) => item.name === 'noble-gas');
    const transitionMetal = mockTypes.data.find((item) => item.name === 'transition-metal');

    const wrapper = await mountComponent();

    const typeLegend = wrapper.findComponent(AtomeqTypeLegend);
    typeLegend.vm.$emit('click', nobleGas);
    await nextTick();

    typeLegend.vm.$emit('hover', transitionMetal);
    await nextTick();

    const nobleGasElements = retrieveElementsByIds(wrapper, [nobleGas?.id], 'typeId');
    const transitionMetalElements = retrieveElementsByIds(wrapper, [transitionMetal?.id], 'typeId');

    const otherElements = retrieveElementsNotInIds(
      wrapper,
      [nobleGas?.id, transitionMetal?.id],
      'typeId',
    );

    expectFadedOnElements(nobleGasElements, false);
    expectFadedOnElements(transitionMetalElements, false);
    expectFadedOnElements(otherElements);
  });

  it('will persist highlighting when an element state is selected and another state is hovered', async () => {
    const gas = mockStates.data.find((item) => item.name === 'gas');
    const liquid = mockStates.data.find((item) => item.name === 'liquid');

    const wrapper = await mountComponent();

    await switchDisplays(wrapper, Display.STATE);

    const stateLegend = wrapper.findComponent(AtomeqStateLegend);
    stateLegend.vm.$emit('click', gas);
    await nextTick();

    stateLegend.vm.$emit('hover', liquid);
    await nextTick();

    const gasElements = retrieveElementsByIds(wrapper, [gas?.id], 'elementStateId');
    const liquidElements = retrieveElementsByIds(wrapper, [liquid?.id], 'elementStateId');
    const otherElements = retrieveElementsNotInIds(
      wrapper,
      [gas?.id, liquid?.id],
      'elementStateId',
    );

    expectFadedOnElements(gasElements, false);
    expectFadedOnElements(liquidElements, false);
    expectFadedOnElements(otherElements);
  });

  it('will persist highlighting when an element block is selected and another block is hovered', async () => {
    const sBlockIds = getElementsByBlocks([ElementBlock.S]).map((item) => item.id);
    const pBlockIds = getElementsByBlocks([ElementBlock.P]).map((item) => item.id);
    const otherElementIds = getElementsByBlocks([ElementBlock.F, ElementBlock.D]).map(
      (item) => item.id,
    );

    const wrapper = await mountComponent();

    await switchDisplays(wrapper, Display.BLOCK);

    const blockLegend = wrapper.findComponent(AtomeqBlockLegend);
    blockLegend.vm.$emit('click', ElementBlock.S);
    await nextTick();

    blockLegend.vm.$emit('hover', ElementBlock.P);
    await nextTick();

    const sBlockElements = retrieveElementsByIds(wrapper, sBlockIds);
    const pBlockElements = retrieveElementsByIds(wrapper, pBlockIds);
    const otherElements = retrieveElementsByIds(wrapper, otherElementIds);

    expectFadedOnElements(sBlockElements, false);
    expectFadedOnElements(pBlockElements, false);
    expectFadedOnElements(otherElements);
  });

  it('will highlight the children types if the parent type is hovered', async () => {
    const [nonMetal, nobleGas, halogen] = mockTypes.data.filter((item) =>
      ['nonmetal', 'noble-gas', 'halogen'].includes(item.name),
    );

    const wrapper = await mountComponent();

    const typeLegend = wrapper.findComponent(AtomeqTypeLegend);
    typeLegend.vm.$emit('hover', nonMetal);
    await nextTick();

    const nonMetalElements = retrieveElementsByIds(
      wrapper,
      [nonMetal.id, nobleGas.id, halogen.id],
      'typeId',
    );

    const otherElements = retrieveElementsNotInIds(
      wrapper,
      [nonMetal.id, nobleGas.id, halogen.id],
      'typeId',
    );

    expectFadedOnElements(nonMetalElements, false);
    expectFadedOnElements(otherElements);
  });

  it('will reset the previously selected elements when switching between legends', async () => {
    const nobleGas = mockTypes.data.find((item) => item.name === 'noble-gas');

    const wrapper = await mountComponent();

    const typeLegend = wrapper.findComponent(AtomeqTypeLegend);
    typeLegend.vm.$emit('click', nobleGas);
    await nextTick();

    await switchDisplays(wrapper, Display.BLOCK);
    await flushPromises();

    const blockLegend = wrapper.findComponent(AtomeqBlockLegend);
    blockLegend.vm.$emit('click', ElementBlock.S);
    await nextTick();

    const sBlockIds = getElementsByBlocks([ElementBlock.S]).map((item) => item.id);
    const sBlockElements = retrieveElementsByIds(wrapper, sBlockIds);

    const otherElements = wrapper
      .findAllComponents(AtomeqElement)
      .filter(
        (item) =>
          item.props('element').typeId !== nobleGas?.id &&
          !sBlockIds.includes(item.props('element').id),
      );

    expectFadedOnElements(sBlockElements, false);
    expectFadedOnElements(otherElements);
  });
});

const switchDisplays = async (wrapper: VueWrapper, type: Display) => {
  const switchDisplay = wrapper.findComponent(SwitchDisplay);
  switchDisplay.vm.$emit('update:modelValue', type);
  await switchDisplay.trigger('click');
  await nextTick();
};

const mockFetchElements = (data: IElement[] = []) => {
  const response = { data };
  apiService.fetchElements.mockResolvedValue(response as AxiosResponse);
};
