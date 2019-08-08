# Middleware

You can enable `amp` middleware either globally or per route.

Setting per route:

```js
export default {
  middleware: 'amp'
}
```

Globally setting in `nuxt.config.js`:

```js
router: {
  middleware: ['amp']
}
```

In case of global usage, You can set `amp` option to `false` in a specific component and the middleware will ignore that route.

```js
export default {
  amp: false
}
```
