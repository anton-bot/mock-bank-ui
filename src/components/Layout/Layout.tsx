import './Layout.scss';
import { PageHeader } from '../PageHeader/PageHeader';

export const Layout: React.FC = (props) => (
  <div className="Layout">
    <PageHeader />
    <div className="main-content">{props.children}</div>
  </div>
);
