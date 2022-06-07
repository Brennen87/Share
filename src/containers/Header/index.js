import * as React from 'react';
import { NavLink } from 'react-router-dom';
import SearchBar from '../SearchBar';
import DropdownIcon from '../../components/UI/DropdownIcon';
import IconBurger from '../../components/UI/IconBurger';
import logoType from '../../assets/icons/logo.png';
import OutsideClickHandler from 'react-outside-click-handler';
import UserMenu from '../../components/UserMenu';
import MobileMenu from '../MobileMenu';
import * as classnames from 'classnames';
import './index.scss';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isOpenMobMenu: false };
  }

  render() {
    const { history, user, fetchUserStatus, categories, logout, switchRole } = this.props;

    return (
      <header className="header__wrapper">
        <div className={classnames('container', 'header')}>
          <div className="header__logo" onClick={() => history.push('/home')}>
            <img src={logoType} alt="logo, kuprik.com" />
          </div>
          <div className="header__menu">
            <CategoryMenu categories={categories} />
            <NavLink to="/vendors" className="header__categories_label txt-shadow">
              Vendors
            </NavLink>
          </div>
          <SearchBar className="header__search" />
          {user ? (
            <UserMenu
              className="header__user_menu"
              user={user}
              logout={logout}
              switchRole={switchRole}
              fetchUserStatus={fetchUserStatus}
            />
          ) : (
            <div className="header__auth">
              <NavLink to="/login" className="header__auth_label txt-shadow">
                Log In
              </NavLink>
              <NavLink to="/register" className="header__auth_label txt-shadow">
                Sign Up
              </NavLink>
            </div>
          )}
          <div className="header__mobile_icon">
            <OutsideClickHandler onOutsideClick={() => this.setState({ isOpenMobMenu: false })}>
              <IconBurger
                onClick={() => this.setState({ isOpenMobMenu: true })}
                className="header__mobile_icon_burger"
              />
              <MobileMenu
                user={user}
                isOpen={this.state.isOpenMobMenu}
                closeMenu={() => this.setState({ isOpenMobMenu: false })}
              />
            </OutsideClickHandler>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;

const CategoryMenu = ({ categories }) => (
  <div className="header__categories">
    <span className={classnames('txt-shadow', 'header__categories_label')}>Services</span>
    <DropdownIcon className="header__categories_arrow" />
    <div className="header__categories_menu__hover">
      {categories && categories.data && (
        <div className={classnames('header__categories_menu')}>
          <div className="header__categories_menu_wrapper">
            {categories &&
              categories.data &&
              categories.data.list &&
              categories.data.list.map(category => (
                <NavLink
                  to={`/vendors?limit=10&page=1&services=${category.id}`}
                  className="header__categories_menu_link"
                  key={category.id}
                >
                  {category.name}
                </NavLink>
              ))}
          </div>
        </div>
      )}
    </div>
  </div>
);
