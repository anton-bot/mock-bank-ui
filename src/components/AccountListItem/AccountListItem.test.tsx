import { render } from '@testing-library/react';
import { AccountListItem } from './AccountListItem';
import { VALID_HKD_ACCOUNT } from '../../../tests/sample-data';

test('renders bank account details', () => {
  const { getByText } = render(<AccountListItem account={VALID_HKD_ACCOUNT} />);

  expect(getByText(/HKD/)).toBeInTheDocument();
  expect(getByText(/120-8911-909/)).toBeInTheDocument();
  expect(getByText(/HK\$5,500\.00/)).toBeInTheDocument();
});
