import Vue from 'vue'
import ampPlugin from '~amp/plugin'
import { AMPMustache } from '~amp/components'

Vue.component(AMPMustache.name, AMPMustache)

export default async function (ctx, inject) {
  const result = ampPlugin(ctx, {
    origin: '<%= options.origin %>',
    mode: '<%= options.mode %>'
  })
  if (result) {
    Object.keys(result).forEach(key => inject(key, result[key]))
  }
  <% if (options.css) { %>if (ctx.$isAMP) {
    const { head } = ctx.app
    // Disable sanitizer
    head.__dangerouslyDisableSanitizersByTagID = head.__dangerouslyDisableSanitizersByTagID || {}
    head.__dangerouslyDisableSanitizersByTagID['amp-custom'] = ['cssText']

    const cssText = await import('!!raw-loader<%= options.cssLoader %>!<%= options.css %>').then(m => m.default || m)
    head.style.push({ cssText, type: 'text/css', hid: 'amp-custom' })
  }<% } %>
}
