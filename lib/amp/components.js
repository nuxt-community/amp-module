import Vue from 'vue'
// @vue/component
const AMPMustache = {
  name: 'AmpMustache',
  render (h) {
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
