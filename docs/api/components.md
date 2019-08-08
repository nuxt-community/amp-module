# Components

`amp-module` create helper componets in order to better support of amp features.

## `<amp-body>`
Some of AMP components have strict rule to place directly in body tag.  [amp-story](https://amp.dev/documentation/components/amp-story/?format=stories), [amp-sidebar](https://amp.dev/documentation/components/amp-sidebar/?format=stories#sidebar-for-stories)
This component act as AMP page body and all content of this components will move to page `<body>`

Example:
```html
<template>
  <amp-body>
    <amp-sidebar id="sidebar1" layout="nodisplay" side="right">
      <ul>
        <li>Nav item 1</li>
        <li><a href="#idTwo" on="tap:idTwo.scrollTo">Nav item 2</a></li>
        <li>Nav item 3</li>
        <li><a href="#idFour" on="tap:idFour.scrollTo">Nav item 4</a></li>
        <li>Nav item 5</li>
        <li>Nav item 6</li>
      </ul>
    </amp-sidebar>
  </amp-body>
</template>

<script>
export default {
    // ...
}
</script>
```

## `<amp-mustache>`

This Components used for createing templates in AMP page, templates used in many AMP tags, like [amp-list](https://amp.dev/documentation/components/amp-list)

Example:
```html
<template>
    <amp-list
      id="time"
      layout="fixed-height"
      height="18"
      src="https://playground.amp.dev/documentation/examples/api/time"
      binding="refresh"
      single-item
      items="."
    >
      <amp-mustache>
        <template v-pre>
          The time is: {{time}} <button on="tap:time.refresh">
            Refresh
          </button>
        </template>
      </amp-mustache>
    </amp-list>
</template>

<script>
export default {
    // ...
}
</script>
```