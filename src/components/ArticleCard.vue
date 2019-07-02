<template>
  <div>
    <div class="level">
      <div class="level-left">
        <div class="level-item has-text-grey is-italic" v-if="context">
          <span class="icon">
            <i class="fas fa-tags"></i>
          </span>
          <span class="is-size-6">{{ context }}</span>
        </div>
      </div>
      <div class="level-right">
        <div class="level-item has-text-grey" v-if="publishedDate">
          <span class="icon">
            <i class="fas fa-calendar-alt"></i>
          </span>
          <span class="is-size-7">{{ new Date(publishedDate).toLocaleString() }}</span>
        </div>
      </div>
    </div>
    <p class="is-size-5 has-text-weight-bold article-title">{{ title }}</p>
    <div class="level">
      <div class="level-left">
        <div class="level-item">
          <!-- This level-left item is necessary to level-right works properly -->
        </div>
      </div>
      <div class="level-right">
        <div class="level-item has-text-grey" v-if="byline">
          <span class="icon">
            <i class="fas fa-at"></i>
          </span>
          <span class="is-size-7">{{ byline }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'article-card',
  props: {
    title: String,
    context: String,
    publishedDate: String,
    byline: String,
  },
};
</script>

<style lang="less" scoped>
.article-title {
  height: 7.5rem;
}
</style>
