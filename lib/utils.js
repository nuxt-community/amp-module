import consola from 'consola'

export const logger = consola.withScope('@nuxtjs/amp')

export const VALID_FONT_PROVIDERS = [
  'https://cloud.typography.com',
  'https://fast.fonts.net',
  'https://fonts.googleapis.com',
  'https://use.typekit.net',
  'https://maxcdn.bootstrapcdn.com',
  'https://use.fontawesome.com'
]

/**
 * Remove external stylesheet links from input head HTML and leave
 * valid font ptovider styles
 */
export function removeExternalStyles (head) {
  return head.replace(/<link[^>]*rel="stylesheet"[^>]*>/gi, (v) => {
    if (VALID_FONT_PROVIDERS.some(domain => v.includes(domain))) {
      return v
    }
    return ''
  })
}
