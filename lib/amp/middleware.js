import { stringify } from 'qs'
import Middleware from '../middleware'

function ensureKey(obj, key, d) {
  if (!obj[key]) {
    obj[key] = d
  }
}

function stringifyQuery(query) {
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

  if (!options.amp) {
    return
  }

  if (!options._amp) {
    options.head = createCustomHead(options.head)
    options.layout = createCustomLayout(options.layout)
    options._amp = true
  }
}

const createCustomHead = originalHead => function customHead() {
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

  if (this.$isAMP) {
    ensureKey(head, 'htmlAttrs', {})
    head.htmlAttrs['⚡'] = undefined
  }

  ensureKey(head, 'link', [])

  const { amp, ...query } = this.$route.query

  if (!head.link.find(l => l.rel === 'canonical' || l.hid === 'canonical')) {
    head.link.push({
      rel: 'canonical',
      hid: 'canonical',
      href: origin + this.$route.path + stringifyQuery(query)
    })
  }

  if (!head.link.find(l => l.rel === 'amphtml' || l.hid === 'amphtml')) {
    head.link.push({
      rel: 'amphtml',
      hid: 'amphtml',
      href: origin + this.$route.path + stringifyQuery({ ...query, amp: true })
    })
  }

  return head
}

const createCustomLayout = originalLayout => function customLayout(ctx) {
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
  return ctx.app.$isAMP ? layout + '-amp' : layout
}
