import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import InputSearch from '@/components/InputSearch.vue';

describe.only('InputSearch.vue', () => {
  it('renders props.placeholder when passed', () => {
    const wrapper = shallowMount(InputSearch, {
      propsData: { placeholder: 'Search here...' },
    });

    expect(wrapper.html()).to.include('Search here...');
  });

  it('emit focus event when input get focus', () => {
    const wrapper = shallowMount(InputSearch);

    wrapper.find('input').trigger('focus');

    expect(wrapper.emitted()).to.have.property('focus');
  });

  it('emit keyup event after typing', () => {
    const wrapper = shallowMount(InputSearch);

    wrapper.find('input').setValue('article title');
    wrapper.find('input').trigger('keyup');

    expect(wrapper.emitted().keyup[0][0]).to.equal('article title');
  });

  // it('emit change event after typing', () => {
  //   const wrapper = shallowMount(InputSearch);

  //   wrapper.find('input').setValue('tech');

  //   expect(wrapper.emitted()).to.have.property('change');
  // });
});
