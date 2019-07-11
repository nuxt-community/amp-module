import Vue from 'vue'
import './middleware'

function pick(...args) {
  for (const arg of args) {
    if (arg !== undefined) {
      return arg
    }
  }
}

export default function ({ route, req }, inject) {
  if (!route.matched[0]) {
    return
  }

  const { options } = route.matched[0].components.default

  const ampMode = pick(
    options.amp,
    route.meta.amp,
    'hybrid'
  )

  let isAMP = false

  switch (ampMode) {
    case true:
    case 'only':
      isAMP = true
      break
    case 'hybrid':
      isAMP = route.path === '/amp' || route.path.indexOf('/amp/') === 0
      break
    case false:
    default:
      isAMP = false
      break
  }

  inject('req', req || {})
  inject('isAMP', isAMP)
  inject('ampMode', ampMode)
}

// @vue/component
const AMPMustache = {
  name: 'AmpMustache',
  render(h) {
    return h('template', {
      props: {
        ...this.$props
      },
      attrs: {
        type: 'amp-mustache'
      }
    }, this.$slots.default)
  }
}

Vue.component(AMPMustache.name, AMPMustache)
