import nytimes from '@/http/nytimes';

const LIMIT_ARTICLES_TO_DISPLAY = 12;

let articles = [];

const areSectionsValid = sections => sections && sections.length > 0;

const getArticlesFromSections = async (sections) => {
  let localArticles = [];

  for (let i = 0; i < sections.length; i += 1) {
    // TODO: await inside loop :'(
    const result = await nytimes.getTopStoriesFromSection(sections[i]);
    if (result.data) {
      localArticles = localArticles.concat(result.data.results);
    }
  }

  return localArticles;
};

// const filterArticlesOnlyFromSections = sections => articles
//   .filter(a => sections.indexOf(a.section.toLowerCase()) > -1);

const isPossibleToHaveDuplicatedArticles = sections => sections.length > 1;

const getUniqueArticles = () => articles.reduce((accumulator, current) => {
  const duplicated = accumulator.find(item => item.short_url === current.short_url);

  return duplicated ? accumulator : accumulator.concat([current]);
}, []);

const orderByPublishedDateDesc = (prev, next) => {
  const prevPublishedDate = prev.published_date;
  const nextPublishedDate = next.published_date;

  return prevPublishedDate < nextPublishedDate ? 1 : -1;
};

const getArticlesWithLimit = limit => articles.slice(0, limit);

const getArticles = async (sections) => {
  if (!areSectionsValid(sections)) {
    console.error('No section informed for getting articles.');
    return [];
  }

  articles = await getArticlesFromSections(sections);
  // articles = filterArticlesOnlyFromSections(sections);
  if (isPossibleToHaveDuplicatedArticles(sections)) {
    articles = getUniqueArticles();
  }
  articles = articles.sort(orderByPublishedDateDesc);
  articles = getArticlesWithLimit(LIMIT_ARTICLES_TO_DISPLAY);

  return articles;
};

const getArticleByShortUrl = (shortUrl) => {
  if (!articles) {
    console.error('Something went wrong');
    return {};
  }

  return articles.filter(a => a.short_url === shortUrl)[0];
};

export default { getArticles, getArticleByShortUrl };
