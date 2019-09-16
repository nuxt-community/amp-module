const Plugin = require('../lib/amp/plugin')

describe('Plugin', () => {
  let proto, route
  const inject = (name, value) => {
    proto[name] = value
  }
  beforeEach(() => {
    proto = {}
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
  })

  it('Inject `isAMP` and `ampMode`', () => {
    Plugin.default({ route }, inject)
    expect(proto).toHaveProperty('isAMP')
    expect(proto).toHaveProperty('ampMode')
  })

  it('Do nothing if matched routes are empty', () => {
    route.matched = []
    Plugin.default({ route }, inject)
    expect(proto.isAMP).toBeUndefined()
    expect(proto.ampMode).toBeUndefined()
  })

  it('Detect non AMP page', () => {
    Plugin.default({ route }, inject)
    expect(proto.isAMP).toEqual(false)
    expect(proto.ampMode).toEqual(false)
  })

  it('Detect AMP from route meta', () => {
    route.meta.amp = 'only'
    Plugin.default({ route }, inject)
    expect(proto.isAMP).toEqual(true)
    expect(proto.ampMode).toEqual('only')
  })

  it('Detect AMP from route component options', () => {
    route.matched[0].components.default.options.amp = 'only'
    Plugin.default({ route }, inject)
    expect(proto.isAMP).toEqual(true)
    expect(proto.ampMode).toEqual('only')
  })

  it('Detect non AMP from route component options', () => {
    route.matched[0].components.default.options.amp = false
    Plugin.default({ route }, inject)
    expect(proto.isAMP).toEqual(false)
    expect(proto.ampMode).toEqual(false)
  })
})
