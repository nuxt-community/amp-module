# Styling
`amp-module` adds a custom class to `body` tag of page, you may use `__amp` class to target elements only in AMP pages.

```css
.__amp .my-awesome-element {

}
```
However we recommend to create a separate style file for AMP pages and import it in AMP layout, also remove styles from `nuxt.config` and import those files in default layout instead.

```vue
// default.vue
...
<style>
@import "~/assets/styles/default.css"
</style>
```

And AMP layout

```vue
// default.amp.vue
...
<style>
@import "~/assets/styles/default.amp.css"
</style>
```
# extractCSS behavior
Unfortunately there is no way (at the moment) to support internal and scoped component styles with `extractCSS`. Even with the `removeInlineStyles` option turned off.
You should copy or move these styles to assets.
