
import VueMeta from 'vue-meta'
import './components'

const [vueMetaMajor] = VueMeta.version.split('.')

function ensureKey (obj, key, d) {
  if (!obj[key]) {
    obj[key] = d
  }
}

function pick (...args) {
  for (const arg of args) {
    if (arg !== undefined) {
      return arg
    }
  }
}

export default function (ctx, inject) {
  const { route, req } = ctx
  if (!route.matched[0]) {
    return
  }

  const { options } = route.matched[0].components.default

  let ampMode = pick(
    options.amp,
    route.meta.amp,
    '<%= options.mode %>'
  )

  let isAMP = false

  switch (ampMode) {
    case true:
    case 'only':
      isAMP = true
      ampMode = 'only'
      break
    case 'hybrid':
      isAMP = route.path === '/amp' || route.path.indexOf('/amp/') === 0
      ampMode = 'hybrid'
      break
    case false:
    default:
      isAMP = false
      ampMode = false
      break
  }

  const $request = req || {}
  /**
   * This will use to detect amp request on render hook
   */
  $request.isAMP = isAMP
  ctx.$isAMP = isAMP

  inject('req', $request)
  inject('isAMP', isAMP)
  inject('ampMode', ampMode)

  if (ampMode !== false && !options._amp) {
    options.head = createCustomHead(options.head)
    options.layout = createCustomLayout(ctx, options, isAMP)
    options._amp = true
  }
}

const createCustomHead = originalHead => function customHead () {
  let origin
  if (process.server) {
    origin = '<%= options.origin %>'
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

  if (origin && !head.link.find(l => l.rel === 'canonical' || l.hid === 'canonical')) {
    const path = this.$isAMP && this.$ampMode !== 'only'
      ? this.$route.fullPath.replace(/^\/amp(\/.*)?/, '$1')
      : this.$route.fullPath

    head.link.push({
      rel: 'canonical',
      hid: 'canonical',
      href: origin + path
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
  if (this.$ampMode !== false && this.$isAMP === false) {
    if (!head.link.find(l => l.rel === 'amphtml' || l.hid === 'amphtml')) {
      const ampPrefix = this.$ampMode === 'only' ? '' : '/amp'
      head.link.push({
        rel: 'amphtml',
        hid: 'amphtml',
        href: origin + ampPrefix + this.$route.fullPath
      })
    }
  }

  return head
}

function createCustomLayout (ctx, options, isAMP) {
  let layout

  if (isAMP && options.ampLayout) {
    layout = options.ampLayout
    if (typeof layout === 'function') {
      layout = layout.call(this, ctx)
    }
    return layout
  }

  layout = options.layout || 'default'
  if (typeof layout === 'function') {
    layout = layout.call(this, ctx)
  }
  return isAMP ? layout + '.amp' : layout
}
