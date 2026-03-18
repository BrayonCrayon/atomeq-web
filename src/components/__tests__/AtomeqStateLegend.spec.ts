import AtomeqStateLegend from '@/components/AtomeqStateLegend.vue';
import type { ElementState } from '@/types/elementState.ts';
import { apiService } from '@/vitest.setup.ts';
import { flushPromises, mount } from '@vue/test-utils';
import type { AxiosResponse } from 'axios';
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
    const response = { data: [] };
    apiService.fetchStates.mockResolvedValue(response as AxiosResponse);
    mountComponent();

    expect(apiService.fetchStates).toHaveBeenCalled();
  });

  // it.each([
  //   ['mouseover', 'hover'],
  //   ['mouseleave', 'hoverLeave'],
  //   ['click', 'click'],
  // ])('emits an event when an element %s is triggered', async (eventTrigger, expectedEvent) => {
  //   const bundle = setupTest();
  //   const [parent, child] = bundle;
  //
  //   const response = { data: bundle };
  //   apiService.fetchTypes.mockResolvedValue(response as AxiosResponse);
  //
  //   const wrapper = mountComponent();
  //
  //   await flushPromises();
  //
  //   const parentElement = wrapper.find(`#parent-${parent.id}`);
  //   await parentElement.trigger(eventTrigger);
  //
  //   const childElement = wrapper.find(`#child-${child.id}`);
  //   await childElement.trigger(eventTrigger);
  //
  //   expect(wrapper.emitted(expectedEvent)).toBeDefined();
  //   expect(wrapper.emitted(expectedEvent)).toHaveLength(2);
  //   expect(wrapper.emitted(expectedEvent)![0]).toContainEqual(parent);
  //   expect(wrapper.emitted(expectedEvent)![1]).toContainEqual(child);
  // });
});
