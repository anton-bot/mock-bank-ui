import renderer from 'react-test-renderer';
import { render } from '@testing-library/react';
import { CurrencyLabel } from './CurrencyLabel';
import { Currency } from '../../types/Currency';

describe('Currency Label', () => {
  it('must display a badge containing the currency name', () => {
    const { getByText } = render(<CurrencyLabel currency={Currency.HKD} />);

    expect(getByText(/HKD/)).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const tree = renderer.create(<CurrencyLabel currency={Currency.HKD} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
