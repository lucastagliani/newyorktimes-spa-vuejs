import { expect } from 'chai';
import nytimesHttpMock from '../mocks/nytimes-http-mock';
import ArticleService from '@/services/articleService';

const EXPECTED_WOULD_YOU_PAY_ENTIRE_ARTICLE = {
  section: 'Technology',
  subsection: '',
  title: 'Would You Pay $30 a Month to Check Your Email?',
  abstract: 'One of Silicon Valley’s buzziest start-ups, Superhuman, is betting its app’s shiny features are worth a premium price.',
  url: 'https://www.nytimes.com/2019/06/27/technology/superhuman-email.html',
  byline: 'By KEVIN ROOSE',
  item_type: 'Article',
  updated_date: '2019-06-27T11:52:53-04:00',
  created_date: '2019-06-27T03:00:12-04:00',
  published_date: '2019-06-27T03:00:12-04:00',
  material_type_facet: '',
  kicker: '',
  des_facet: [
    'E-Mail',
    'Computers and the Internet',
    'Mobile Applications',
    'Venture Capital',
    'Start-ups',
  ],
  org_facet: [
    'Superhuman Labs Inc',
    'Andreessen Horowitz',
  ],
  per_facet: [],
  geo_facet: [],
  multimedia: [
    {
      url: 'https://static01.nyt.com/images/2019/06/27/business/27-roose/27-roose-thumbStandard.jpg',
      format: 'Standard Thumbnail',
      height: 75,
      width: 75,
      type: 'image',
      subtype: 'photo',
      caption: '',
      copyright: 'Pablo Rochat',
    },
    {
      url: 'https://static01.nyt.com/images/2019/06/27/business/27-roose/27-roose-thumbLarge.jpg',
      format: 'thumbLarge',
      height: 150,
      width: 150,
      type: 'image',
      subtype: 'photo',
      caption: '',
      copyright: 'Pablo Rochat',
    },
    {
      url: 'https://static01.nyt.com/images/2019/06/27/business/27-roose/6f92698ee9bc4b91af8361a77f6c6b91-articleInline.jpg',
      format: 'Normal',
      height: 196,
      width: 190,
      type: 'image',
      subtype: 'photo',
      caption: '',
      copyright: 'Pablo Rochat',
    },
    {
      url: 'https://static01.nyt.com/images/2019/06/27/business/27-roose/27-roose-mediumThreeByTwo210.jpg',
      format: 'mediumThreeByTwo210',
      height: 140,
      width: 210,
      type: 'image',
      subtype: 'photo',
      caption: '',
      copyright: 'Pablo Rochat',
    },
    {
      url: 'https://static01.nyt.com/images/2019/06/27/business/27-roose/6f92698ee9bc4b91af8361a77f6c6b91-superJumbo.jpg',
      format: 'superJumbo',
      height: 2048,
      width: 1982,
      type: 'image',
      subtype: 'photo',
      caption: '',
      copyright: 'Pablo Rochat',
    },
  ],
  short_url: 'https://nyti.ms/2X1vOGo',
};

const EXPECTED_TWO_MORE_RECENT_ARTICLES = [
  {
    "section": "Business",
    "subsection": "",
    "title": "Tesla Says Deliveries in Quarter Set a Record",
    "abstract": "The 95,200 vehicles beat the mark set in last year’s final quarter, the electric-car maker said. But it may be hard pressed to meet its 2019 target.",
    "url": "https://www.nytimes.com/2019/07/02/business/tesla-electric-vehicle-sales.html",
    "byline": "By NEAL E. BOUDETTE",
    "item_type": "Article",
    "updated_date": "2019-07-02T19:25:26-04:00",
    "created_date": "2019-07-02T16:31:38-04:00",
    "published_date": "2019-07-02T16:31:38-04:00",
    "material_type_facet": "",
    "kicker": "",
    "des_facet": [
      "Company Reports",
      "Electric and Hybrid Vehicles",
      "Stocks and Bonds",
      "Tax Credits, Deductions and Exemptions"
    ],
    "org_facet": [
      "Tesla Motors Inc"
    ],
    "per_facet": [
      "Musk, Elon"
    ],
    "geo_facet": [],
    "multimedia": [
      {
        "url": "https://static01.nyt.com/images/2019/07/02/business/02tesla2/02tesla2-thumbStandard.jpg",
        "format": "Standard Thumbnail",
        "height": 75,
        "width": 75,
        "type": "image",
        "subtype": "photo",
        "caption": "Deliveries in April to a Tesla showroom in Brooklyn.",
        "copyright": "Spencer Platt/Getty Images"
      },
      {
        "url": "https://static01.nyt.com/images/2019/07/02/business/02tesla2/02tesla2-thumbLarge.jpg",
        "format": "thumbLarge",
        "height": 150,
        "width": 150,
        "type": "image",
        "subtype": "photo",
        "caption": "Deliveries in April to a Tesla showroom in Brooklyn.",
        "copyright": "Spencer Platt/Getty Images"
      },
      {
        "url": "https://static01.nyt.com/images/2019/07/02/business/02tesla2/merlin_153968928_7b3f43b1-9d4c-43b2-b8de-17d5fad171fe-articleInline.jpg",
        "format": "Normal",
        "height": 127,
        "width": 190,
        "type": "image",
        "subtype": "photo",
        "caption": "Deliveries in April to a Tesla showroom in Brooklyn.",
        "copyright": "Spencer Platt/Getty Images"
      },
      {
        "url": "https://static01.nyt.com/images/2019/07/02/business/02tesla2/merlin_153968928_7b3f43b1-9d4c-43b2-b8de-17d5fad171fe-mediumThreeByTwo210.jpg",
        "format": "mediumThreeByTwo210",
        "height": 140,
        "width": 210,
        "type": "image",
        "subtype": "photo",
        "caption": "Deliveries in April to a Tesla showroom in Brooklyn.",
        "copyright": "Spencer Platt/Getty Images"
      },
      {
        "url": "https://static01.nyt.com/images/2019/07/02/business/02tesla2/merlin_153968928_7b3f43b1-9d4c-43b2-b8de-17d5fad171fe-superJumbo.jpg",
        "format": "superJumbo",
        "height": 1365,
        "width": 2048,
        "type": "image",
        "subtype": "photo",
        "caption": "Deliveries in April to a Tesla showroom in Brooklyn.",
        "copyright": "Spencer Platt/Getty Images"
      }
    ],
    "short_url": "https://nyti.ms/2Jjz8rz"
  },
  {
    "section": "Business",
    "subsection": "Media",
    "title": "Netflix Has a Talk Show Problem",
    "abstract": "For sitcoms, dramas and reality shows, the jump to streaming was easy. But talk shows? It’s tricky.",
    "url": "https://www.nytimes.com/2019/07/02/business/media/netflix-talk-shows.html",
    "byline": "By JOHN KOBLIN",
    "item_type": "Article",
    "updated_date": "2019-07-02T11:29:08-04:00",
    "created_date": "2019-07-02T11:29:08-04:00",
    "published_date": "2019-07-02T11:29:08-04:00",
    "material_type_facet": "",
    "kicker": "",
    "des_facet": [
      "Television",
      "Chelsea (TV Program)",
      "Patriot Act (TV Program)"
    ],
    "org_facet": [
      "Netflix Inc"
    ],
    "per_facet": [
      "Handler, Chelsea",
      "McHale, Joel",
      "Wolf, Michelle",
      "Letterman, David",
      "Macdonald, Norm",
      "Minhaj, Hasan (1985- )"
    ],
    "geo_facet": [],
    "multimedia": [
      {
        "url": "https://static01.nyt.com/images/2019/06/27/business/27NETFLIXTALKS-02/merlin_141488595_a06501e1-2048-4a12-8728-806efb9703cc-thumbStandard.jpg",
        "format": "Standard Thumbnail",
        "height": 75,
        "width": 75,
        "type": "image",
        "subtype": "photo",
        "caption": "Among other cancellations: “The Break With Michelle Wolf.” Ms. Wolf drew attention for skewering Trump administration members at the 2018 White House Correspondents’ Association dinner.",
        "copyright": "Netflix"
      },
      {
        "url": "https://static01.nyt.com/images/2019/06/27/business/27NETFLIXTALKS-02/merlin_141488595_a06501e1-2048-4a12-8728-806efb9703cc-thumbLarge.jpg",
        "format": "thumbLarge",
        "height": 150,
        "width": 150,
        "type": "image",
        "subtype": "photo",
        "caption": "Among other cancellations: “The Break With Michelle Wolf.” Ms. Wolf drew attention for skewering Trump administration members at the 2018 White House Correspondents’ Association dinner.",
        "copyright": "Netflix"
      },
      {
        "url": "https://static01.nyt.com/images/2019/06/27/business/27NETFLIXTALKS-02/merlin_141488595_a06501e1-2048-4a12-8728-806efb9703cc-articleInline.jpg",
        "format": "Normal",
        "height": 106,
        "width": 190,
        "type": "image",
        "subtype": "photo",
        "caption": "Among other cancellations: “The Break With Michelle Wolf.” Ms. Wolf drew attention for skewering Trump administration members at the 2018 White House Correspondents’ Association dinner.",
        "copyright": "Netflix"
      },
      {
        "url": "https://static01.nyt.com/images/2019/06/27/business/27NETFLIXTALKS-02/27NETFLIXTALKS-02-mediumThreeByTwo210.jpg",
        "format": "mediumThreeByTwo210",
        "height": 140,
        "width": 210,
        "type": "image",
        "subtype": "photo",
        "caption": "Among other cancellations: “The Break With Michelle Wolf.” Ms. Wolf drew attention for skewering Trump administration members at the 2018 White House Correspondents’ Association dinner.",
        "copyright": "Netflix"
      },
      {
        "url": "https://static01.nyt.com/images/2019/06/27/business/27NETFLIXTALKS-02/merlin_141488595_a06501e1-2048-4a12-8728-806efb9703cc-superJumbo.jpg",
        "format": "superJumbo",
        "height": 1139,
        "width": 2048,
        "type": "image",
        "subtype": "photo",
        "caption": "Among other cancellations: “The Break With Michelle Wolf.” Ms. Wolf drew attention for skewering Trump administration members at the 2018 White House Correspondents’ Association dinner.",
        "copyright": "Netflix"
      }
    ]
  }
];

describe('Article service:', async () => {
  let service;

  beforeEach(() => {
    service = new ArticleService(nytimesHttpMock);
  });

  describe('method getArticles', async () => {
    it('should return 12 articles for section "technology" and 12 as limit', async () => {
      const articles = await service.getArticles(['technology'], 12);
      expect(articles).to.be.an('array').with.lengthOf(12);
    });

    it('should return 2 more recent articles for section "technology" and 2 as limit', async () => {
      const articles = await service.getArticles(['technology'], 2);
      expect(articles).deep.to.equal(EXPECTED_TWO_MORE_RECENT_ARTICLES);
    });

    it('should return 5 articles for two different sections and 5 as limit', async () => {
      const articles = await service.getArticles(['technology'], 5);
      expect(articles).to.be.an('array').with.lengthOf(5);
    });

    it('should return empty array for null section', async () => {
      const articles = await service.getArticles(null, 12);
      expect(articles).to.be.empty;
    });

    it('should return empty array for empty section', async () => {
      const articles = await service.getArticles([], 12);
      expect(articles).to.be.empty;
    });

    it('should return empty array for blank section', async () => {
      const articles = await service.getArticles([''], 12);
      expect(articles).to.be.empty;
    });
  });

  describe('method getArticle', async () => {
    it('should return article for title "Would You Pay $30 a Month to Check Your Email?" and section "technology"', async () => {
      const title = 'Would You Pay $30 a Month to Check Your Email?';
      const article = await service.getArticle(title, ['technology']);
      expect(article).to.deep.equal(EXPECTED_WOULD_YOU_PAY_ENTIRE_ARTICLE);
    });

    it('should not return article for empty title', async () => {
      const article = await service.getArticle('', ['technology']);
      expect(article).to.deep.equal({});
    });

    it('should not return article for null title', async () => {
      const article = await service.getArticle(null, ['technology']);
      expect(article).to.deep.equal({});
    });

    it('should not return article for null sections', async () => {
      const title = 'Would You Pay $30 a Month to Check Your Email?';
      const article = await service.getArticle(title, null);
      expect(article).to.deep.equal({});
    });

    it('should not return article for empty sections', async () => {
      const title = 'Would You Pay $30 a Month to Check Your Email?';
      const article = await service.getArticle(title, []);
      expect(article).to.deep.equal({});
    });

    it('should not return article for empty sections', async () => {
      const title = '"Would You Pay';
      const article = await service.getArticle(title, []);
      expect(article).to.deep.equal({});
    });
  });
});
