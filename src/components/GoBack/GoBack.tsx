import { Link } from 'react-router-dom';
import './GoBack.scss';

type Props = {
  to: string;
};

export const GoBack: React.FC<Props> = (props) => {
  return (
    <div className="GoBack">
      <Link to={props.to}>{props.children}</Link>
    </div>
  );
};
