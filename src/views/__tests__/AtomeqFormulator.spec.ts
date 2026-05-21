import { flushPromises, mount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import AtomeqFormulator from '@/views/AtomeqFormulator.vue';
import FormulaEditor from '@/components/FormulaEditor.vue';
import { apiService, generateAxiosResponse } from '@/vitest.setup.ts';

describe('AtomeqFormulator', () => {
  beforeEach(() => {
    apiService.postEquation.mockResolvedValue(generateAxiosResponse(''));
  });

  it('sends equation to API on calculateEquation event', () => {
    const equation = 'H2 + O2 = H2O';
    const wrapper = mount(AtomeqFormulator);

    const editor = wrapper.findComponent(FormulaEditor);
    editor.vm.$emit('calculateEquation', equation);

    expect(apiService.postEquation).toHaveBeenCalledWith(equation);
  });

  it('will display solution of equation when returned from response', async () => {
    const equation = 'H2 + O2 = ';
    const solution = '2H2 + O2 = 2H2O';
    apiService.postEquation.mockResolvedValue(generateAxiosResponse(solution));
    const wrapper = mount(AtomeqFormulator);

    const editor = wrapper.findComponent(FormulaEditor);
    editor.vm.$emit('calculateEquation', equation);
    await flushPromises();

    expect(wrapper.html()).toContain(solution);
  });
});
