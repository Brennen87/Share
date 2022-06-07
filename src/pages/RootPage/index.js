import * as React from 'react';
import * as classnames from 'classnames';
import { renderRoutes } from 'react-router-config';
import Header from '../../containers/Header';
import Footer from '../../containers/Footer';
import { connect } from 'react-redux';
import {
  logoutUser,
  fetchUserStatus
} from '../../store/actions/authActions';
import { fetchCategories } from '../../store/actions/commonActions';
import ProfileTopMenu from '../../components/ProfileTopMenu';
import { ROLES } from '../../common/constants';
import { switchRole } from '../../store/actions/accountActions';
import './index.scss';

class RootPage extends React.Component {
  componentDidMount() {
    this.props.fetchCategories();
  }

  allowedRoutes(user, userStatus) {
    const { routes } = this.props && this.props.route;
    return routes ? routes.filter(route => (route.auth ? route.auth(user, userStatus) : true)) : [];
  }

  render() {
    const { history, user, userStatus, categoriesList, logout, switchRole, fetchUserStatus } = this.props;
    const userData = user && {
      avatar: user.avatar,
      firstName: user.first_name,
      lastName: user.last_name,
      vendorId: user.vendor_id,
      username: user.username,
      role: user.role
    };

    return (
      <div className="root_page">
        <div className="root_page__fixed">
          <Header
            history={history}
            user={userData}
            logout={logout}
            categories={categoriesList}
            switchRole={switchRole}
            fetchUserStatus={fetchUserStatus}
          />
          {userData && (
            <ProfileTopMenu 
              isCustomer={userData.role === ROLES.customer}
              role={userData.role}
              userStatus={userStatus}
            />
          )}
        </div>
        <main className={classnames(userData && 'main_authorised')}>
          {renderRoutes(this.allowedRoutes(user, userStatus), { user, userStatus })}
        </main>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.userStore.user,
  userStatus: state.userStore.userStatus,
  categoriesList: state.commonStore.categoriesList,
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logoutUser()),
  switchRole: () => dispatch(switchRole()),
  fetchCategories: () => dispatch(fetchCategories()),
  fetchUserStatus: user => dispatch(fetchUserStatus(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RootPage);
