module.exports = {
  preset: 'jest-puppeteer',
  collectCoverage: true,
  collectCoverageFrom: [
    'lib/**/*.js',
    '!lib/plugin.js'
  ],
  moduleNameMapper: {
    '^~/(.*)$': '<rootDir>/lib/$1',
    '^~~$': '<rootDir>',
    '^@@$': '<rootDir>',
    '^@/(.*)$': '<rootDir>/lib/$1'
  },
  transform: {
    // process js with `babel-jest`
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest'
  },
  transformIgnorePatterns: [
    '/node_modules/(?!nuxt-i18n).+\\.js$'
  ]
}
