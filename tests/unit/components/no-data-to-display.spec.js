import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import NoDataToDisplay from '@/components/NoDataToDisplay.vue';

describe('NoDataToDisplay.vue', () => {
  it('renders props.message when passed', () => {
    const message = 'No data here today!';
    const wrapper = shallowMount(NoDataToDisplay, {
      propsData: { message },
    });
    expect(wrapper.text()).to.include(message);
  });
});
