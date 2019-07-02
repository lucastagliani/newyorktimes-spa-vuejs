import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import SectionDetails from './views/SectionDetails.vue';
import ArticleDetails from './views/ArticleDetails.vue';

Vue.use(Router);

const basePath = '/nyttop';

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: `${basePath}/:section/:articleId`,
      name: 'article-details',
      component: ArticleDetails,
    },
    {
      path: `${basePath}/:section`,
      name: 'section-details',
      component: SectionDetails,
    },
    {
      path: basePath,
      name: 'home',
      component: Home,
    },
    {
      path: '*',
      redirect: basePath,
    },
  ],
});
