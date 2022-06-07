import React from 'react';
import { NavLink } from 'react-router-dom';
import './index.scss';

const TERMS_AND_POLICE_MENU = [
  {
    path: '/terms',
    label: 'Terms of Service'
  },
  {
    path: '/policy',
    label: 'Privacy Policy'
  }
];

const TermsAndPoliceMenu = () => {
  return (
    <div className="terms_and_police_menu__wrapper">
      {TERMS_AND_POLICE_MENU.map((link, index) => (
        <NavLink key={index} to={link.path} className="terms_and_police_menu__item">
          {link.label}
        </NavLink>
      ))}
    </div>
  );
};

export default TermsAndPoliceMenu;
