import { expect } from 'chai';
import { shallowMount, RouterLinkStub } from '@vue/test-utils';
import SectionCard from '@/components/SectionCard.vue';

const fakeSection = {
  name: 'world',
  slugs: ['world'],
  title: 'World',
  icon: 'globe',
  description: 'What is new around the globe?',
};

describe('SectionCard.vue', () => {
  it('renders props.title when passed', () => {
    const wrapper = shallowMount(SectionCard, {
      propsData: { title: fakeSection.title },
      stubs: { RouterLink: RouterLinkStub },
    });
    expect(wrapper.text()).to.include(fakeSection.title);
  });

  it('renders props.description when passed', () => {
    const wrapper = shallowMount(SectionCard, {
      propsData: { description: fakeSection.description },
      stubs: { RouterLink: RouterLinkStub },
    });
    expect(wrapper.text()).to.include(fakeSection.description);
  });

  it('renders props.icon as fontawesome icon when passed', () => {
    const wrapper = shallowMount(SectionCard, {
      propsData: { icon: fakeSection.icon },
      stubs: { RouterLink: RouterLinkStub },
    });
    expect(wrapper.html()).to.include(`<i class="fas fa-${fakeSection.icon}"></i>`);
  });
});
