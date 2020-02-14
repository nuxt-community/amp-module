# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.2.3](https://github.com/nuxt-community/amp-module/compare/v0.2.2...v0.2.3) (2020-02-14)


### Bug Fixes

* **amp-fx:** provide amp-fx regex ([348aad5](https://github.com/nuxt-community/amp-module/commit/348aad5593fb33ebb9319ee3a94620ae80eaf869))

### [0.2.2](https://github.com/nuxt-community/amp-module/compare/v0.2.1...v0.2.2) (2020-01-24)


### Bug Fixes

* **route-alis:** preserve route previous aliases ([#91](https://github.com/nuxt-community/amp-module/issues/91)) ([91f3c80](https://github.com/nuxt-community/amp-module/commit/91f3c80e297df90a1b0d357fc7e432fa7b977691))
* Support amp-bind alternative syntax ([#85](https://github.com/nuxt-community/amp-module/issues/85)) ([b39b846](https://github.com/nuxt-community/amp-module/commit/b39b846a54007408389bdb6022e18b1e07185d1c))

### [0.2.1](https://github.com/nuxt-community/amp-module/compare/v0.2.0...v0.2.1) (2019-10-25)


### Features

* **404:** return 404 on unavailable amp pages ([79e6d76](https://github.com/nuxt-community/amp-module/commit/79e6d76))
* **404:** return 404 on unavailable amp pages ([#80](https://github.com/nuxt-community/amp-module/issues/80)) ([fd397f3](https://github.com/nuxt-community/amp-module/commit/fd397f3))

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