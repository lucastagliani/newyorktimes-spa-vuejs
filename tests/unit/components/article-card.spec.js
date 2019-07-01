import { expect } from 'chai';
import { shallowMount, RouterLinkStub } from '@vue/test-utils';
import ArticleCard from '@/components/ArticleCard.vue';

const fakeArticle = {
  title: 'NASA Reopens Apollo Mission Control Room That Once Landed Men on Moon',
  context: 'Science',
  published_date: '2019-06-29T10:23:15-04:00',
  byline: 'By DAVID W. BROWN',
};

describe('ArticleCard.vue', () => {
  it('renders props.title when passed', () => {
    const wrapper = shallowMount(ArticleCard, {
      propsData: { title: fakeArticle.title },
      stubs: { RouterLink: RouterLinkStub },
    });
    expect(wrapper.text()).to.include(fakeArticle.title);
  });

  it('renders props.context when passed', () => {
    const wrapper = shallowMount(ArticleCard, {
      propsData: { context: fakeArticle.context },
      stubs: { RouterLink: RouterLinkStub },
    });
    expect(wrapper.text()).to.include(fakeArticle.context);
  });

  it('renders props.published_date as locale datetime when passed', () => {
    const wrapper = shallowMount(ArticleCard, {
      propsData: { published_date: fakeArticle.published_date },
      stubs: { RouterLink: RouterLinkStub },
    });

    const localPublishedDate = new Date(fakeArticle.published_date).toLocaleString();

    expect(wrapper.text()).to.include(localPublishedDate);
  });

  it('renders props.byline when passed', () => {
    const wrapper = shallowMount(ArticleCard, {
      propsData: { byline: fakeArticle.byline },
      stubs: { RouterLink: RouterLinkStub },
    });
    expect(wrapper.text()).to.include(fakeArticle.byline);
  });
});
