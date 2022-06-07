import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PortfolioSection from '../../containers/PublicProfile/PortfolioSection';
import ReviewsSection from '../../containers/PublicProfile/ReviewsSection';
import Preloader from '../../components/Preloader';
import { fetchPublicProfile } from '../../store/actions/profileActions';
import DocumentTitle from '../../components/DocumentTitle';
import { getFullName } from '../../helpers';
import { ROLES } from '../../common/constants';
import PublicVendor from '../../containers/PublicProfile/PublicVendor';
import PublicCustomer from '../../containers/PublicProfile/PublicCustomer';
import './index.scss';
import EmptyData from '../../components/EmptyData';

class ProfilePublicPage extends React.Component {
  componentDidMount() {
    this.fetchUserData();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { role, username } = this.props.match.params;
    if (prevProps.match.params.role !== role || prevProps.match.params.username !== username) {
      this.fetchUserData();
    }
  }

  fetchUserData = () => {
    const { role, username } = this.props.match.params;
    if ((role === ROLES.vendor || role === ROLES.customer) && username) {
      role && username
        ? this.props.fetchPublicProfile(role, username)
        : this.props.history.push('/home');
      return;
    }
    this.props.history.push('/not-found');
  };

  setPageTitle = (title, vendor) => {
    if (vendor) {
      return `Profile of ${getFullName(vendor.first_name, vendor.last_name)}`;
    }
    return title;
  };

  render() {
    const { publicProfile, route, user } = this.props;
    const { role, username } = this.props.match.params;
    const isVendor = role === ROLES.vendor;

    if (publicProfile.error) {
      console.error(publicProfile.error);
      return <Redirect to="/not-found" />;
    }

    const data = isVendor ? publicProfile.vendor : publicProfile.customer;

    if (!data || publicProfile.loading) {
      return <Preloader className="profile_pub_page__preloader" />;
    }

    const isProfileValid = isVendor ? data.avatar && data.mini_resume : data.country;
    if (data.username === username && !isProfileValid && user?.username !== username) {
      return <Redirect to="/not-found" />;
    }

    return (
      <DocumentTitle title={this.setPageTitle(route.pageTitle, publicProfile.data)}>
        {!isProfileValid && user.username === username ? (
          <EmptyData text={`Please complete your profile.`} />
        ) : (
          <div className="container">
            <div className="profile_pub_page">
              {isVendor ? <PublicVendor vendor={data} /> : <PublicCustomer customer={data} />}
              {isVendor && <PortfolioSection vendorId={data.id} />}
              <ReviewsSection role={role} id={data.id} />
            </div>
          </div>
        )}
      </DocumentTitle>
    );
  }
}

const mapStateToProps = state => ({
  publicProfile: state.profileStore.publicProfile,
  user: state.userStore.user
});

const mapDispatchToProps = dispatch => ({
  fetchPublicProfile: (role, username) => dispatch(fetchPublicProfile(role, username))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePublicPage);
