const { resolve } = require('path')

module.exports = {
  rootDir: resolve(__dirname, '..'),
  buildDir: resolve(__dirname, '.nuxt'),
  srcDir: __dirname,
  render: {
    resourceHints: false
  },
  css: [
    '~/assets/styles/default.scss'
  ],
  build: {
    extractCSS: true
  },
  modules: [
    [
      // Simple usage
      '@nuxtjs/amp',
  
      // With options
      ['@nuxtjs/amp', { /* module options */ }]
    ],
    ['nuxt-i18n', {
      locales: ['en', 'fr'],
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
    }],
    { handler: require('../') }
  ],
  amp: {
    css: '~/assets/styles/amp-custom.scss',
    origin: 'http://localhost:3000'
  }
}
