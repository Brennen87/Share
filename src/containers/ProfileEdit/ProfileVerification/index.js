import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import ProfileVerificationPending from './ProfileVerficationPending';
import ProfileVerificationCredentials from './ProfileVerificationCredentails';
import { VENDOR_STATUSES } from '../../../common/constants';
import './index.scss';

const ProfileVerification = ({ vendor }) => {
  const actualStepIndex =
    vendor &&
    vendor.data &&
    [VENDOR_STATUSES.IN_PROGRESS, VENDOR_STATUSES.CREDENTIALS_VERIFIED].includes(
      vendor.data.verification_status
    )
      ? 2
      : 1;

  const [step, setSteps] = useState(actualStepIndex);

  useEffect(() => {
    setSteps(actualStepIndex);
  }, [actualStepIndex]);

  const stepsModal = currentStep => {
    switch (currentStep) {
      case 1:
        return <ProfileVerificationCredentials />;
      case 2:
        return <ProfileVerificationPending />;
      default:
        return null;
    }
  };
  return (
    <div className="profile_edit_page__modal">
      <div className="profile_edit_page__modal__inner">
        <div className="profile_edit_page__modal__content">{stepsModal(step)}</div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  vendor: state.profileStore.vendor
});

export default connect(mapStateToProps)(ProfileVerification);
