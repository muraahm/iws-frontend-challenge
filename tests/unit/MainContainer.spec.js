import { render } from '@testing-library/vue';
import MainContainer from '../../src/components/MainContainer.vue';

const initStore = {
  rawActualRate: 0.1,
  rawLow: 4,
  rawHigh: 20,
  engActual: 0,
  engLow: -70,
  engHigh: 70
};

jest.mock('../../src/store', () => ({
  store: { ...initStore },
  initStore
}));

const Parent = {
  data() {
    return {
      mqtt: {
        unSub: jest.fn(),
        sub: jest.fn()
      }
    };
  }
};

describe('MainContainer.vue', () => {
  it('renders', () => {
    const wrapper = render(MainContainer, {
      stubs: ['b-spinner'],
      parentComponent: Parent
    })

    wrapper.getByTestId('main-container-element')
  })
})