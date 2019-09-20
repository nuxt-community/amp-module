const { readdirSync } = require('fs')
const { resolve, join } = require('path')
const consola = require('consola')
const chalk = require('chalk')
const { getTags, detectTags } = require('./tags')

const logger = consola.withScope('@nuxtjs/amp')

const AMPBoilerplate = '<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>' +
'<script async src="https://cdn.ampproject.org/v0.js"></script>'

const scriptPattern = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi
const ampBodyPattern = /<amp-body[^>]*>([.\S\s]*)<\/amp-body>/

module.exports = function (moduleOptions) {
  const options = {
    cdnBase: undefined,
    origin: '',
    mode: 'hybrid',
    ...this.options.amp,
    ...moduleOptions
  }

  registerPlugin.call(this, options)
  copyAMP.call(this, options)
  registerRendererHook.call(this, options)
  ensureMeta.call(this, options)

  if (this.nuxt.options.dev) {
    registerValidator.call(this, options)
  }

  processRoutes.call(this)
}

function processRoutes () {
  this.extendRoutes((routes) => {
    for (const route of routes) {
      route.meta = route.meta || {}
      route.alias = route.alias || []

      if (route.path === '/amp' || route.path.indexOf('/amp/') === 0) {
        route.meta.amp = true
      } else {
        route.alias = '/amp' + route.path
      }
    }
  })
}

async function registerValidator (options) {
  const amphtmlValidator = require('amphtml-validator')
  const validator = await amphtmlValidator.getInstance()
  this.nuxt.hook('render:route', (url, { html }, { req }) => {
    const isAMP = req.isAMP

    if (isAMP) {
      const result = validator.validateString(html)
      const isValid = result.status === 'PASS'
      logger.log({
        type: result.status,
        message: (isValid ? chalk.green(result.status) : chalk.red(result.status)) + ' ' + url,
        icon: isValid ? chalk.green('✓') : chalk.red('✕')
      })
      for (const error of result.errors) {
        let msg = 'line ' + error.line + ', col ' + error.col + ': ' + error.message
        if (error.specUrl !== null) {
          msg += ' (see ' + error.specUrl + ')'
        }
        logger.log({
          type: error.severity,
          message: msg,
          icon: (error.severity === 'ERROR') ? chalk.bgRed.black(error.severity) : chalk.bgYellow.black(error.severity)
        })
      }
    }
  })
}

function registerRendererHook (options) {
  const tags = getTags({ cdnBase: options.cdnBase })

  this.nuxt.hook('vue-renderer:spa:templateParams', (params) => {
    /**
     * Add isAMP to Nuxt Html template params
     */
    params.isAMP = params.HTML_ATTRS.includes('amp')
  })

  this.nuxt.hook('vue-renderer:ssr:templateParams', (params) => {
    const isAMP = params.HTML_ATTRS.includes('amp')
    /**
     * Add isAMP to Nuxt Html template params
     */
    params.isAMP = isAMP

    if (!isAMP) {
      return
    }

    params.APP = params.APP
      /**
       * - Remove all scripts form response
       * - Scripts of type application/json are allowed
       */
      .replace(scriptPattern, (script) => {
        return script.includes('application/json') ? script : ''
      })

    const AMPBody = ampBodyPattern.exec(params.APP)
    if (AMPBody) {
      params.APP = AMPBody[1]
    }

    params.HEAD = params.HEAD
      .replace(scriptPattern, v => (v.includes('custom-element') || v.includes('application/ld+json')) ? v : '')
      .replace(/<\/style>\S*<style [^>]*>/g, '')
      .replace(/<style/, '<style amp-custom')
      .replace('@charset "UTF-8";', '')

    params.HEAD += AMPBoilerplate

    const usedTags = detectTags(tags, params.APP)

    params.HEAD += usedTags
      .map(t => `<script async custom-${t.isTemplate ? 'template' : 'element'}="${t.script || t.tag}" src="${t.url}"></script>`)
      .join('')
  })
}

function registerPlugin (options) {
  this.addPlugin({
    src: resolve(__dirname, 'amp', 'plugin.js'),
    fileName: join('amp', 'plugin.js'),
    options
  })
}

function copyAMP (options) {
  const coreRoot = resolve(__dirname, 'amp')

  for (const file of readdirSync(coreRoot)) {
    if (file === 'plugin.js') {
      continue
    }
    this.addTemplate({
      src: resolve(coreRoot, file),
      fileName: join('amp', file),
      options
    })
  }
}

function find (arr, key, val) {
  return arr.find(obj => val ? obj[key] === val : obj[key])
}

function ensureMeta () {
  if (!this.options.head) {
    this.options.head = {}
  }

  if (!this.options.head.meta) {
    this.options.head.meta = {}
  }

  // Charset
  if (!find(this.options.head.meta, 'charset')) {
    this.options.head.meta.push({
      hid: 'charset',
      charset: 'utf-8'
    })
  }

  // Viewport
  if (!find(this.options.head.meta, 'name', 'viewport')) {
    this.options.head.meta.push({
      hid: 'viewport',
      name: 'viewport',
      content: 'width=device-width, minimum-scale=1, initial-scale=1, shrink-to-fit=no, user-scalable=0, viewport-fit=cover'
    })
  }
}

module.exports.meta = require('../package.json')
