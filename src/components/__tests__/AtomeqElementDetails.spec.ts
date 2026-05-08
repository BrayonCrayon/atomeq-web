import { describe, it, expect } from 'vitest';
import { elementFactory } from '@/testUtils/elementFactory.ts';
import { mount } from '@vue/test-utils';
import AtomeqElementDetails from '@/components/AtomeqElementDetails.vue';
import { Element, type IElementKey } from '@/types/element.ts';
import { elements } from '@/testUtils/mocks/mockElements.ts';
import AtomeqBadge from '@/components/common/AtomeqBadge.vue';
import { Variant } from '@/types/common.ts';

describe('AtomeqElementDetails', () => {
  it('will display all the information about the element', () => {
    const element = elementFactory();
    const wrapper = mount(AtomeqElementDetails, {
      props: { element: new Element(element) },
    });

    Object.entries(element)
      .filter(([_, value]) => typeof value !== 'object' && typeof value !== 'boolean')
      .filter(([key]) => !['elementStateId', 'id', 'typeId'].includes(key))
      .forEach((property) => {
        expect(wrapper.html()).toContain(property[1]);
      });

    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.html()).toContain(element.name);
  });

  it.each([
    ['Metalloid', 'metalloid'],
    ['Metal', 'metal'],
    ['Natural', 'natural'],
    ['Radioactive', 'radioactive'],
  ])('will display element information for booleans %s', async (text, parameter) => {
    const element = new Element(elements.data[0]);
    const wrapper = mount(AtomeqElementDetails, {
      props: { element: element },
    });

    const badge = wrapper
      .findAllComponents(AtomeqBadge)
      .find((item) => item.props('text').includes(text));

    expect(badge).toBeDefined();
    expect(badge!.props('variant')).toEqual(
      element[parameter as IElementKey] ? Variant.SUCCESS : Variant.DANGER,
    );
  });
});
