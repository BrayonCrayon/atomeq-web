import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import AtomeqFormulator from '@/views/AtomeqFormulator.vue';
import FormulaEditor from '@/components/FormulaEditor.vue';
import { apiService } from '@/vitest.setup.ts';

describe('AtomeqFormulator', () => {
  it('sends equation to API on calculateEquation event', () => {
    const equation = 'H2 + O2 = H2O';
    const wrapper = mount(AtomeqFormulator);

    const editor = wrapper.findComponent(FormulaEditor);
    editor.vm.$emit('calculateEquation', equation);

    expect(apiService.postEquation).toHaveBeenCalledWith(equation);
  });
});
