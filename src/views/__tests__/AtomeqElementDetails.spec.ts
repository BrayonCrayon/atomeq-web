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

    // TODO: loop over all the properties of an element and assert that they are displayed
    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.html()).toContain(element.name);
  });
});
