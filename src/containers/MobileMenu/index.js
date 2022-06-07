import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import * as classnames from 'classnames';
import { connect } from 'react-redux';
import UserMobileMenu from '../UserMobileMenu';
import ArrowBottom from '../../components/UserMenu/icons/ArrowBottom';
import './index.scss';

const MobileMenu = ({ user, categories, isOpen, closeMenu }) => {
  const [isOpenDD, setDropDown] = useState(false);

  return (
    <div className={classnames('mobile_menu', isOpen && 'mobile_menu__active', (user === null) && 'mobile_menu__logged_out')}>
      <div className="mobile_menu__inner">
        <div onClick={closeMenu} className="mobile_menu__close_btn">
          <svg
            width="15"
            height="16"
            viewBox="0 0 15 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              y="13.5137"
              width="18.9199"
              height="2.14999"
              rx="1.075"
              transform="rotate(-45 0 13.5137)"
              fill="#FF8C00"
            />
            <rect
              x="1.62158"
              width="18.9199"
              height="2.14999"
              rx="1.075"
              transform="rotate(45 1.62158 0)"
              fill="#FF8C00"
            />
          </svg>
        </div>
        <div className="mobile_menu__top">
          {user ? (
            <UserMobileMenu closeMenu={closeMenu} />
          ) : (
            <ul className="mobile_menu__list">
              <li className="mobile_menu__item">
                <NavLink
                  to="/login"
                  className="mobile_menu__item__link mobile_menu__bold"
                  onClick={closeMenu}
                >
                  Log in
                </NavLink>
              </li>
              <li className="mobile_menu__item">
                <NavLink
                  to="/register"
                  className="mobile_menu__item__link mobile_menu__bold"
                  onClick={closeMenu}
                >
                  Sign Up
                </NavLink>
              </li>
            </ul>
          )}
        </div>
        <div className="mobile_menu__bottom">
          <div className="mobile_menu__list">
            <div className="mobile_menu__item">
              <div
                className={classnames(
                  isOpenDD ? 'mobile_menu_dropdown__open' : 'mobile_menu__item_dd'
                )}
              >
                <div
                  className="mobile_menu_dropdown__link mobile_menu__link_bold"
                  onClick={() => {
                    setDropDown(!isOpenDD);
                  }}
                >
                  Services
                  <ArrowBottom />
                </div>
              </div>
            </div>
            <div
              className={classnames(
                'mobile_menu__submenu',
                isOpenDD && 'mobile_menu_dropdown__open'
              )}
            >
              {categories &&
                categories.data &&
                categories.data.list &&
                categories.data.list.map((item, index) => (
                  <div key={index} className="mobile_menu__item">
                    <NavLink
                      to={`/vendors?limit=10&page=1&services=${item.id}`}
                      className="mobile_menu__item__link"
                      onClick={closeMenu}
                    >
                      {item.name}
                    </NavLink>
                  </div>
                ))}
            </div>
            <div className="mobile_menu__item">
              <NavLink
                to="/vendors"
                className="mobile_menu__item__link mobile_menu__link_bold"
                onClick={closeMenu}
              >
                Vendors
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({ categories: state.commonStore.categoriesList });

export default connect(mapStateToProps)(MobileMenu);
