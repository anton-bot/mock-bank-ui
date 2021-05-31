import { lang } from '../../languages/lang';
import { Link } from 'react-router-dom';
import './SiteMenu.scss';
import { useState } from 'react';

export const SiteMenu = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={`SiteMenu ${expanded ? 'expanded' : 'collapsed'}`}>
      <div className="hamburger" onClick={() => setExpanded(!expanded)}>
        {expanded ? '✕' : '☰'}
      </div>
      <div className="menu-items">
        {lang().menu.map(({ link, text }) => (
          <Link to={link} key={link} onClick={() => setExpanded(false)}>
            {text}
          </Link>
        ))}
      </div>
    </div>
  );
};
