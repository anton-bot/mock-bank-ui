import { render } from '@testing-library/react';
import { AccountNumber } from './AccountNumber';

test('renders bank account number', () => {
  const { getByText } = render(<AccountNumber accountNumber="1234567890" />);

  expect(getByText(/123-4567-890/)).toBeInTheDocument();
});
