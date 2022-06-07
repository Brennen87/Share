import {
  UPDATE_PROFILE_BASIC,
  UPDATE_PROFILE_SUMMARY,
  UPDATE_USER_INFO,
  FETCH_PROFILE,
  FETCH_VENDOR,
  FETCH_PUBLIC_PROFILE,
  SEND_VERIFICATION_DOCUMENTS,
  ACKNOWLEDGE_VERIFICATION
} from './actionTypes';
import axios from '../../axios-api';
import Pathes from '../../common/pathes';
import Notify from '../../components/Notification';
import { FILL_IN_ALL_REQUIRED_FIELDS, ROLES } from '../../common/constants';

const updateUserInfo = user => ({ type: UPDATE_USER_INFO, user });

const fetchProfileRequest = () => ({ type: FETCH_PROFILE.REQUEST });
const fetchProfileSuccess = profile => ({ type: FETCH_PROFILE.SUCCESS, profile });
const fetchProfileFailure = error => ({ type: FETCH_PROFILE.FAILURE, error });

const fetchPublicProfileRequest = () => ({ type: FETCH_PUBLIC_PROFILE.REQUEST });
const fetchPublicProfileFailure = error => ({ type: FETCH_PUBLIC_PROFILE.FAILURE, error });
const fetchPublicProfileSuccess = (role, data) => ({
  type: FETCH_PUBLIC_PROFILE.SUCCESS,
  vendor: role === ROLES.vendor ? data : null,
  customer: role === ROLES.customer ? data : null
});

const fetchVendorRequest = () => ({ type: FETCH_VENDOR.REQUEST });
const fetchVendorSuccess = vendor => ({ type: FETCH_VENDOR.SUCCESS, vendor });
const fetchVendorFailure = error => ({ type: FETCH_VENDOR.FAILURE, error });

const updateProfileBasicRequest = () => ({ type: UPDATE_PROFILE_BASIC.REQUEST });
const updateProfileBasicFailure = error => ({ type: UPDATE_PROFILE_BASIC.FAILURE, error });
const updateProfileBasicSuccess = profile => ({ type: UPDATE_PROFILE_BASIC.SUCCESS, profile });

const updateProfileSummaryRequest = () => ({ type: UPDATE_PROFILE_SUMMARY.REQUEST });
const updateProfileSummaryFailure = error => ({ type: UPDATE_PROFILE_SUMMARY.FAILURE, error });
const updateProfileSummarySuccess = vendor => ({
  type: UPDATE_PROFILE_SUMMARY.SUCCESS,
  vendor
});

const sendVerificationDocumentsRequest = () => ({ type: SEND_VERIFICATION_DOCUMENTS.REQUEST });
const sendVerificationDocumentsFailure = error => ({
  type: SEND_VERIFICATION_DOCUMENTS.FAILURE,
  error
});
const sendVerificationDocumentsSuccess = vendor => ({
  type: SEND_VERIFICATION_DOCUMENTS.SUCCESS,
  vendor
});

const acknowledgeVerificationRequest = () => ({ type: ACKNOWLEDGE_VERIFICATION.REQUEST });
const acknowledgeVerificationFailure = error => ({ type: ACKNOWLEDGE_VERIFICATION.FAILURE, error });
const acknowledgeVerificationSuccess = () => ({
  type: ACKNOWLEDGE_VERIFICATION.SUCCESS
});

export const updateProfileBasic = data => {
  return (dispatch, getState) => {
    dispatch(updateProfileBasicRequest());
    return axios
      .put(Pathes.Profile.updateBasic, data)
      .then(
        response => {
          const newData = response.data;
          const currentUser = {
            ...getState().userStore.user,
            avatar: newData.avatar,
            first_name: newData.first_name,
            last_name: newData.last_name
          };
          dispatch(updateUserInfo(currentUser));
          dispatch(updateProfileBasicSuccess(newData));
          return newData;
        },
        error => {
          dispatch(updateProfileBasicFailure(error));
        }
      )
      .catch(e => {
        dispatch(updateProfileBasicFailure(e.message));
        Notify.info({ text: 'Something went wrong' });
      });
  };
};

export const updateProfileSummary = data => {
  return (dispatch, getState) => {
    dispatch(updateProfileSummaryRequest());
    const vendorID = getState().userStore.user.vendor_id;
    return axios
      .put(Pathes.Profile.updateSummary(vendorID), data)
      .then(response => {
        dispatch(updateProfileSummarySuccess(response.data));
      })
      .catch(e => {
        dispatch(updateProfileSummaryFailure(e.message));
        Notify.info({ text: 'Something went wrong' });
      });
  };
};

export const sendVerificationDocuments = data => {
  return dispatch => {
    dispatch(sendVerificationDocumentsRequest());
    return axios
      .post(Pathes.Profile.sendVerificationDocuments, data)
      .then(response => {
        if (![200, 201].includes(response.status)) {
          dispatch(sendVerificationDocumentsFailure(JSON.stringify(response.data)));
          Notify.info({ text: FILL_IN_ALL_REQUIRED_FIELDS });
        } else {
          dispatch(sendVerificationDocumentsSuccess(response.data));
        }
      })
      .catch(e => {
        dispatch(sendVerificationDocumentsFailure(e));
        Notify.info({ text: 'Something went wrong' });
      });
  };
};

export const acknowledgeVerification = () => {
  return dispatch => {
    dispatch(acknowledgeVerificationRequest());
    return axios
      .post(Pathes.Profile.acknowledgeVerification)
      .then(response => {
        if (response.status !== 200) {
          dispatch(acknowledgeVerificationFailure(JSON.stringify(response.data)));
          Notify.info({ text: 'Something went wrong' });
        } else {
          dispatch(acknowledgeVerificationSuccess());
        }
      })
      .catch(e => {
        dispatch(acknowledgeVerificationFailure(e));
        Notify.info({ text: 'Something went wrong' });
      });
  };
};

export const fetchProfile = () => {
  return dispatch => {
    dispatch(fetchProfileRequest());
    return axios.get(Pathes.Auth.user).then(
      response => {
        if (response.data && response.data.vendor_id) {
          dispatch(fetchVendorRequest());
          axios.get(Pathes.Profile.vendor(response.data.vendor_id)).then(
            res => dispatch(fetchVendorSuccess(res.data)),
            err => dispatch(fetchVendorFailure(err))
          );
        }
        dispatch(fetchProfileSuccess(response.data));
      },
      error => dispatch(fetchProfileFailure(error))
    );
  };
};

export const fetchPublicProfile = (role, username) => {
  return dispatch => {
    dispatch(fetchPublicProfileRequest());
    return axios
      .get(Pathes.Profile.public(role, username))
      .then(
        response => {
          if (response && response.status === 200) {
            return dispatch(fetchPublicProfileSuccess(role, response.data.data));
          }
          throw Error('Could not get profile information');
        },
        error => dispatch(fetchPublicProfileFailure(error))
      )
      .catch(e => {
        Notify.info({ text: 'Something went wrong' });
        dispatch(fetchPublicProfileFailure(e.message));
      });
  };
};
