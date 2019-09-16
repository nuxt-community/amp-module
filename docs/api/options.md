# Options

General options of amp module  

| Option | Default | Valid values | Description |
| ------ | ------- | ------------ | ----------- |
| cdnBase | `https://cdn.ampproject.org/v0/` | Any String | A CDN Domain to load AMP elements scripts |
| origin | `` | Any String | Main domain of website. Using this AMP modules tries to add missing canonical link for pages. |
| mode | `hybrid` | `only|hybrid|false` | Default behaviour of amp module. (`only` all pages serve in AMP mode by default, `hybrid` pages serves in both normal and AMP mode, `false` pages does not serve AMP by default ) |
