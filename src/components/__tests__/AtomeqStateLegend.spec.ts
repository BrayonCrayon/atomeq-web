import AtomeqStateLegend from '@/components/AtomeqStateLegend.vue';
import { elementStateFactory } from '@/testUtils/elementStateFactory.ts';
import { apiService, generateAxiosResponse } from '@/vitest.setup.ts';
import { flushPromises, mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';

const mountComponent = () => {
  return mount(AtomeqStateLegend, {
    props: {
      selectedStates: [],
    },
  });
};

describe('AtomeqStateLegend', () => {
  it('calls the api to retrieve all data on element state', () => {
    apiService.fetchStates.mockResolvedValue(generateAxiosResponse([]));
    mountComponent();

    expect(apiService.fetchStates).toHaveBeenCalled();
  });

  it.each([
    ['mouseover', 'hover'],
    ['mouseleave', 'hoverLeave'],
    ['click', 'click'],
  ])('emits an event when an element %s is triggered', async (eventTrigger, expectedEvent) => {
    const state = elementStateFactory();
    apiService.fetchStates.mockResolvedValue(generateAxiosResponse([state]));

    const wrapper = mountComponent();

    await flushPromises();

    const stateElement = wrapper.find(`#state-${state.id}`);
    await stateElement.trigger(eventTrigger);

    expect(wrapper.emitted(expectedEvent)).toBeDefined();
    expect(wrapper.emitted(expectedEvent)![0]).toContainEqual(state);
  });
});
