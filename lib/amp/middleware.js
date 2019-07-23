import VueMeta from 'vue-meta'
import { stringify } from 'qs'
import Middleware from '../middleware'

const [vueMetaMajor] = VueMeta.version.split('.')

function ensureKey (obj, key, d) {
  if (!obj[key]) {
    obj[key] = d
  }
}

function stringifyQuery (query) {
  if (!Object.keys(query).length) {
    return ''
  }
  return '?' + stringify(query)
}

Middleware.amp = function ({ route, req, app }) {
  if (!route.matched[0]) {
    return
  }

  const { options } = route.matched[0].components.default

  if (options.amp === false) {
    return
  }

  if (!options._amp) {
    options.head = createCustomHead(options.head)
    options.layout = createCustomLayout(options.layout)
    options._amp = true
  }
}

const createCustomHead = originalHead => function customHead () {
  let origin = process.server ? this.$req.url : window.location
  if (process.server) {
    const schema = 'http://'
    origin = schema + this.$req.headers.host
  } else {
    origin = window.location.origin
  }

  let head
  switch (typeof originalHead) {
    case 'function':
      head = originalHead.call(this)
      break
    case 'object':
      head = { ...originalHead } // TODO
      break
    default:
      head = {}
  }

  /**
   * add page canonical
   */
  ensureKey(head, 'link', [])

  const { amp, ...query } = this.$route.query

  if (!head.link.find(l => l.rel === 'canonical' || l.hid === 'canonical')) {
    head.link.push({
      rel: 'canonical',
      hid: 'canonical',
      href: origin + this.$route.path + stringifyQuery(query)
    })
  }

  /**
   * add amp requirement if page is served as AMP
   */
  if (this.$isAMP) {
    ensureKey(head, 'htmlAttrs', {})

    if (vueMetaMajor >= 2) {
      head.htmlAttrs.amp = true
    } else {
      head.htmlAttrs.amp = undefined
    }

    ensureKey(head, 'bodyAttrs', {})
    ensureKey(head.bodyAttrs, 'class', '')
    head.bodyAttrs.class += ' __amp'
  }

  // check if amp is disabled for this page
  if (this.$ampMode !== false) {
    if (!head.link.find(l => l.rel === 'amphtml' || l.hid === 'amphtml')) {
      const ampPrefix = this.$ampMode === 'only' ? '' : '/amp'
      head.link.push({
        rel: 'amphtml',
        hid: 'amphtml',
        href: origin + ampPrefix + this.$route.path + stringifyQuery(query)
      })
    }
  }

  return head
}

const createCustomLayout = originalLayout => function customLayout (ctx) {
  let layout

  switch (typeof originalLayout) {
    case 'function':
      layout = originalLayout.call(this, ctx)
      break
    case 'string':
      layout = { ...originalLayout }
      break
    default:
      layout = 'default'
      break
  }
  return ctx.app.$isAMP ? layout + '.amp' : layout
}
