import { formatBankAccountNumber } from '../../functions/formatBankAccountNumber';
import './AccountNumber.scss';

type Props = {
  accountNumber: string;
};

export const AccountNumber: React.FC<Props> = (props) => (
  <div className="AccountNumber">{formatBankAccountNumber(props.accountNumber)}</div>
);
