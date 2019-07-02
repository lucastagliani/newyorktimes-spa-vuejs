// TODO: constructor should be more generic, fields encapsulated...
class Article {
  constructor(nytimesArticle) {
    this.title = nytimesArticle.title;
    this.section = nytimesArticle.section;
    this.subsection = nytimesArticle.subsection;
    this.byline = nytimesArticle.byline;
    this.abstract = nytimesArticle.abstract;
    this.urlFullArticle = nytimesArticle.url;
    this.publishedDate = new Date(nytimesArticle.published_date).toLocaleString();
    this.kicker = nytimesArticle.kicker;
    this.multimedia = nytimesArticle.multimedia;
  }

  getImage(format) {
    if (!this.multimedia) {
      return {};
    }

    return this.multimedia.find(x => x.format === format);
  }
}

export default Article;
