import * as React from 'react';
import { NavLink } from 'react-router-dom';
import './index.scss';

const FOOTER_MENU = [
  {
    path: '/resources',
    label: 'Resources'
  },
  {
    path: '/about',
    label: 'FAQ'
  },
  {
    path: '/feedback',
    label: 'Feedback and Support'
  },
  {
    path: '/terms',
    label: 'Terms of Service'
  },
  {
    path: '/policy',
    label: 'Privacy Policy'
  }
];

const FooterMenu = () => (
  <div className="footer_menu__wrapper">
    {FOOTER_MENU.map((link, index) => (
      <NavLink key={index} to={link.path} className="footer_menu__item">
        {link.label}
      </NavLink>
    ))}
  </div>
);

export default FooterMenu;
