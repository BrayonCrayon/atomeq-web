import { describe, expect, it } from 'vitest'
import AtomeqNav from '../AtomeqNav.vue'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import router from '@/router'

describe("AtomeqNav", () => {
  it('will open and close navigation when logged out', async () => {
    const wrapper = mount(AtomeqNav, {
      props: {
        isAuthed: false,
      },
      global: {
        plugins: [router]
      }
    });

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

  it('will render appropriate options if the user is logged in', async () => {
    const wrapper = mount(AtomeqNav, {
      props: {
        isAuthed: true,
      },
      global: {
        plugins: [router]
      }
    })

    const atomMenu = wrapper.find('[data-testid="atom-menu"]')
    await atomMenu.trigger('click')
    await nextTick()

    expect(wrapper.text()).not.toContain("Login")
    expect(wrapper.text()).not.toContain("Register")
    expect(wrapper.text()).toContain("User Profile")
    expect(wrapper.text()).toContain("Table")
    expect(wrapper.text()).toContain("Formulator 9000")
    expect(wrapper.text()).toContain("Logout")
  });
})
