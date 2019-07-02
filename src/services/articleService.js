import nytimes from '@/http/nytimes';

const LIMIT_ARTICLES_TO_DISPLAY = 12;
const BASE_SHORT_URL = 'https://nyti.ms';

const areSectionsValid = sections => sections && sections.length > 0;

const getArticlesFromSections = async (sections) => {
  let articles = [];

  for (let i = 0; i < sections.length; i += 1) {
    // TODO: await inside loop :'(
    const result = await nytimes.getTopStoriesFromSection(sections[i]);
    if (result.data) {
      articles = articles.concat(result.data.results);
    }
  }

  return articles;
};

const isPossibleToHaveDuplicatedArticles = sections => sections.length > 1;

const getUniqueArticles = articles => articles.reduce((accumulator, current) => {
  const duplicated = accumulator.find(item => item.short_url === current.short_url);

  return duplicated ? accumulator : accumulator.concat([current]);
}, []);

const orderByPublishedDateDesc = (prev, next) => {
  const prevPublishedDate = prev.published_date;
  const nextPublishedDate = next.published_date;

  return prevPublishedDate < nextPublishedDate ? 1 : -1;
};

const getArticlesWithLimit = (articles, limit) => articles.slice(0, limit);

const findArticleById = (articles, articleId) => {
  const shortUrl = `${BASE_SHORT_URL}/${articleId}`;
  return articles.find(a => a.short_url === shortUrl);
};

const getArticles = async (sections) => {
  if (!areSectionsValid(sections)) {
    return [];
  }

  let articles = await getArticlesFromSections(sections);
  if (isPossibleToHaveDuplicatedArticles(sections)) {
    articles = getUniqueArticles(articles);
  }
  articles = articles.sort(orderByPublishedDateDesc);
  articles = getArticlesWithLimit(articles, LIMIT_ARTICLES_TO_DISPLAY);

  return articles;
};

const getArticle = async (articleId, sections) => {
  if (!areSectionsValid(sections)) {
    return {};
  }

  const articles = await getArticlesFromSections(sections);
  const article = findArticleById(articles, articleId);
  return article;
};

export default { getArticles, getArticle };
