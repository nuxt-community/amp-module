const Plugin = require('../lib/runtime/plugin')

describe('Plugin', () => {
  let route, ctx
  const inject = (name, value) => {
    ctx.app[`$${name}`] = value
  }
  beforeEach(() => {
    route = {
      meta: {},
      path: '/',
      matched: [
        {
          components: {
            default: {
              options: {}
            }
          }
        }
      ]
    }
    ctx = {
      route,
      app: {}
    }
  })

  it('Inject `isAMP` and `ampMode`', () => {
    const result = Plugin.default(ctx, {})
    expect(result).toHaveProperty('isAMP')
    expect(result).toHaveProperty('ampMode')
  })

  it('Do nothing if matched routes are empty', () => {
    route.matched = []
    Plugin.default(ctx, {})
    expect(ctx.app.$isAMP).toBeUndefined()
    expect(ctx.app.$ampMode).toBeUndefined()
  })

  it('Detect non AMP page', () => {
    const result = Plugin.default(ctx, inject)
    expect(result.isAMP).toEqual(false)
    expect(result.ampMode).toEqual(false)
  })

  it('Detect non AMP from route meta (hybrid)', () => {
    route.meta.amp = 'hybrid'
    const result = Plugin.default(ctx, inject)
    expect(result.isAMP).toEqual(false)
    expect(result.ampMode).toEqual('hybrid')
  })

  it('Detect AMP from route meta (only)', () => {
    route.meta.amp = 'only'
    const result = Plugin.default(ctx, inject)
    expect(result.isAMP).toEqual(true)
    expect(result.ampMode).toEqual('only')
  })

  it('Detect AMP from route meta (hybrid)', () => {
    route.meta.amp = 'hybrid'
    route.path = '/amp'
    const result = Plugin.default(ctx, inject)
    expect(result.isAMP).toEqual(true)
    expect(result.ampMode).toEqual('hybrid')
  })

  it('Detect AMP from route component options', () => {
    route.matched[0].components.default.options.amp = 'only'
    const result = Plugin.default(ctx, inject)
    expect(result.isAMP).toEqual(true)
    expect(result.ampMode).toEqual('only')
  })

  it('Detect non AMP from route component options', () => {
    route.matched[0].components.default.options.amp = false
    const result = Plugin.default(ctx, inject)
    expect(result.isAMP).toEqual(false)
    expect(result.ampMode).toEqual(false)
  })

  it('Evaluate ampLayout option', () => {
    ctx.app.$isAMP = true
    route.matched[0].components.default.options.amp = 'only'
    route.matched[0].components.default.options.ampLayout = function () {
      return 'custom.amp.layout'
    }
    Plugin.default(ctx, inject)
    expect(route.matched[0].components.default.options.layout(ctx)).toEqual('custom.amp.layout')
  })

  it('Evaluate layout option (AMP)', () => {
    route.matched[0].components.default.options.amp = 'only'
    route.matched[0].components.default.options.layout = function () {
      return 'custom.amp.layout'
    }
    Plugin.default(ctx, inject)
    expect(route.matched[0].components.default.options.layout(ctx)).toEqual('custom.amp.layout')
  })

  it('Evaluate layout option (non AMP)', () => {
    route.matched[0].components.default.options.amp = 'hybrid'
    route.matched[0].components.default.options.layout = function () {
      return 'custom.amp.layout'
    }
    Plugin.default(ctx, inject)
    expect(route.matched[0].components.default.options.layout(ctx)).toEqual('custom.amp.layout')
  })
})
