import AtomeqBlockLegend from '@/components/AtomeqBlockLegend.vue';
import { ElementBlock } from '@/types/element.ts';
import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';

const mountComponent = () => {
  return mount(AtomeqBlockLegend, {
    props: {
      selectedBlocks: [],
    },
  });
};

describe('AtomeqBlockLegend', () => {
  it('will display each block option', () => {
    const blocks = Object.entries(ElementBlock).map(([_, value]) => value);
    const wrapper = mountComponent();

    blocks.forEach((name) => {
      const blockElement = wrapper.find(`#block-${name}`);

      expect(blockElement.exists()).toBeTruthy();
      expect(blockElement.text()).toContain(name);
    });
  });

  it.each([
    ['mouseover', 'hover'],
    ['mouseleave', 'hoverLeave'],
    ['click', 'click'],
  ])('emits an event when an element %s is triggered', async (eventTrigger, expectedEvent) => {
    const blocks = Object.entries(ElementBlock).map(([_, value]) => value);
    const wrapper = mountComponent();

    blocks.forEach(async (name, idx) => {
      const blockElement = wrapper.find(`#block-${name}`);
      await blockElement.trigger(eventTrigger);

      expect(wrapper.emitted(expectedEvent)).toBeDefined();
      expect(wrapper.emitted(expectedEvent)).toHaveLength(blocks.length);
      expect(wrapper.emitted(expectedEvent)![idx]).toContainEqual(name);
    });
  });

  it('will highlight a block element that the user is hovering over it', () => {
    const blocks = Object.entries(ElementBlock).map(([_, value]) => value);
    const wrapper = mountComponent();
    const blockElement = wrapper.find(`#block-${blocks[0]}`);
  });
});
