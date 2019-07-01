<template>
  <div class="has-text-centered">
    <p class="has-text-grey-darker is-size-4">{{ message }}</p>
    <p class="has-text-grey-darker is-size-4">
      You may be interested in going to the original
      <a
        href="https://www.nytimes.com/"
      >The New York Times</a>.
    </p>
  </div>
</template>

<script>
export default {
  name: 'no-data-to-display',
  props: {
    message: String,
  },
};
</script>
