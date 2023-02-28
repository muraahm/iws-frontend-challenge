import { render } from '@testing-library/vue';
import CalibrationForm from '../../../src/components/subscriber/CalibrationForm.vue';
import ParentMockComponents from '../../mocks/ParentMockComponents';

describe('CalibrationForm.vue', () => {
  it('renders', () => {
    const wrapper = render(CalibrationForm, {
      stubs: ['b-spinner'],
      parentComponent: ParentMockComponents
    })

    wrapper.getByTestId('calibration-form-element')
  })
})