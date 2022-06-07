import React from 'react';
import SmallButton from '../../../../components/UI/SmallButton';
import { VENDOR_STATUSES } from '../../../../common/constants';
import { acknowledgeVerification, fetchProfile } from '../../../../store/actions/profileActions';
import { connect } from 'react-redux';

const ProfileVerificationPending = ({ fetchProfile, vendor, acknowledgeVerification }) => {
  const isCredentialsVerified = 
    vendor && 
    vendor.data && 
    vendor.data.verification_status === VENDOR_STATUSES.CREDENTIALS_VERIFIED;
  
  const handleAcknowledgeVerification = async () => {
    await acknowledgeVerification();
    await fetchProfile();
  };

  return (
    <div className="profile_verification">
      <div className="profile_verification__top">
        <span className="profile_verification__title">Verification of Credentials</span>
        <span className={`profile_verification__status ${isCredentialsVerified ? 'success' : ''}`}>{isCredentialsVerified ? 'CREDENTIALS VERIFIED' : 'IN PROGRESS'}</span>
      </div>
      <div className="profile_verification__content">
        <p className="profile_verification__description">
          {
            isCredentialsVerified
            ? "Congratulations and welcome to Kuprik! We are excited to have you on our platform, get started, and discover what it can do for you."
            : "Thank you for submitting your documents for verification. We have received them and will notify/contact you if any additional steps are needed. The verification process could take anywhere from three (3) to seven (7) days. If an interview is necessary, it might take an additional seven (7) days or more, depending on your and our team's availability."
          }
        </p>
        {isCredentialsVerified && <SmallButton
          onClick={handleAcknowledgeVerification}
          label="Access Profile"
          className="profile_verification__btn_small"
        />}
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  vendor: state.profileStore.vendor
});

const mapDispatchToProps = dispatch => ({
  acknowledgeVerification: () => dispatch(acknowledgeVerification()),
  fetchProfile: () => dispatch(fetchProfile()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileVerificationPending);