import * as React from 'react';
import * as classnames from 'classnames';
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import './index.scss';

const ProfileTopMenu = ({ isCustomer, role, userStatus }) => {
  const history = useHistory();
  const location = useLocation();
  const routeIsEnabled = !!userStatus?.is_profile_completed && !!userStatus?.is_account_completed;
  
  const PROFILE_MENU = {
    PROFILE: {
      label: 'Profile',
      path: '/profile/edit'
    },
    INBOX: {
      label: 'Inbox',
      path: '/inbox'
    },
    TEAM: {
      label: 'Team',
      path: '/team'
    },
    PROJECTS: {
      label: 'Projects',
      path: '/projects'
    },
    ACCOUNT: {
      label: 'Account',
      path: '/account'
    },
    PAYMENTS: {
      label: 'Payments',
      path: '/payments'
    }
  };

  return (
    <div className="profile_top_menu__wrapper">
      <div className="container">
        <div className="profile_top_menu">

          {<div
            onClick={() => history.push(PROFILE_MENU.PROFILE.path)}
            className={classnames(
              'profile_top_menu__link',
              PROFILE_MENU.PROFILE.path === location.pathname ? 'profile_top_menu__link_active' : ''
            )}
          >
            {PROFILE_MENU.PROFILE.label}
          </div>}

          {routeIsEnabled ? 
          <div
            onClick={() => history.push(PROFILE_MENU.INBOX.path)}
            className={classnames(
              'profile_top_menu__link',
              PROFILE_MENU.INBOX.path === location.pathname ? 'profile_top_menu__link_active' : ''
            )}
          >
            {PROFILE_MENU.INBOX.label}
          </div> : 
          <div className="profile_top_menu__link_disabled">
            {PROFILE_MENU.INBOX.label}
          </div>
          } 

          {routeIsEnabled ? 
          <div
            onClick={() => history.push(PROFILE_MENU.TEAM.path)}
            className={classnames(
              'profile_top_menu__link',
              PROFILE_MENU.TEAM.path === location.pathname ? 'profile_top_menu__link_active' : ''
            )}
          >
            {isCustomer ? PROFILE_MENU.TEAM.label : 'Customers'}
          </div> : 
          <div className="profile_top_menu__link_disabled">
            {isCustomer ? PROFILE_MENU.TEAM.label : 'Customers'}
          </div>
          } 

          {routeIsEnabled ?
          <div
            onClick={() => history.push(PROFILE_MENU.PROJECTS.path)}
            className={classnames(
              'profile_top_menu__link',
              PROFILE_MENU.PROJECTS.path === location.pathname ? 'profile_top_menu__link_active' : ''
            )}
          >
            {PROFILE_MENU.PROJECTS.label}
          </div> : 
          <div className="profile_top_menu__link_disabled">
            {PROFILE_MENU.PROJECTS.label}
          </div>
          } 

          {<div
            onClick={() => history.push(PROFILE_MENU.ACCOUNT.path)}
            className={classnames(
              'profile_top_menu__link',
              PROFILE_MENU.ACCOUNT.path === location.pathname ? 'profile_top_menu__link_active' : ''
            )}
          >
            {PROFILE_MENU.ACCOUNT.label}
          </div>}

          {routeIsEnabled ?
          <div
            onClick={() => history.push(PROFILE_MENU.PAYMENTS.path)}
            className={classnames(
              'profile_top_menu__link',
              PROFILE_MENU.PAYMENTS.path === location.pathname ? 'profile_top_menu__link_active' : ''
            )}
          >
            {PROFILE_MENU.PAYMENTS.label}
          </div> : 
          <div className="profile_top_menu__link_disabled">
            {PROFILE_MENU.PAYMENTS.label}
          </div>
          } 

          <span className={`profile_top_menu__role role_${role}`}>{role}</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileTopMenu;
