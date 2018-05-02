import Vue from 'vue'
import VueI18n from 'vue-i18n'
import messages from './index.js'

Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: 'zh',
  fallbackLocale: 'zh',
  messages
})

export default i18n
