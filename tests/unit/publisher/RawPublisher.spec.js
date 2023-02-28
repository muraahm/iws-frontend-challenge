import { render } from '@testing-library/vue';
import RawPublisher from '../../../src/components/publisher/RawPublisher.vue';
import ParentMockComponents from '../../mocks/ParentMockComponents';

describe('RawPublisher.vue', () => {
  it('renders', () => {
    const wrapper = render(RawPublisher, {
      stubs: ['b-spinner'],
      parentComponent: ParentMockComponents
    })

    wrapper.getByTestId('raw-publisher-element')
  })
})