import { expect } from 'chai';
import nytimesHttpMock from '../mocks/nytimes-http-mock';
import ArticleService from '@/services/articleService';

describe('Article service', async () => {
  let service;

  beforeEach(() => {
    service = new ArticleService(nytimesHttpMock);
  });

  it('should return 12 articles from section "technology" and with limite 12', async () => {
    const articles = await service.getArticles('technology', 12);
    expect(articles).to.have.lengthOf(12);
  });
});
