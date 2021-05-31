import { Logo } from '../Logo/Logo';
import { SiteMenu } from '../SiteMenu/SiteMenu';
import './PageHeader.scss';

export const PageHeader: React.FC = (props) => (
  <div className="PageHeader">
    <div>
      <Logo />
    </div>
    <div>
      <SiteMenu />
    </div>
  </div>
);
