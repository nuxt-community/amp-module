function getTags({
  cdnBase = 'https://cdn.ampproject.org/v0/'
}) {
  const tags = [
    { tag: 'amp-list', version: '0.1' },
    { tag: 'amp-twitter', version: '0.1' },
    { tag: 'amp-siebar', version: '0.1' },
    { tag: 'amp-mustache', version: '0.2', isTemplate: true }
  ]

  for (const t of tags) {
    t.url = `${cdnBase}${t.tag}-${t.version}.js`
  }

  return tags
}

function detectTags(tags, html) {
  return tags.filter(t => html.includes(`<${t.tag}`))
}

module.exports = {
  getTags,
  detectTags
}
