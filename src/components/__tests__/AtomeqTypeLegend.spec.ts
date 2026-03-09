import AtomeqTypeLegend from '@/components/AtomeqTypeLegend.vue';
import { elementTypeFactory } from '@/testUtils/elementTypeFactory.ts';
import type { AtomeqElementType } from '@/types/elementType.ts';
import { transformElementType } from '@/types/utils.ts';
import { apiService } from '@/vitest.setup.ts';
import { flushPromises, mount } from '@vue/test-utils';
import type { AxiosResponse } from 'axios';
import { describe, it, expect } from 'vitest';

const setupTest = (): AtomeqElementType[] => {
  const familyBundle: AtomeqElementType[] = [];
  const parent = transformElementType(elementTypeFactory({ parentId: null }));
  familyBundle.push(parent);
  const child = transformElementType(elementTypeFactory({ parentId: parent.id }));
  familyBundle.push(child);

  return familyBundle;
};

const mountComponent = () => {
  return mount(AtomeqTypeLegend, {
    props: {
      selectedTypes: [],
    },
  });
};

describe('AtomeqTypeLegend', () => {
  it('calls the api to retrieve all data on element type hierarchy', () => {
    const response = { data: [] };
    apiService.fetchTypes.mockResolvedValue(response as AxiosResponse);
    mountComponent();

    expect(apiService.fetchTypes).toHaveBeenCalled();
  });

  it('renders out all parent types and subtypes', async () => {
    const bundle = setupTest();
    const [parent, child] = bundle;
    const response = { data: bundle };
    apiService.fetchTypes.mockResolvedValue(response as AxiosResponse);

    const wrapper = mountComponent();

    await flushPromises();

    const parentElement = wrapper.find(`#parent-${parent.id}`);
    const childElement = wrapper.find(`#child-${child.id}`);

    expect(parentElement.exists()).toBeTruthy();
    expect(parentElement.html()).toContain(parent.name);
    expect(childElement.exists()).toBeTruthy();
    expect(childElement.html()).toContain(child.name);
  });

  it.each([
    ['mouseover', 'hover'],
    ['mouseleave', 'hoverLeave'],
    ['click', 'click'],
  ])('emits an event when an element %s is triggered', async (eventTrigger, expectedEvent) => {
    const bundle = setupTest();
    const [parent, child] = bundle;

    const response = { data: bundle };
    apiService.fetchTypes.mockResolvedValue(response as AxiosResponse);

    const wrapper = mountComponent();

    await flushPromises();

    const parentElement = wrapper.find(`#parent-${parent.id}`);
    await parentElement.trigger(eventTrigger);

    const childElement = wrapper.find(`#child-${child.id}`);
    await childElement.trigger(eventTrigger);

    expect(wrapper.emitted(expectedEvent)).toBeDefined();
    expect(wrapper.emitted(expectedEvent)).toHaveLength(2);
    expect(wrapper.emitted(expectedEvent)![0]).toContainEqual(parent);
    expect(wrapper.emitted(expectedEvent)![1]).toContainEqual(child);
  });
});
