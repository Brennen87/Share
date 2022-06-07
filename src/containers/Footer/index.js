import * as React from 'react';
import * as classnames from 'classnames';
import FooterMenu from '../../components/FooterMenu';
import SocialBar from '../../components/SocialBar';
import './index.scss';

const Footer = () => (
  <footer className="footer__wrapper">
    <div className={classnames('container', 'footer')}>
      <div className="footer__top_menu">
        <FooterMenu />
        <div className="footer__social_menu">
          <div className="footer__social_menu_label">Follow</div>
          <SocialBar />
        </div>
      </div>
      <div className="footer__copyright">
        <div className="footer__copyright_text">
          <i>Copyright © 2021 Kuprik LLC.</i>
          <span className="test" />
          <i>
            All rights reserved. <div className="footer__copyright_icon_small" />
          </i>
        </div>
        <div className="footer__copyright_icon" />
      </div>
    </div>
  </footer>
);

export default Footer;
