import { render } from '@testing-library/vue';
import SubscriberContainer from '../../../src/components/subscriber/SubscriberContainer.vue';
import ParentMockComponents from '../../mocks/ParentMockComponents';

describe('SubscriberContainer.vue', () => {
  it('renders', () => {
    const wrapper = render(SubscriberContainer, {
      stubs: ['b-spinner'],
      parentComponent: ParentMockComponents
    })

    wrapper.getByTestId('subscriber-container-element')
  })
})