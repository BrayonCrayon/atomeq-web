import AtomeqElement from '@/components/AtomeqElement.vue';
import { elementFactory } from '@/testUtils/elementFactory.ts';
import { transformElement } from '@/types/utils.ts';
import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';

describe('AtomeqElement', () => {
  it('will fade the element when faded prop is true', () => {
    const element = transformElement(elementFactory());
    const wrapper = mount(AtomeqElement, {
      props: {
        element,
        faded: true,
      },
    });

    expect(wrapper.find('div').classes()).toContain('faded');
  });
});
