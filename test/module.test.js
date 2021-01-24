jest.setTimeout(60000)

const { Nuxt, Builder } = require('nuxt-edge')
const getPort = require('get-port')

const defaultConfig = require('../example/nuxt.config')
const { isValid } = require('./utils')

let nuxt, url
beforeAll(async () => {
  const port = await getPort({ port: getPort.makeRange(3100, 3200) })
  url = path => `http://localhost:${port}${path}`
  const config = {
    ...defaultConfig,
    buildDir: '.nuxt/test.module',
    dev: false,
    amp: {
      ...(defaultConfig.amp || {}),
      origin: `http://localhost:${port}`
    }
  }
  nuxt = new Nuxt(config)
  await nuxt.ready()
  await new Builder(nuxt).build()
  return await nuxt.listen(port)
})

afterAll(async () => {
  return await nuxt.close()
})

describe('Generates routes', () => {
  let routes
  beforeAll(() => {
    routes = nuxt.options.router.routes
  })

  test('Routes should be correctly localized', () => {
    routes.forEach((route) => {
      if (!route.path.startsWith('/amp')) {
        expect(route.alias).toEqual([`/amp${route.path}`])
      }
    })
  })
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
    expect(info.amphtml).toEqual(url('/amp/'))
  })

  test('Shouldn\'t have canonical link', () => {
    expect(info.canonical).toBeNull()
  })
})

describe('Render AMP version of home page', () => {
  let source, info
  beforeAll(async () => {
    const response = await page.goto(url('/amp'))

    info = await page.evaluate(() => {
      const ampAttr = document.documentElement.getAttribute('amp')
      const canonical = document.querySelector('[rel=canonical]').getAttribute('href')
      const amphtml = document.querySelector('[rel=amphtml]')

      const googleFont = document.querySelector('[data-hid="google-font"]').getAttribute('href')

      const detectedTags = [...document.querySelectorAll('script[custom-element],script[custom-template]')]
        .map(a => a.getAttribute('custom-element') || a.getAttribute('custom-template'))

      return {
        ampAttr,
        detectedTags,
        canonical,
        amphtml,
        googleFont
      }
    })
    source = await response.text()
  })

  test('Should have amp html attribute', () => {
    expect(info.ampAttr).toEqual('')
  })

  test('Shouldn\'t have amphtml link', () => {
    expect(info.amphtml).toBeNull()
  })

  test('Valid canonical link', () => {
    expect(info.canonical).toEqual(url(''))
  })

  test('Keep links of valid font providers', () => {
    expect(info.googleFont).toEqual('https://fonts.googleapis.com/css2?family=Langar&display=swap')
  })

  test('Detect all tags', () => {
    const expected = ['amp-carousel', 'amp-list', 'amp-bind', 'amp-mustache']
    expect(info.detectedTags).toEqual(expect.arrayContaining(expected))
  })

  test('Valid AMP structure', async () => {
    expect(await isValid(source)).toEqual(true)
  })

  test('Render plain text', () => {
    expect(source).toContain('AMP is easy')
  })
})

describe('Render hello page', () => {
  let source
  beforeAll(async () => {
    const response = await page.goto(url('/hello'))
    source = await response.text()
  })

  test('Hello Everyone', () => {
    expect(source).toContain('Hello Everyone')
  })
})

describe('Render AMP version of hello page', () => {
  let source
  beforeAll(async () => {
    const response = await page.goto(url('/amp/hello'))
    source = await response.text()
  })

  test('Hello AMP', () => {
    expect(source).toContain('Hello AMP')
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
    expect(info.canonical).toEqual(url('/story'))
  })

  test('Detect all tags', () => {
    const expected = ['amp-story', 'amp-video']
    expect(info.detectedTags).toEqual(expect.arrayContaining(expected))
  })

  test('Valid AMP structure', async () => {
    expect(await isValid(source)).toEqual(true)
  })
})

describe('Render amp-fx example', () => {
  let source, info
  beforeAll(async () => {
    const response = await page.goto(url('/amp-fx'))

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

  test('Detect all tags', () => {
    const expected = ['amp-fx-collection']
    expect(info.detectedTags).toEqual(expect.arrayContaining(expected))
  })

  test('Valid AMP structure', async () => {
    expect(await isValid(source)).toEqual(true)
  })
})

describe('Render disabled amp page', () => {
  beforeAll(async () => {
    await page.goto(url('/amp/noamp'))
  })

  test('404 for not amp pages', async () => {
    await expect(page).toMatch('This page could not be found')
  })
})
