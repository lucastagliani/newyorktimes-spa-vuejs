<template>
  <router-link :to="{ path: `/nyttop/${name}` }" class="box card">
    <div class="level">
      <div class="level-left">
        <div class="level-item">
          <span class="icon is-large">
            <i :class="`fas fa-2x fa-${icon}`"></i>
          </span>
          <p class="is-size-4 has-text-weight-bold">{{ title }}</p>
        </div>
      </div>
    </div>
    <p class="is-size-5 has-text-grey is-italic" :v-if="description">{{ description }}</p>
    <div class="buttons is-centered">
      <button class="button is-secondary is-outlined">See articles</button>
    </div>
  </router-link>
</template>

<script>
export default {
  name: 'section-card',
  props: {
    name: String,
    articlesSections: [],
    icon: String,
    title: String,
    description: String,
  },
};
</script>

<style lang="less" scoped>
.buttons {
  margin-top: 1rem;
}
</style>
