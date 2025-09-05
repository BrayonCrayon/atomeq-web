import { describe, expect, it } from 'vitest'
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

  it('will render a different content if the default slot is used', async () => {
    const options = ["one", "two", "options"]
    const wrapper = mount(AtomeqDropdown, {
      props: {
        buttonTitle: "And I am button title!",
        options
      },
      slots: {
        default: "<li>Link!</li>"
      }
    })

    const button = wrapper.find('button')
    expect(button.exists()).toBeTruthy()

    await button.trigger('click')

    expect(wrapper.find("li").exists()).toBeTruthy()
    expect(wrapper.find("li").text()).toEqual("Link!")

    options.forEach((option) => {
      expect(wrapper.text()).not.toContain(option)
    })
  })
})
