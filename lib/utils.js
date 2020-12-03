import fs from 'fs'
import chokidar from 'chokidar'
import consola from 'consola'

export const logger = consola.withScope('@nuxtjs/amp')

const ampCustom = {
  path: '',
  content: ''
}
export function getAmpCustom (nuxt, options) {
  if (!options.css) {
    return ''
  }
  if (!ampCustom.path || ampCustom.path !== options.css) {
    ampCustom.path = options.css
    if (!fs.existsSync(ampCustom.path)) {
      return ''
    }
    ampCustom.content = fs.readFileSync(ampCustom.path, { encoding: 'utf8' })
  }
  return ampCustom.content
}

export function clearAmpCustomCache () {
  logger.info('Cache cleared')
  ampCustom.path = ''
  ampCustom.content = ''
}
export function watchAmpCustom (input) {
  const filesWatcher = chokidar.watch(input, {
    ignoreInitial: true
  })

  if (filesWatcher) {
    logger.info('Watching for style changes')
    filesWatcher.on('add', clearAmpCustomCache)
    filesWatcher.on('change', clearAmpCustomCache)
    filesWatcher.on('unlink', clearAmpCustomCache)
    filesWatcher.on('unlinkDir', clearAmpCustomCache)
  }
  return filesWatcher
}
