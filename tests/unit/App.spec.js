import { render } from '@testing-library/vue';
import App from '../../src/App.vue';
import ParentMockComponents from '../mocks/ParentMockComponents';

describe('App.vue', () => {
  it('renders', () => {
    const wrapper = render(App, {
      stubs: ['b-spinner'],
      parentComponent: ParentMockComponents
    })

    wrapper.getByTestId('app-element')
  })
})