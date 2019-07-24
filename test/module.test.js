jest.setTimeout(60000)

const { Nuxt, Builder } = require('nuxt-edge')
const request = require('request-promise-native')
const getPort = require('get-port')

const config = require('../example/nuxt.config')
const { isValid } = require('./utils')

config.dev = false

let nuxt, port

const url = path => `http://localhost:${port}${path}`
const get = path => request(url(path))

describe('basic', () => {
  beforeAll(async () => {
    nuxt = new Nuxt(config)
    await nuxt.ready()
    await new Builder(nuxt).build()
    port = await getPort()
    await nuxt.listen(port)
  })

  afterAll(async () => {
    await nuxt.close()
  })

  test('Render home page', async () => {
    const html = await get('/amp')

    expect(html).toContain('rel="amphtml"')
    expect(await isValid(html)).toEqual(true)
  })

  test('Render AMP version of home page', async () => {
    const html = await get('/amp')
    expect(html).toContain('AMP is easy')
  })

  test('Render AM Story', async () => {
    const html = await get('/story')
    expect(html).toContain('MARS')
  })
})
