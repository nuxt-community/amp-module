# Options
## Module Options

General options of amp module  

| Option | Default | Valid values | Description |
| ------ | ------- | ------------ | ----------- |
| cdnBase | `https://cdn.ampproject.org/v0/` | Any String | A CDN Domain to load AMP elements scripts |
| origin | `` | Any String | Main domain of website. Using this AMP modules tries to add missing canonical link for pages. |
| mode | `hybrid` | `only\|hybrid\|false` | Default behaviour of amp module. (`only` all pages serve in AMP mode by default, `hybrid` pages serves in both normal and AMP mode, `false` pages does not serve AMP by default ) |


## Page Options
| Option | Type | Default | Valid values | Description |
| ------ | ---- | ------- | ------------ | ----------- |
| amp | `String\|Boolean` | `hybrid` | `only\|hybrid\|false` | Determine behaviour of page. (`only` page serve in AMP mode, `hybrid` page serves in both normal and AMP mode, `false` page does not serve AMP ) |
| ampLayout | `String\|Function` | `default` | Any String | Define layout of page when it renders in AMP mode |
