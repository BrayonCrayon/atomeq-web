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
});
