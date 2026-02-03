import AtomeqTypeLegend from '@/components/AtomeqTypeLegend.vue';
import { elementTypeFactory } from '@/testUtils/elementTypeFactory.ts';
import type { AtomeqElementType } from '@/types/elementType.ts';
import { apiService } from '@/vitest.setup.ts';
import { flushPromises, mount } from '@vue/test-utils';
import type { AxiosResponse } from 'axios';
import { describe, it, expect } from 'vitest';

const setupTest = (): AtomeqElementType[] => {
  const familyBundle = [];
  const parent = elementTypeFactory({ parentId: null });
  familyBundle.push(parent);
  const child = elementTypeFactory({ parentId: parent.id });
  familyBundle.push(child);

  return familyBundle;
};

describe('AtomeqTypeLegend', () => {
  it('calls the api to retrieve all data on element type hierarchy', () => {
    const response = { data: [] };
    apiService.fetchTypes.mockResolvedValue(response as AxiosResponse);
    mount(AtomeqTypeLegend);

    expect(apiService.fetchTypes).toHaveBeenCalled();
  });

  it('renders out all parent types and subtypes', async () => {
    const bundle = setupTest();
    const [parent, child] = bundle;
    const response = { data: bundle };
    apiService.fetchTypes.mockResolvedValue(response as AxiosResponse);

    const wrapper = mount(AtomeqTypeLegend);

    await flushPromises();

    const parentElement = wrapper.find(`#parent-${parent.id}`);
    const childElement = wrapper.find(`#child-${child.id}`);

    expect(parentElement.exists()).toBeTruthy();
    expect(parentElement.html()).toContain(parent.name);
    expect(childElement.exists()).toBeTruthy();
    expect(childElement.html()).toContain(child.name);
  });
  // TODO: Refactor last two tests to use .each(....)(..)
  it('emits an event when an element is hovered', async () => {
    const bundle = setupTest();
    const [parent, child] = bundle;

    const response = { data: bundle };
    apiService.fetchTypes.mockResolvedValue(response as AxiosResponse);

    const wrapper = mount(AtomeqTypeLegend);

    await flushPromises();

    const parentElement = wrapper.find(`#parent-${parent.id}`);
    await parentElement.trigger('mouseover');

    const childElement = wrapper.find(`#child-${child.id}`);
    await childElement.trigger('mouseover');

    expect(wrapper.emitted('hover')).toBeDefined();
    expect(wrapper.emitted('hover')).toHaveLength(2);
    expect(wrapper.emitted('hover')![0]).toContainEqual(parent);
    expect(wrapper.emitted('hover')![1]).toContainEqual(child);
  });

  it('will emit a click event when an element is clicked', async () => {
    const bundle = setupTest();
    const [parent, child] = bundle;

    const response = { data: bundle };
    apiService.fetchTypes.mockResolvedValue(response as AxiosResponse);

    const wrapper = mount(AtomeqTypeLegend);

    await flushPromises();

    const parentElement = wrapper.find(`#parent-${parent.id}`);
    await parentElement.trigger('click');

    const childElement = wrapper.find(`#child-${child.id}`);
    await childElement.trigger('click');

    expect(wrapper.emitted('click')).toBeDefined();
    expect(wrapper.emitted('click')).toHaveLength(2);
    expect(wrapper.emitted('click')![0]).toContainEqual(parent);
    expect(wrapper.emitted('click')![1]).toContainEqual(child);
  });
});
