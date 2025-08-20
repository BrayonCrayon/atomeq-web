import Layout from '@/layouts/Layout.vue';
import { describe, it, expect} from "vitest";
import {mount} from "@vue/test-utils";

describe('Layout', () => {
  it('will render out navigation, content and footer sections', () => {
    const nav = '<nav>Nav</nav>'
    const content = '<div>Content</div>'
    const footer = '<footer>Footer</footer>'

    const wrapper = mount(Layout, {
      slots: {
        nav,
        content,
        footer
      }
    });

    expect(wrapper.html()).toContain(nav)
    expect(wrapper.html()).toContain(content)
    expect(wrapper.html()).toContain(footer)
  });
})
