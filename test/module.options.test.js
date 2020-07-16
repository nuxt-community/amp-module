jest.setTimeout(60000)

const { Nuxt, Builder } = require('nuxt-edge')
const getPort = require('get-port')

const defaultConfig = require('../example/nuxt.config')
const { isValid } = require('./utils')

let nuxt, port

const url = path => `http://localhost:${port}${path}`

beforeAll(async () => {
  port = await getPort({ port: getPort.makeRange(3000, 3100) })
  const config = {
    ...defaultConfig,
    dev: false,
    amp: {
      ...(defaultConfig.amp || {}),
      origin: `http://localhost:${port}`,
      tags: {
        'amp-mustache': { version: '0.1' }
      }
    }
  }
  nuxt = new Nuxt(config)
  await nuxt.ready()
  await new Builder(nuxt).build()
  await nuxt.listen(port)
})

afterAll(async () => {
  await nuxt.close()
})

describe('Change amp-mustache version', () => {
  let source
  beforeAll(async () => {
    const response = await page.goto(url('/amp'))

    source = await response.text()
  })

  test('Valid AMP structure', async () => {
    expect(await isValid(source)).toEqual(true)
  })

  test('to 0.1', () => {
    expect(source).toContain('amp-mustache-0.1.js')
  })
})
