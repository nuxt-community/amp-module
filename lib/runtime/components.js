// @vue/component
export const AMPMustache = {
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
