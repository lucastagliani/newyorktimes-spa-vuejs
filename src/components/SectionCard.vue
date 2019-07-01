<template>
  <router-link :to="{ path: `/nyttop/${name}` }" class="box card">
    <div class="media">
      <figure class="media-left">
        <span class="icon">
          <i :class="`fas fa-${icon}`"></i>
        </span>
      </figure>
      <div class="media-content">
        <strong class="name">{{ title }}</strong>
      </div>
    </div>
    <p class="description" :v-if="description">{{ description }}</p>
    <div class="buttons is-centered">
      <button class="button is-secondary is-outlined">See articles</button>
    </div>
  </router-link>
</template>

<script>
export default {
  name: 'SectionCard',
  props: {
    name: String,
    articlesSections: [],
    icon: String,
    title: String,
    description: String,
  },
};
</script>
