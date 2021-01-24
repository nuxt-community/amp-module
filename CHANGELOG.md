# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.5.4](https://github.com/nuxt-community/amp-module/compare/v0.5.3...v0.5.4) (2021-01-24)


### Bug Fixes

* **routes:** reorder routes to override AMP pages ([#233](https://github.com/nuxt-community/amp-module/issues/233)) ([a9c656d](https://github.com/nuxt-community/amp-module/commit/a9c656d64addc7bdc711cccdbef33566cc035d10))

### [0.5.3](https://github.com/nuxt-community/amp-module/compare/v0.5.2...v0.5.3) (2021-01-10)


### Bug Fixes

* **style:** resolve uncorrect remove style regex ([#225](https://github.com/nuxt-community/amp-module/issues/225)) ([d995b23](https://github.com/nuxt-community/amp-module/commit/d995b23e5d061c1783d342d81855aec6aa202d2e))
* disable sanitizer for amp custom style ([063dc14](https://github.com/nuxt-community/amp-module/commit/063dc1429058f7c3ae7dc132821989b69a817ff5))

### [0.5.2](https://github.com/nuxt-community/amp-module/compare/v0.5.1...v0.5.2) (2020-12-27)


### Features

* add option to control inline styles ([4c3e2d5](https://github.com/nuxt-community/amp-module/commit/4c3e2d598ab5bd54e5efab8dd287b5fa57df53e8))
* **styling:** keep Nuxt style when `css=false` ([#218](https://github.com/nuxt-community/amp-module/issues/218)) ([fdad34b](https://github.com/nuxt-community/amp-module/commit/fdad34b09534392cd6009b4f1a9eaec41c37eb6b))


### Bug Fixes

* **validator:** add `isAMP` to req object ([40d4954](https://github.com/nuxt-community/amp-module/commit/40d4954ff28d3eabfdb7b1c0a8ad1057867a21b6))
* disable sanitizer for amp custom styles ([93a0964](https://github.com/nuxt-community/amp-module/commit/93a0964a59173d916681c2db347c5e183213f0b1))
* **styles:** do not remove external styles of font providers ([#217](https://github.com/nuxt-community/amp-module/issues/217)) ([c71406b](https://github.com/nuxt-community/amp-module/commit/c71406bb80438abfc61d9b8afd7ede83ef97dbbb))

### [0.5.1](https://github.com/nuxt-community/amp-module/compare/v0.5.0...v0.5.1) (2020-12-15)


### Bug Fixes

* add templates directory to npm publish ([#212](https://github.com/nuxt-community/amp-module/issues/212)) ([661d8e3](https://github.com/nuxt-community/amp-module/commit/661d8e3c5e541662e5421d57afcb27d67d54600d))

## [0.5.0](https://github.com/nuxt-community/amp-module/compare/v0.4.0...v0.5.0) (2020-12-13)


### ⚠ BREAKING CHANGES

* custom amp styles (#206)

### Features

* auto detect style loader ([2e4fd08](https://github.com/nuxt-community/amp-module/commit/2e4fd08472ed67a8e54a0236ea2feb3eaef8cb55))
* custom amp styles ([#206](https://github.com/nuxt-community/amp-module/issues/206)) ([3950c70](https://github.com/nuxt-community/amp-module/commit/3950c705456e7c3590a69e71e7dbebda64616a32))
* **module:** add option to disable validator ([fe3c315](https://github.com/nuxt-community/amp-module/commit/fe3c315213217d959a896ffdd6df52ca1f5bd081)), closes [#184](https://github.com/nuxt-community/amp-module/issues/184)
* **tags:** update amp-sticky-ads to 1.0 ([aed2938](https://github.com/nuxt-community/amp-module/commit/aed29384a12493d47182803cf5832d95e4d28dd6)), closes [#183](https://github.com/nuxt-community/amp-module/issues/183)


### Bug Fixes

* **canonical:** remove unnecessary check of origin ([10fa0fd](https://github.com/nuxt-community/amp-module/commit/10fa0fda630c08f2e7959bcb9953cd7b40acd766)), closes [#181](https://github.com/nuxt-community/amp-module/issues/181)
* **tags:** remove duplicate scripts ([#198](https://github.com/nuxt-community/amp-module/issues/198)) ([#199](https://github.com/nuxt-community/amp-module/issues/199)) ([f069e57](https://github.com/nuxt-community/amp-module/commit/f069e572aef3db5d93320070bb4634c75cccf0e5))

## [0.4.0](https://github.com/nuxt-community/amp-module/compare/v0.3.0...v0.4.0) (2020-09-03)


### Features

* **tags:** support `amp-inline-gallery` tag ([b95ae98](https://github.com/nuxt-community/amp-module/commit/b95ae981592a1caf420938ccaf58b96a3818186e)), closes [#161](https://github.com/nuxt-community/amp-module/issues/161)
* **tags:** support `amp-inputmask` tag ([1210e5d](https://github.com/nuxt-community/amp-module/commit/1210e5dadb0f027893d78d75f7ae41a3c267479d)), closes [#162](https://github.com/nuxt-community/amp-module/issues/162)


### Bug Fixes

* **module:** handle undefined routes ([bceda93](https://github.com/nuxt-community/amp-module/commit/bceda93f1791ffb13b08bea3bf3de350f804863f)), closes [#166](https://github.com/nuxt-community/amp-module/issues/166)

## [0.3.0](https://github.com/nuxt-community/amp-module/compare/v0.2.4...v0.3.0) (2020-07-16)


### Features

* support static site generation on Nuxt 2.13+ ([31f27ad](https://github.com/nuxt-community/amp-module/commit/31f27ad3fbe805aa34a91fa9a894cede42560f36))
* upgrade amp-carousel to v0.2 ([c82f49e](https://github.com/nuxt-community/amp-module/commit/c82f49e753c792a8c222689658f624ca7ce0f07e)), closes [#150](https://github.com/nuxt-community/amp-module/issues/150)


### Bug Fixes

* add amp-lightbox-gallery regex ([ce43a80](https://github.com/nuxt-community/amp-module/commit/ce43a80673005a3bd5932d336e7cef282fac13eb)), closes [#153](https://github.com/nuxt-community/amp-module/issues/153)

### [0.2.4](https://github.com/nuxt-community/amp-module/compare/v0.2.3...v0.2.4) (2020-03-24)


### Features

* **custom-routes:** create an option to define AMP pages ([81c5717](https://github.com/nuxt-community/amp-module/commit/81c57175614b4484b3708380cc60c1e3e9595568))
* **custom-tags:** introduce tags option to modify tags detection ([d08b769](https://github.com/nuxt-community/amp-module/commit/d08b7697123eb96d8684e315037c8cb97fba0fcd))

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