import VueI18n from 'vue-i18n'
import messages from './index.js'

export default ({ app, store, Vue }) => {
  Vue.use(VueI18n)

  // Set i18n instance on app
  app.i18n = new VueI18n({
    locale: 'zh',
    fallbackLocale: 'zh',
    messages
  })
}
