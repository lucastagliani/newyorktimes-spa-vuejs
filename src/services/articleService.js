class ArticleService {
  constructor(http) {
    this.http = http;
  }

  areSectionsValid = sections => sections && sections.length > 0 && sections.every(s => s !== '');

  isTitleValid = title => title && title.length > 0;

  isPossibleToHaveDuplicatedArticles = sections => sections.length > 1;

  hasLimitDefined = limit => limit;

  getArticlesWithLimit = (articles, limit) => {
    if (!this.hasLimitDefined(limit)) {
      return articles;
    }

    return articles.slice(0, limit);
  }

  removeSomeSpecialChars = text => text.replace(/\//g, '').replace(/\?/g, '');

  getArticlesFromSections = async (sections) => {
    const responses = await Promise.all(sections
      .map(section => this.http.getTopStoriesFromSection(section)));

    return responses.flatMap(response => response.data.results);
  };

  removeDuplicatedArticles = (sections, articles) => {
    if (!this.isPossibleToHaveDuplicatedArticles(sections)) {
      return articles;
    }

    return articles.reduce((accumulator, current) => {
      const duplicated = accumulator.find(item => item.short_url === current.short_url);

      return duplicated ? accumulator : accumulator.concat([current]);
    }, []);
  };

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

    articles = this.removeDuplicatedArticles(sections, articles)
      .sort(this.orderByPublishedDateDesc);

    articles = this.getArticlesWithLimit(articles, limit);

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
