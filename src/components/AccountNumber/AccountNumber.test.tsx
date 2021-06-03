import { render } from '@testing-library/react';
import { AccountNumber } from './AccountNumber';
import renderer from 'react-test-renderer';

const SAMPLE_ACCOUNT_NUMBER = '1234567890';

describe('Account Number', () => {
  it('renders bank account number', () => {
    const { getByText } = render(<AccountNumber accountNumber={SAMPLE_ACCOUNT_NUMBER} />);

    expect(getByText(/123-4567-890/)).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const tree = renderer.create(<AccountNumber accountNumber={SAMPLE_ACCOUNT_NUMBER} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
