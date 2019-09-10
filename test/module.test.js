jest.setTimeout(60000)

const { Nuxt, Builder } = require('nuxt-edge')
const getPort = require('get-port')

const config = require('../example/nuxt.config')
const { isValid } = require('./utils')

config.dev = false

let nuxt, port

const url = path => `http://localhost:${port}${path}`

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

describe('Render home page', () => {
  let info
  beforeAll(async () => {
    await page.goto(url('/'))

    info = await page.evaluate(() => {
      const canonical = document.querySelector('[rel=canonical]')
      const amphtml = document.querySelector('[rel=amphtml]').getAttribute('href')

      return {
        canonical,
        amphtml
      }
    })
  })

  test('Valid amphtml link', () => {
    expect(info.amphtml).toEqual(`http://localhost:${port}/amp/`)
  })
})

describe('Render AMP version of home page', () => {
  let source, info
  beforeAll(async () => {
    const response = await page.goto(url('/amp'))

    info = await page.evaluate(() => {
      const canonical = document.querySelector('[rel=canonical]').getAttribute('href')
      const amphtml = document.querySelector('[rel=amphtml]')

      const detectedTags = [...document.querySelectorAll('script[custom-element],script[custom-template]')]
        .map(a => a.getAttribute('custom-element') || a.getAttribute('custom-template'))

      return {
        detectedTags,
        canonical,
        amphtml
      }
    })
    source = await response.text()
  })

  test("Souldn't have amphtml link", () => {
    expect(info.amphtml).toBeNull()
  })

  test('Valid canonical link', () => {
    expect(info.canonical).toEqual(`http://localhost:${port}`)
  })

  test('Detect all tags', () => {
    const expected = [ 'amp-carousel', 'amp-list', 'amp-bind', 'amp-mustache' ]
    expect(info.detectedTags).toEqual(expect.arrayContaining(expected))
  })

  test('Valid AMP structure', async () => {
    expect(await isValid(source)).toEqual(true)
  })

  test('Render plain text', () => {
    expect(source).toContain('AMP is easy')
  })
})

describe('Render AMP Story', () => {
  let source, info
  beforeAll(async () => {
    const response = await page.goto(url('/story'))

    info = await page.evaluate(() => {
      const canonical = document.querySelector('[rel=canonical]').getAttribute('href')
      const amphtml = document.querySelector('[rel=amphtml]')

      const detectedTags = [...document.querySelectorAll('script[custom-element],script[custom-template]')]
        .map(a => a.getAttribute('custom-element') || a.getAttribute('custom-template'))

      return {
        detectedTags,
        canonical,
        amphtml
      }
    })
    source = await response.text()
  })

  test('Valid canonical link', () => {
    expect(info.canonical).toEqual(`http://localhost:${port}/story`)
  })

  test('Detect all tags', () => {
    const expected = [ 'amp-story', 'amp-video', 'amp-animation', 'amp-social-share' ]
    expect(info.detectedTags).toEqual(expect.arrayContaining(expected))
  })

  test('Valid AMP structure', async () => {
    expect(await isValid(source)).toEqual(true)
  })
})
