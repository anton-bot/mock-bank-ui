import { Page } from '../../types/Page';
import { Logo } from '../Logo/Logo';
import { SiteMenu } from '../SiteMenu/SiteMenu';
import './PageHeader.scss';
import { Link } from 'react-router-dom';

export const PageHeader: React.FC = (props) => (
  <div className="PageHeader">
    <div>
      <Link to={Page.root}>
        <Logo />
      </Link>
    </div>
    <div>
      <SiteMenu />
    </div>
  </div>
);
