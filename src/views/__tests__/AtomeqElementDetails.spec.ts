import { describe, it, expect } from 'vitest';
import { elementFactory } from '@/testUtils/elementFactory.ts';
import { mount } from '@vue/test-utils';
import AtomeqElementDetails from '@/components/AtomeqElementDetails.vue';
import { AtomeqElement } from '@/types/element.ts';

describe('AtomeqElementDetails', () => {
  it('will display all the information about the element', () => {
    const element = elementFactory();
    const wrapper = mount(AtomeqElementDetails, {
      props: { element: new AtomeqElement(element) },
    });

    Object.entries(element)
      .filter(([_, value]) => typeof value !== 'object')
      .filter(([key]) => !['elementStateId', 'id', 'typeId'].includes(key))
      .forEach((property) => {
        expect(wrapper.html()).toContain(property[1]);
      });

    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.html()).toContain(element.name);
  });
});
