import { render } from '@testing-library/vue';
import SubscriberContainer from '../../../src/components/subscriber/SubscriberContainer.vue';

const initStore = {
  rawActualRate: 0.1,
  rawLow: 4,
  rawHigh: 20,
  engActual: 0,
  engLow: -70,
  engHigh: 70
};

jest.mock('../../../src/store', () => ({
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

describe('SubscriberContainer.vue', () => {
  it('renders', () => {
    const wrapper = render(SubscriberContainer, {
      stubs: ['b-spinner'],
      parentComponent: Parent
    })

    wrapper.getByTestId('subscriber-container-element')
  })
})