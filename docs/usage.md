# Usage

## Create Layout
Before starting to create pages you need to create a layout for AMP called `default.amp.vue`

```vue
<template>
  <div>
    <Nuxt />
  </div>
</template>
```
> If you're using your custom layout for your page (lets call it `foo`) you must create layout a layout `foo.amp.vue` for AMP version of your page

## Create Page
Creating AMP page is same as non-AMP page, create a Vue file in `pages` folder and start creating your page.
If you want to have a page that generate both AMP and non-AMP html, you can use `$isAMP` variable to conditionally
show components.

`amp-module` inject `$isAMP` on Vue context in order to determine type of current page render.

```vue
<template>
    <div v-if="$isAMP">
        <amp-img src="nuxt.js.svg" >
    </div>
    <div v-else>
        <img src="nuxt.js.svg" >
    </div>
</template>

<script>
export default {
    middleware: 'amp',
}
</script>
```

You can use `this.$isAMP` inside page script to check if this is AMP generation or not.

```vue
<template>
    ...
</template>

<script>
export default {
    middleware: 'amp',
    ...
    mounted() {
        // fetch list of entities on normal page
        // we use `amp-list` to fetch and show these entities
        if (!this.$isAMP) {
            this.fetchList();
        }
    },
    methods: {
        //  fetch list of entities to show
        fetchList() {
            ...
        }
    }
}
</script>
```