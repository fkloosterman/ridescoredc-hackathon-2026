import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'home-features-before': () =>
        h('h2', { class: 'choose-track', id: 'choose-your-track' }, 'Choose your track')
    })
  }
}
