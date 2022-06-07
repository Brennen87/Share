import * as React from 'react';
import * as classnames from 'classnames';
import Avatar from '../Avatar';
import DropdownIcon from '../UI/DropdownIcon';
import SwitchRoleIcon from './icons/SwitchRoleIcon';
import { Link } from 'react-router-dom';
import ViewProfileIcon from './icons/ViewProfileIcon';
import LogoutIcon from './icons/LogoutIcon';
import { getFullName } from '../../helpers';
import { ROLES } from '../../common/constants';
import './index.scss';

const UserMenu = ({ user, logout, switchRole, fetchUserStatus, className }) => {
  const onSwitchRole = async () => {
    await switchRole();
    try {
      await fetchUserStatus(user);
    } catch(error) {
      console.error("Error loading user status");
      console.error(error);
    }
  }

  return (
    <div className={classnames('user_menu', className)}>
      <Avatar
        image={user.avatar}
        alt={getFullName(user.firstName, user.lastName)}
        online
        sizeSmall
      />
      <div className={classnames('txt-shadow user_menu__fullname')}>
        {getFullName(user.firstName, user.lastName)}
        <DropdownIcon className="user_menu__arrow" />
      </div>
      <div className="user_menu__menu_wrapper">
        <div className={classnames('user_menu__menu')}>
          <div className="user_menu__menu_link" onClick={onSwitchRole}>
            <SwitchRoleIcon />
            <span>Switch to {user.role === ROLES.customer ? 'Vendor' : 'Customer'}</span>
          </div>
          {user && (
            <Link to={`/${user.role}/${user.username}`} className="user_menu__menu_link">
              <ViewProfileIcon />
              <span>View Public Profile</span>
            </Link>
          )}
          <div className="user_menu__menu_link" onClick={() => logout()}>
            <LogoutIcon />
            <span>Log out</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserMenu;
