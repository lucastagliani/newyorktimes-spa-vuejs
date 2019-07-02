import nytimes from '@/http/nytimes';

const LIMIT_ARTICLES_TO_DISPLAY = 12;

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

const removeSomeSpecialChars = text => text.replace(/\//g, '').replace(/\?/g, '');

const findArticleByTitle = (articles, title) => {
  const titleWithoutSpecialChars = removeSomeSpecialChars(title);
  return articles.find(a => removeSomeSpecialChars(a.title) === titleWithoutSpecialChars);
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

const getArticle = async (title, sections) => {
  if (!areSectionsValid(sections)) {
    return {};
  }

  const articles = await getArticlesFromSections(sections);
  const article = findArticleByTitle(articles, title);

  return article;
};

export default { getArticles, getArticle };
