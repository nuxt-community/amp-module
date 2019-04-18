<template>
  <div v-if="$isAMP">
    <amp-twitter
      width="375"
      height="472"
      layout="responsive"
      data-tweetid="885634330868850689"
    />
  </div>
  <div v-else>
    <Tweet
      id="885634330868850689"
    />
  </div>
</template>

<script>
import { Tweet } from 'vue-tweet-embed'

export default {
  components: {
    Tweet
  },
  amp: true
}
</script>
