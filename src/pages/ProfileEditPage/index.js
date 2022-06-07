import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import ProfileEditBasicSection from '../../containers/ProfileEdit/ProfileEditBasicSection';
import ProfileEditSummarySection from '../../containers/ProfileEdit/ProfileEditSummarySection';
import ProfileEditPortfolioSection from '../../containers/ProfileEdit/ProfileEditPortfolioSection';
import DocumentTitle from '../../components/DocumentTitle';
import Button from '../../components/UI/Button';
import ProfileVerification from '../../containers/ProfileEdit/ProfileVerification';
import './index.scss';
import { ROLES, VENDOR_STATUSES } from '../../common/constants';
import { fetchProfile } from '../../store/actions/profileActions';

const ProfileEditPage = ({ profile, vendor, route, user, dispatchFetchProfile, history }) => {
  useEffect(() => {
    dispatchFetchProfile();
  }, [dispatchFetchProfile]);

  useEffect(() => {
    if (vendor && !vendor.loading && vendor.data) {
      toggleModal(vendor.data.verification_status !== VENDOR_STATUSES.ACKNOWLEDGED);
    }

    if (user.role === ROLES.vendor) {
      setIsPublicProfileActive(
        Boolean(
          vendor.data &&
            vendor.data.mini_resume &&
            profile.data.avatar &&
            vendor.data.services?.length &&
            vendor.data.expertises?.length &&
            vendor.data.rate
        )
      );
    } else {
      setIsPublicProfileActive(Boolean(profile.data && profile.data.country));
    }
  }, [user, profile, vendor]);

  const [showModal, toggleModal] = useState(false);
  const [isPublicProfileActive, setIsPublicProfileActive] = useState(false);

  const goToPublicProfile = () => {
    history.push(`/${user.role}/${user.username}`);
  };

  return (
    <DocumentTitle title={route.pageTitle}>
      <div className="container">
        <div className="profile_edit_page__wrap">
          <div className="profile_edit_page">
            <ProfileEditBasicSection className="profile_edit_page__basic_section" />

            {user && user.role === ROLES.vendor && (
              <>
                {showModal && <ProfileVerification />}
                {!showModal && vendor && vendor.data && vendor.data.id && (
                  <>
                    <ProfileEditSummarySection className="profile_edit_page__summary_section" />
                    <ProfileEditPortfolioSection className="profile_edit_page__portfolio_section" />
                  </>
                )}
              </>
            )}

            <Button
              label="View Public Profile"
              className="profile_edit_page__button"
              disabled={!isPublicProfileActive}
              onClick={goToPublicProfile}
            />
          </div>
        </div>
      </div>
    </DocumentTitle>
  );
};

const mapStateToProps = state => ({
  user: state.userStore.user,
  vendor: state.profileStore.vendor,
  profile: state.profileStore.profile
});

const mapDispatchToProps = dispatch => ({
  dispatchFetchProfile: () => dispatch(fetchProfile())
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileEditPage);
