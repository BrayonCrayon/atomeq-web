import { describe, expect, it, vi } from 'vitest'
import AtomeqDropdown from '../AtomeqDropdown.vue'
import { mount } from '@vue/test-utils'

describe("AtomeqDropdown", () => {
  it('will render and open the dropdown', async () => {
    const options = ["I", "am", "options"]
    const buttonTitle = "And I am button title!"
    const wrapper = mount(AtomeqDropdown, {
      props: {
        buttonTitle,
        options
      }
    })

    const button = wrapper.find('button')
    expect(button.exists()).toBeTruthy()

    await button.trigger('click')

    options.forEach((option) => {
      expect(wrapper.text()).toContain(option)
    })
  })
})
