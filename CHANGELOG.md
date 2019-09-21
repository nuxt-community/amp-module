# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [0.2.0](https://github.com/nuxt-community/amp-module/compare/v0.1.1...v0.2.0) (2019-09-21)


### ⚠ BREAKING CHANGES

* with introducing `ampLayout` there no need to force '.amp` posix foa layouts.
* **global-amp-mode:** module does not provide middleware anymore

### Bug Fixes

* **custom-layout:** change to function factory, prevent cache ([71e11e3](https://github.com/nuxt-community/amp-module/commit/71e11e3))
* do not add `.amp` posix to page layout ([f5abdcb](https://github.com/nuxt-community/amp-module/commit/f5abdcb))
* fix route generation when in combination with other modules ([03ca25c](https://github.com/nuxt-community/amp-module/commit/03ca25c))
* fixed route processing, added condition on meta tags ([492d547](https://github.com/nuxt-community/amp-module/commit/492d547))
* removed double check ([fe67f00](https://github.com/nuxt-community/amp-module/commit/fe67f00))


### Features

* **global-amp-mode:** configurable global default ampMode ([0048a20](https://github.com/nuxt-community/amp-module/commit/0048a20))

### [0.1.1](https://github.com/nuxt-community/amp-module/compare/v0.1.0...v0.1.1) (2019-09-13)


### Bug Fixes

* **amp-validator:** fix amp detection in render hook ([9b3a168](https://github.com/nuxt-community/amp-module/commit/9b3a168))
* remove empty space in youtube tag ([#43](https://github.com/nuxt-community/amp-module/issues/43)) ([cb4406b](https://github.com/nuxt-community/amp-module/commit/cb4406b))
* **nuxt-generate:** generate canonical link using module option ([0f5e5ad](https://github.com/nuxt-community/amp-module/commit/0f5e5ad))

### 0.1.0 (2019-09-10)

Initial Release