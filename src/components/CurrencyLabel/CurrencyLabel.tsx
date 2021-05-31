import { Currency } from '../../types/Currency';
import './CurrencyLabel.scss';

type Props = {
  currency: Currency;
};

export const CurrencyLabel: React.FC<Props> = ({ currency }) => (
  <div className={`CurrencyLabel ${currency}`}>{currency}</div>
);
