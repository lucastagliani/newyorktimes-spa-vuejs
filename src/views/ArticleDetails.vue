<template>
  <section class="section">
    <div class="columns is-centered">
      <div class="column is-half">
        <pulse-loader :loading="this.loading" :color="'#333'"></pulse-loader>
        <template v-if="!this.loading">
          <div class="level">
            <div class="level-left">
              <div class="level-item">
                <button @click="goBackToSection()" class="button is-text">Back to section</button>
              </div>
            </div>
          </div>

          <h2 class="title is-1 is-italic">{{ this.article.title }}</h2>
          <p v-if="this.article.kicker" class="subtitle">{{ this.article.kicker }}</p>

          <div class="content" v-if="this.image">
            <img :src="this.image.url" :alt="this.image.copyright" />
          </div>

          <div class="level">
            <div class="level-left">
              <div class="level-item has-text-grey" v-if="this.article.publishedDate">
                <span class="icon">
                  <i class="fas fa-calendar-alt"></i>
                </span>
                <span class="is-size-7">{{ this.article.publishedDate }}</span>
              </div>
            </div>
            <div class="level-right">
              <div class="level-item has-text-grey" v-if="this.article.byline">
                <span class="icon">
                  <i class="fas fa-at"></i>
                </span>
                <span class="is-size-7">{{ this.article.byline }}</span>
              </div>
            </div>
          </div>
          <div class="content">
            <p v-if="this.article.abstract" class="paragraph is-size-5">
              {{ this.article.abstract }}
            </p>
          </div>
          <div class="is-centered" v-if="this.article.urlFullArticle">
            <button class="button is-dark is-outlined" @click="goToFullArticle()">
              Read full article
            </button>
          </div>
        </template>
      </div>
    </div>
  </section>
</template>

<script>
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import Article from '@/model/article';

import ArticleService from '@/services/articleService';
import sectionService from '@/services/sectionService';

import http from '@/http/nytimes';

export default {
  name: 'article-details',
  components: {
    PulseLoader,
  },
  data() {
    return {
      article: {
        default: {},
        type: Article,
      },
      image: {
        default: {},
      },
      loading: true,
    };
  },
  async mounted() {
    this.article = await this.getArticleBasedOnParams(
      this.$route.params.section,
      this.$route.params.title,
    );

    if (!this.article) {
      return;
    }

    this.image = this.article.getImage('superJumbo');
    this.loading = false;

    window.mixpanel.track('Load article', {
      article_title: this.article.title,
    });
  },
  methods: {
    async getArticleBasedOnParams(sectionName, title) {
      const section = sectionService.getSectionByName(sectionName);
      const articleService = new ArticleService(http);
      const nytimesArticle = await articleService.getArticle(
        title,
        section.slugs,
      );

      if (!nytimesArticle || !Object.keys(nytimesArticle).length) {
        this.goBackToSection();
        return null;
      }

      return new Article(nytimesArticle);
    },
    goToFullArticle() {
      window.mixpanel.track('Click read full article', {
        urlFullArticle: this.article.urlFullArticle,
      });
      window.open(this.article.urlFullArticle, '_blank');
    },
    goBackToSection() {
      this.$router.push({
        name: 'section-details',
        params: { section: this.$route.params.section },
      });
    },
  },
};
</script>

<style lang="less" scoped>
.paragraph {
  text-align: justify;
}
</style>
