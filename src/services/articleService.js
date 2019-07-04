class ArticleService {
  constructor(http) {
    this.http = http;
  }

  areSectionsValid = sections => sections && sections.length > 0 && sections.every(s => s !== '');

  isTitleValid = title => title && title.length > 0;

  isPossibleToHaveDuplicatedArticles = sections => sections.length > 1;

  hasLimitDefined = limit => limit;

  getArticlesWithLimit = (articles, limit) => articles.slice(0, limit);

  removeSomeSpecialChars = text => text.replace(/\//g, '').replace(/\?/g, '');

  getArticlesFromSections = async (sections) => {
    let articles = [];

    for (let i = 0; i < sections.length; i += 1) {
      // TODO: await inside loop :'(
      const result = await this.http.getTopStoriesFromSection(sections[i]);
      if (result.data) {
        articles = articles.concat(result.data.results);
      }
    }

    return articles;
  };

  getUniqueArticles = articles => articles.reduce((accumulator, current) => {
    const duplicated = accumulator.find(item => item.short_url === current.short_url);

    return duplicated ? accumulator : accumulator.concat([current]);
  }, []);

  orderByPublishedDateDesc = (prev, next) => {
    const prevPublishedDate = prev.published_date;
    const nextPublishedDate = next.published_date;

    return prevPublishedDate < nextPublishedDate ? 1 : -1;
  };

  findArticleByTitle = (articles, title) => {
    const titleWithoutSpecialChars = this.removeSomeSpecialChars(title);
    return articles.find(a => this.removeSomeSpecialChars(a.title) === titleWithoutSpecialChars);
  };

  getArticles = async (sections, limit) => {
    if (!this.areSectionsValid(sections)) {
      return [];
    }

    let articles = await this.getArticlesFromSections(sections);
    if (this.isPossibleToHaveDuplicatedArticles(sections)) {
      articles = this.getUniqueArticles(articles);
    }

    articles = articles.sort(this.orderByPublishedDateDesc);

    if (this.hasLimitDefined(limit)) {
      articles = this.getArticlesWithLimit(articles, limit);
    }

    return articles;
  };

  getArticle = async (title, sections) => {
    if (!this.isTitleValid(title) || !this.areSectionsValid(sections)) {
      return {};
    }

    const articles = await this.getArticlesFromSections(sections);
    const article = this.findArticleByTitle(articles, title);

    return article;
  };
}

export default ArticleService;
