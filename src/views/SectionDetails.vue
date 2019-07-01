<template>
  <div class="home">
    <section class="section" v-if="section">
      <div class="container">
        <div class="level">
          <div class="level-left">
            <div class="level-item">
              <router-link :to="{ name: 'home' }" class="button is-text">Back to home</router-link>
            </div>
          </div>
        </div>
        <div class="has-text-centered">
          <h1 class="title is-1 is-spaced">{{ section.title }}</h1>
          <p class="subtitle is-4">{{ section.description }}</p>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container" :class="{ 'is-loading': loading }">
        <pulse-loader :loading="this.loading" :color="'#333'"></pulse-loader>
        <template v-if="!this.loading">
          <div v-if="!hasArticlesToDisplay()">
            <NoDataToDisplay :message="'There is no articles here today.'" />
          </div>
          <div v-if="hasArticlesToDisplay()" class="columns is-multiline">
            <div
              v-for="(item, index) in articles"
              :key="item[index]"
              class="column is-4-widescreen is-6"
            >
              <ArticleCard
                :title="item.title"
                :context="item.subsection || item.section"
                :published_date="item.published_date"
                :byline="item.byline"
              ></ArticleCard>
            </div>
          </div>
        </template>
      </div>
    </section>
  </div>
</template>

<script>
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';

import ArticleCard from '@/components/ArticleCard.vue';
import NoDataToDisplay from '@/components/NoDataToDisplay.vue';

import articleService from '@/services/articleService';
import sectionService from '@/services/sectionService';

export default {
  name: 'section-details',
  components: {
    ArticleCard,
    NoDataToDisplay,
    PulseLoader,
  },
  data() {
    return {
      loading: true,
      articles: [],
      section: {},
    };
  },
  async mounted() {
    const sectionName = this.$route.params.section;
    window.mixpanel.track('Load section', { section_name: sectionName });
    this.section = sectionService.getSectionByName(sectionName);
    this.articles = await articleService.getArticles(this.section.slugs);
    this.loading = false;
  },
  methods: {
    hasArticlesToDisplay() {
      return this.articles && this.articles.length > 0;
    },
  },
};
</script>
