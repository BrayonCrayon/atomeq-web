import AtomeqTypeLegend from '@/components/AtomeqTypeLegend.vue';
import { elementTypeFactory } from '@/testUtils/elementTypeFactory.ts';
import { apiService } from '@/vitest.setup.ts';
import { flushPromises, mount } from '@vue/test-utils';
import type { AxiosResponse } from 'axios';
import { describe, it, expect } from 'vitest';

describe('AtomeqTypeLegend', () => {
  it('calls the api to retrieve all data on element type hierarchy', () => {
    const response = { data: { data: [] } };
    apiService.fetchTypes.mockResolvedValue(response as AxiosResponse);
    mount(AtomeqTypeLegend);

    expect(apiService.fetchTypes).toHaveBeenCalled();
  });

  // TODO: is it an issue that we are not constructing the response to match what it would be in the
  //          real world scenario since we are mocking out the entire api layer and
  //          as a result we are never hitting the removeDataLayer() function
  it('renders out all parent types and subtypes', async () => {
    const familyBundle = [];
    const parent = elementTypeFactory();
    familyBundle.push(parent);
    const child = elementTypeFactory({ parentId: parent.id });
    familyBundle.push(child);

    const response = { data: familyBundle };
    apiService.fetchTypes.mockResolvedValue(response as AxiosResponse);

    const wrapper = mount(AtomeqTypeLegend);

    await flushPromises();

    const types = wrapper.findAll('div');

    expect(types.length).toEqual(2);
    expect(types[0].html()).toContain(parent.name);
    expect(types[1].html()).toContain(child.name);
  });
});
