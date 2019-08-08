module.exports = {
    title: 'AMP Module',
    description: 'AMP Module for Nuxt',
    themeConfig: {
      repo: 'nuxt-community/amp-module',
      docsDir: 'docs',
      editLinks: true,
      editLinkText: 'Edit this page on GitHub',
      sidebarDepth: 2,
      sidebar: {
        '/api/': [
          '/api/options',
          '/api/amp-elements',
          '/api/components'
        ],
        '/': [
          {
            title: 'Guide',
            collapsable: false,
            children: [
              '/',
              '/guide/setup',
              '/guide/middleware',
              '/guide/usage',
              '/guide/styling',
            ]
          }
        ],
      },
      nav: [
        {
          text: 'Guide',
          link: '/'
        },
        {
          text: 'API',
          link: '/api/'
        }
      ]
    }
  }
  