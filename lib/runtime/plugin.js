import VueMeta from 'vue-meta'

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

export default function (ctx, { origin, mode }) {
  const { route, req } = ctx
  if (!route.matched[0]) {
    return
  }
  const hasAMPPrefix = route.path === '/m' || route.path.includes('/m/')
  const { options } = route.matched[0].components.default
  const metaAMP = Array.isArray(route.meta) ? route.meta[0].amp : route.meta.amp

  let ampMode = pick(
    options.amp,
    metaAMP,
    mode
  )

  let isAMP = false

  switch (ampMode) {
    case true:
    case 'only':
      isAMP = true
      ampMode = 'only'
      if (options.amp && hasAMPPrefix) {
        return ctx.error({ statusCode: 404, message: 'This page could not be found' })
      }
      break
    case 'hybrid':
      isAMP = hasAMPPrefix
      ampMode = 'hybrid'
      break
    case false:
    default:
      isAMP = false
      ampMode = false
      if (hasAMPPrefix) {
        ctx.error({ statusCode: 404, message: 'This page could not be found' })
      }
      break
  }

  if (ampMode !== false && !options._amp) {
    options.head = createCustomHead(options.head, origin)
    options.layout = createCustomLayout(options.layout, options.ampLayout)
    options._amp = true
  }
  const _request = req || {}
  _request.isAMP = isAMP
  return {
    /**
     * This will use to detect amp request on render hook
     */
    req: _request,
    isAMP,
    ampMode
  }
}

const createCustomHead = (originalHead, origin) => function customHead () {
  if (!process.server) {
    origin = window.location.origin
  }

  let head
  switch (typeof originalHead) {
    case 'function':
      head = originalHead.call(this)
      break
    case 'object':
      head = { ...originalHead }
      break
    default:
      head = {}
  }

  /**
   * add page canonical
   */
  ensureKey(head, 'link', [])

  /**
   * Add canonical meta and AMP requirement if page is served as AMP
   */
  if (this.$isAMP) {
    ensureKey(head, 'htmlAttrs', {})

    head.htmlAttrs.amp = vueMetaMajor >= 2 ? true : undefined

    ensureKey(head, 'bodyAttrs', {})
    ensureKey(head.bodyAttrs, 'class', '')
    head.bodyAttrs.class += ' __amp'
  }

  // Add amphtml meta only if page has amp counterpart
  if (this.$ampMode !== false && this.$isAMP === false && this.$route.name === 'article-alias') {
    if (!head.link.find(l => l.rel === 'amphtml' || l.hid === 'amphtml')) {
      const ampPrefix = this.$ampMode === 'only' ? '' : 'm/'
      let ampUrl = origin + ampPrefix + this.$route.fullPath
      if (this.$route.meta.ampUrl) {
        ampUrl = this.$route.fullPath.replace(this.$route.meta.ampUrl.originalPrefix, this.$route.meta.ampUrl.ampPrefix)
      }
      head.link.push({
        rel: 'amphtml',
        hid: 'amphtml',
        href: ampUrl
      })
    }
  }

  return head
}

const createCustomLayout = (originalLayout, ampLayout) => function customLayout (ctx) {
  let layout

  if (ctx.app.$isAMP && ampLayout) {
    layout = ampLayout
    if (typeof layout === 'function') {
      layout = layout.call(this, ctx)
    }
    return layout
  }

  layout = originalLayout || 'default'
  if (typeof layout === 'function') {
    layout = layout.call(this, ctx)
  }
  return layout
}
