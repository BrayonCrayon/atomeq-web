import { describe, expect, vi, it } from 'vitest'
import AtomeqNav from '../AtomeqNav.vue'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'


describe("AtomeqNav", () => {
  it('will open and close navigation', async () => {
    const wrapper = mount(AtomeqNav)

    const atomMenu = wrapper.find('[data-testid="atom-menu"]')
    await atomMenu.trigger('click')
    await nextTick()

    const dropdown = wrapper.find('[data-testid="mobile-dropdown"')
    expect(dropdown.exists()).toBeTruthy()
    expect(dropdown.text()).toContain("Login")
    expect(dropdown.text()).toContain("Register")

    await atomMenu.trigger('click')
    await nextTick()

    expect(wrapper.find('[data-testid="mobile-dropdown"').exists()).toBeFalsy()
  })
})
