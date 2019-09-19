<template>
  <div>
    <div v-if="!$isAMP" class="intro">
      <p>
        Follow one of links
      </p>
      <ul>
        <li>
          <a href="/amp">
            Simple AMP Page
          </a>
        </li>
        <li>
          <a href="/story">
            AMP story
          </a>
        </li>
      </ul>
    </div>
    <div v-else>
      <h2>AMP is easy</h2>

      <p>
        Here is a responsive image carousel implemented in AMP. Tap
        on one of the images to enter the lightbox mode.
      </p>
      <amp-carousel
        type="slides"
        width="400"
        height="300"
        layout="responsive"
      >
        <amp-img
          src="https://unsplash.it/400/300?image=10"
          width="400"
          height="300"
          layout="responsive"
          alt="a sample image"
        />
        <amp-img
          src="https://unsplash.it/400/300?image=11"
          width="400"
          height="300"
          layout="responsive"
          alt="a sample image"
        />
        <amp-img
          src="https://unsplash.it/400/300?image=12"
          width="400"
          height="300"
          layout="responsive"
          alt="a sample image"
        />
        <amp-img
          src="https://unsplash.it/400/300?image=13"
          width="400"
          height="300"
          layout="responsive"
          alt="a sample image"
        />
      </amp-carousel>

      <h2>AMP is interactive</h2>

      <p>
        AMP provides a rich set of built-in actions for creating
        interactive websites.
      </p>

      <button on="tap:greeting.show">
        Show
      </button>
      <button on="tap:greeting.hide">
        Hide
      </button>
      <button on="tap:greeting.toggleVisibility">
        Toggle
      </button>
      <span id="greeting" hidden>Hello</span>

      <p>... and this is how you toggle a class attribute.</p>

      <button on="tap:greeting2.toggleClass(class='red')">
        Toggle red
      </button>
      <span id="greeting2">Hello</span>

      <h2>AMP is dynamic</h2>

      <p>
        AMP offers different ways to render dynamic content on a page.
        With amp-list it's possible to client-side render data pulled
        in from a JSON endpoint.
      </p>

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

      <p>Here is another example, a simple calculator implemented with amp-bind:</p>

      <input
        type="number"
        on="input-debounced:AMP.setState({a: event.valueAsNumber})"
        value="0"
      > +
      <input
        type="number"
        on="input-debounced:AMP.setState({b: event.valueAsNumber})"
        value="0"
      > =
      <span [text]="a + b">0</span>
    </div>
  </div>
</template>

<script>
export default {
  head () {
    return {
      title: 'AMP module for Nuxtjs'
    }
  }
}
</script>

<style>
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
}
body > * {
  margin: 0.5rem 0 0.5rem 0.5rem;
}
amp-carousel {
  margin: 0;
}
input[type=number] {
  width: 2rem;
}
.red {
  color: red;
}
</style>
