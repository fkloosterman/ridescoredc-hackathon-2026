import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import EventInfo from './EventInfo.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'home-hero-after': () => h(EventInfo),
      'home-features-before': () =>
        h('h2', { class: 'choose-track', id: 'choose-your-track' }, 'Choose your track')
    })
  }
}
