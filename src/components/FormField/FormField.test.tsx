import { render } from '@testing-library/react';
import { FormField } from './FormField';
import renderer from 'react-test-renderer';

describe('Form Field', () => {
  it('must show an error when field was edited and input is invalid', () => {
    const { getByText } = render(
      <FormField label="Account Number" error="Invalid account number" touched={true}>
        <input />
      </FormField>,
    );

    expect(getByText(/Invalid account number/)).toBeInTheDocument();
  });

  it('must not show an error when field has an invalid input, but it was not edited', () => {
    const { queryByText } = render(
      <FormField label="Account Number" error="Invalid account number" touched={false}>
        <input />
      </FormField>,
    );

    expect(queryByText(/Invalid account number/)).toBeNull();
  });

  it('matches snapshot', () => {
    const tree = renderer
      .create(
        <FormField label="Account Number" error={undefined} touched={false}>
          <input />
        </FormField>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
