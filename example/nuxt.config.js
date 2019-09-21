const { resolve } = require('path')

module.exports = {
  rootDir: resolve(__dirname, '..'),
  buildDir: resolve(__dirname, '.nuxt'),
  srcDir: __dirname,
  render: {
    resourceHints: false
  },
  modules: [
    [ 'nuxt-i18n', {
      locales: [ 'en', 'fr' ],
      defaultLocale: 'en',
      vueI18n: {
        fallbackLocale: 'en',
        messages: {
          en: {
            welcome: 'Welcome'
          },
          fr: {
            welcome: 'Bienvenue'
          }
        }
      }
    } ],
    { handler: require('../') }
  ],
  amp: {
    origin: 'http://localhost:3000'
  }
}
