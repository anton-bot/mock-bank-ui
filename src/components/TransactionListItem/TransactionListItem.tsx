import { formatCurrency } from '../../functions/formatCurrency';
import { formatDate } from '../../functions/formatDate';
import { AccountTransaction } from '../../types/AccountTransaction';
import { AccountTransactionType } from '../../types/AccountTransactionType';
import { Currency } from '../../types/Currency';
import './TransactionListItem.scss';

type Props = {
  transaction: AccountTransaction;
  currency: Currency;
};

export const TransactionListItem: React.FC<Props> = (props) => {
  const { description, type, amount, datetime } = props.transaction;

  return (
    <div className="TransactionListItem">
      <div>
        <div className="description">{description}</div>
        <div className="datetime">{formatDate(datetime)}</div>
      </div>
      <div>
        <div className={`amount ${type}`}>
          {type === AccountTransactionType.credit ? '+' : '−'}
          {formatCurrency(amount, props.currency, 'number-only')}
        </div>
      </div>
    </div>
  );
};
