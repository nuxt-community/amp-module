const Plugin = require('../lib/amp/plugin')

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
    Plugin.default(ctx, inject)
    expect(ctx.app).toHaveProperty('$isAMP')
    expect(ctx.app).toHaveProperty('$ampMode')
  })

  it('Do nothing if matched routes are empty', () => {
    route.matched = []
    Plugin.default(ctx, inject)
    expect(ctx.app.$isAMP).toBeUndefined()
    expect(ctx.app.$ampMode).toBeUndefined()
  })

  it('Detect non AMP page', () => {
    Plugin.default(ctx, inject)
    expect(ctx.app.$isAMP).toEqual(false)
    expect(ctx.app.$ampMode).toEqual(false)
  })

  it('Detect non AMP from route meta (hybrid)', () => {
    route.meta.amp = 'hybrid'
    Plugin.default(ctx, inject)
    expect(ctx.app.$isAMP).toEqual(false)
    expect(ctx.app.$ampMode).toEqual('hybrid')
  })

  it('Detect AMP from route meta (only)', () => {
    route.meta.amp = 'only'
    Plugin.default(ctx, inject)
    expect(ctx.app.$isAMP).toEqual(true)
    expect(ctx.app.$ampMode).toEqual('only')
  })

  it('Detect AMP from route meta (hybrid)', () => {
    route.meta.amp = 'hybrid'
    route.path = '/amp'
    Plugin.default(ctx, inject)
    expect(ctx.app.$isAMP).toEqual(true)
    expect(ctx.app.$ampMode).toEqual('hybrid')
  })

  it('Detect AMP from route component options', () => {
    route.matched[0].components.default.options.amp = 'only'
    Plugin.default(ctx, inject)
    expect(ctx.app.$isAMP).toEqual(true)
    expect(ctx.app.$ampMode).toEqual('only')
  })

  it('Detect non AMP from route component options', () => {
    route.matched[0].components.default.options.amp = false
    Plugin.default(ctx, inject)
    expect(ctx.app.$isAMP).toEqual(false)
    expect(ctx.app.$ampMode).toEqual(false)
  })

  it('Evaluate ampLayout option', () => {
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
    expect(route.matched[0].components.default.options.layout(ctx)).toEqual('custom.amp.layout.amp')
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
