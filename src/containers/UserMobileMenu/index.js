import React from 'react';
import Avatar from '../../components/Avatar';
import { NavLink } from 'react-router-dom';
import { logoutUser } from '../../store/actions/authActions';
import { connect } from 'react-redux';
import { ROLES } from '../../common/constants';
import { switchRole } from '../../store/actions/accountActions';
import './index.scss';

const UserMobileMenu = ({ user, logout, closeMenu, switchRole }) => {
  return (
    <div className="user_mobmenu">
      <div className="user_mobmenu__top">
        <Avatar
          image={user.avatar}
          alt="avatar"
          online
          style={{ marginRight: '10px' }}
          className="user_mobmenu__avatar"
        />
        <span>{`${user.first_name} ${user.last_name}`}</span>
      </div>
      <span className="user_mobmenu__status">{user.role}</span>
      <div className="user_mobmenu__bottom">
        <div className="user_mobmenu__list">
          <div className="user_mobmenu__item">
            <NavLink
              to="/"
              className="user_mobmenu__link"
              onClick={() => {
                switchRole();
                closeMenu();
              }}
            >
              Switch to {user.role === ROLES.customer ? 'Vendor' : 'Customer'}
            </NavLink>
          </div>
          <div className="user_mobmenu__item">
            <NavLink
              to={`/${user.role}/${user.username}`}
              className="user_mobmenu__link"
              onClick={closeMenu}
            >
              View Public Profile
            </NavLink>
          </div>
          <div className="user_mobmenu__item">
            <div onClick={() => logout()} className="user_mobmenu__link">
              Log out
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({ user: state.userStore.user });

const mapDispatchToProps = dispatch => ({
  switchRole: () => dispatch(switchRole()),
  logout: () => dispatch(logoutUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(UserMobileMenu);
