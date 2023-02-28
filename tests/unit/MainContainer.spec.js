import { render } from '@testing-library/vue';
import MainContainer from '../../src/components/MainContainer.vue';
import ParentMockComponents from '../mocks/ParentMockComponents';

describe('MainContainer.vue', () => {
  it('renders', () => {
    const wrapper = render(MainContainer, {
      stubs: ['b-spinner'],
      parentComponent: ParentMockComponents
    })

    wrapper.getByTestId('main-container-element')
  })
})