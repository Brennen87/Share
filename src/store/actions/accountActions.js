import axios from '../../axios-api';
import Pathes from '../../common/pathes';
import { FILL_IN_ALL_REQUIRED_FIELDS } from '../../common/constants';
import { push } from 'connected-react-router';
import Notify from '../../components/Notification';
import { deactivateUser } from './authActions';
import {
  CLEAR_ACC_TYPE,
  DEACTIVATE_ACC,
  FETCH_ACC_INFO,
  FETCH_ACC_NOTIFICATIONS,
  FETCH_ACC_PASS,
  FETCH_ACC_TYPE,
  POST_ACC_TYPE,
  SWITCH_ROLE,
  UPDATE_ACC_INFO,
  UPDATE_ACC_NOTIFICATIONS,
  UPDATE_ACC_TYPE
} from './actionTypes';

const fetchAccNotificationsRequest = () => ({ type: FETCH_ACC_NOTIFICATIONS.REQUEST });
const fetchAccNotificationsSuccess = settings => ({
  type: FETCH_ACC_NOTIFICATIONS.SUCCESS,
  settings
});
const fetchAccNotificationsFailure = error => ({ type: FETCH_ACC_NOTIFICATIONS.FAILURE, error });

const fetchAccInfoRequest = () => ({ type: FETCH_ACC_INFO.REQUEST });
const fetchAccInfoSuccess = info => ({ type: FETCH_ACC_INFO.SUCCESS, info });
const fetchAccInfoFailure = error => ({ type: FETCH_ACC_INFO.FAILURE, error });

const updateAccInfoRequest = () => ({ type: UPDATE_ACC_INFO.REQUEST });
const updateAccInfoSuccess = info => ({ type: UPDATE_ACC_INFO.SUCCESS, info });
const updateAccInfoFailure = error => ({ type: UPDATE_ACC_INFO.FAILURE, error });

const fetchAccPassRequest = () => ({ type: FETCH_ACC_PASS.REQUEST });
const fetchAccPassSuccess = info => ({ type: FETCH_ACC_PASS.SUCCESS, info });
const fetchAccPassFailure = error => ({ type: FETCH_ACC_PASS.FAILURE, error });

const updateAccNotificationsRequest = () => ({ type: UPDATE_ACC_NOTIFICATIONS.REQUEST });
const updateAccNotificationsSuccess = settings => ({
  type: UPDATE_ACC_NOTIFICATIONS.SUCCESS,
  settings
});
const updateAccNotificationsFailure = error => ({ type: UPDATE_ACC_NOTIFICATIONS.FAILURE, error });

const clearAccountTypeAction = () => ({ type: CLEAR_ACC_TYPE });

const fetchAccTypeRequest = () => ({ type: FETCH_ACC_TYPE.REQUEST });
const fetchAccTypeSuccess = accType => ({ type: FETCH_ACC_TYPE.SUCCESS, accType });
const fetchAccTypeFailure = error => ({ type: FETCH_ACC_TYPE.FAILURE, error });

const postAccTypeRequest = () => ({ type: POST_ACC_TYPE.REQUEST });
const postAccTypeSuccess = accType => ({ type: POST_ACC_TYPE.SUCCESS, accType });
const postAccTypeFailure = error => ({ type: POST_ACC_TYPE.FAILURE, error });

const updateAccTypeRequest = () => ({ type: UPDATE_ACC_TYPE.REQUEST });
const updateAccTypeSuccess = accType => ({ type: UPDATE_ACC_TYPE.SUCCESS, accType });
const updateAccTypeFailure = error => ({ type: UPDATE_ACC_TYPE.FAILURE, error });

const deactivateAccRequest = () => ({ type: DEACTIVATE_ACC.REQUEST });
const deactivateAccSuccess = () => ({ type: DEACTIVATE_ACC.SUCCESS });
const deactivateAccFailure = () => ({ type: DEACTIVATE_ACC.FAILURE });

function extractErrorMessageFromResponse(response) {
  let errorMessage = '';
  if (response.status >= 400) {
    if (typeof response.data === 'object' && Object.keys(response.data).length) {
      errorMessage = Object.keys(response.data).reduce((accelerator, currentKey, index) => {
        return `${accelerator} ${index + 1}) ${Number.isNaN(currentKey) ? `${currentKey}: ` : ''}${
          response.data[currentKey]
        }${index < Object.keys(response.data).length - 1 ? ';' : ''}`;
      }, ': ');
    }
  }
  return errorMessage;
}

export const fetchAccPersonalInformation = () => {
  return dispatch => {
    dispatch(fetchAccInfoRequest());
    return axios
      .get(Pathes.Account.information)
      .then(
        response => dispatch(fetchAccInfoSuccess(response.data)),
        error => dispatch(fetchAccInfoFailure(error))
      )
      .catch(e => dispatch(fetchAccInfoFailure(e.message)));
  };
};

export const updateAccPersonalInformation = data => {
  return dispatch => {
    dispatch(updateAccInfoRequest());
    const { phone } = data;

    if (!phone) {
      return Promise.resolve().then(() => {
        Notify.info({
          text: FILL_IN_ALL_REQUIRED_FIELDS
        });
      });
    }

    const dataToUpdate = { phone };
    return axios
      .put(Pathes.Account.information, dataToUpdate)
      .then(
        response => {
          if (response.status >= 400) {
            const errorMessage = `Something went wrong while updating account phone number${extractErrorMessageFromResponse(
              response
            )}`;
            dispatch(updateAccInfoFailure(errorMessage));
            return Notify.info({
              text: errorMessage
            });
          }
          dispatch(updateAccInfoSuccess({ ...data, ...(response?.data?.data || {}) }));
        },
        error => dispatch(updateAccInfoFailure(error))
      )
      .catch(e => dispatch(updateAccInfoFailure(e.message)));
  };
};

export const fetchAccNotificationSettings = () => {
  return dispatch => {
    dispatch(fetchAccNotificationsRequest());
    return axios
      .get(Pathes.Account.notifications)
      .then(
        response => {
          dispatch(fetchAccNotificationsSuccess(response.data));
        },
        error => dispatch(fetchAccNotificationsFailure(error))
      )
      .catch(e => dispatch(fetchAccNotificationsFailure(e.message)));
  };
};

export const updateAccNotificationSettings = data => {
  return dispatch => {
    dispatch(updateAccNotificationsRequest());
    return axios
      .put(Pathes.Account.notifications, data)
      .then(
        response => {
          dispatch(updateAccNotificationsSuccess(response.data));
          Notify.info({ text: 'Notifications successfully updated' });
        },
        error => dispatch(updateAccNotificationsFailure(error))
      )
      .catch(e => dispatch(updateAccNotificationsFailure(e.message)));
  };
};

export const switchRole = () => {
  return (dispatch, getState) => {
    return axios
      .post(Pathes.Account.switchRole)
      .then(
        response => {
          if (response && response.status === 200) {
            const currentUser = getState().userStore.user;
            if (currentUser) {
              dispatch({
                type: SWITCH_ROLE,
                user: {
                  ...currentUser,
                  role: response.data.role || currentUser.role
                }
              });
              return dispatch(push('/'));
            }
          }

          Notify.info({ text: 'Could not switch role. Please try again' });
        },
        () => Notify.info({ text: 'Could not switch role. Please try again' })
      )
      .catch(() => Notify.info({ text: 'Could not switch role. Please try again' }));
  };
};

export const fetchChangeAccPassword = data => {
  return dispatch => {
    dispatch(fetchAccPassRequest());
    return axios
      .post(Pathes.Account.changePassword, data)
      .then(
        response => {
          if (response.status === 200) {
            dispatch(fetchAccPassSuccess(response.data));
            Notify.info({ text: 'Password has been successfully changed' });
          } else {
            Notify.info({ text: 'Incorrect current password' });
          }
        },
        error => dispatch(fetchAccPassFailure(error))
      )
      .catch(e => dispatch(fetchAccPassFailure(e.message)));
  };
};

export const postAccountType = data => {
  return dispatch => {
    dispatch(postAccTypeRequest());
    return axios
      .post(Pathes.Account.type, data)
      .then(
        response => {
          if (response && response.data && response.data.account_id) {
            dispatch(postAccTypeSuccess(response.data));
            return Notify.info({ text: 'Account successfully created' });
          }

          dispatch(postAccTypeFailure('Error'));

          Notify.info({
            text: `Something went wrong while creating account type${extractErrorMessageFromResponse(
              response
            )}`
          });
        },
        error => dispatch(postAccTypeFailure(error))
      )
      .catch(e => dispatch(postAccTypeFailure(e.message)));
  };
};

export const fetchAccountType = () => {
  return dispatch => {
    dispatch(fetchAccTypeRequest());
    return axios
      .get(Pathes.Account.type)
      .then(
        response => {
          if (response && response.data && response.data.account_id) {
            return dispatch(fetchAccTypeSuccess(response.data));
          }
          dispatch(fetchAccTypeFailure('Error'));
        },
        error => dispatch(fetchAccTypeFailure(error))
      )
      .catch(e => dispatch(fetchAccTypeFailure(e.message)));
  };
};

export const clearAccountType = () => {
  return dispatch => {
    dispatch(clearAccountTypeAction());
  };
};

export const updateAccountType = data => {
  return dispatch => {
    dispatch(updateAccTypeRequest());
    return axios
      .put(Pathes.Account.type, data)
      .then(response => {
        if (response && response.data && response.data.account_id) {
          dispatch(updateAccTypeSuccess(response.data));
          return Notify.info({
            text: response.data.message || 'Bank Account Successfully updated'
          });
        }

        throw new Error(
          `Something went wrong while updating account information${extractErrorMessageFromResponse(
            response
          )}`
        );
      })
      .catch(e => {
        Notify.info({ text: e.message });
        dispatch(updateAccTypeFailure(e.message));
      });
  };
};

export const deactivateAccount = data => {
  return dispatch => {
    dispatch(deactivateAccRequest());
    return axios
      .post(Pathes.Auth.deactivate, data)
      .then(response => {
        if (response && response.status === 200) {
          dispatch(deactivateAccSuccess(response.data));
          Notify.info({ text: response.data.message || 'Account deactivated successfully' });
          return dispatch(
            deactivateUser({ path: '/account/deleted', state: { deactivate: true } })
          );
        }

        const errorMsg = response && response.status === 400 && response.data[0];
        throw new Error(errorMsg || 'Something went wrong while deactivating your account');
      })
      .catch(e => {
        Notify.info({ text: e.message });
        dispatch(deactivateAccFailure(e.message));
      });
  };
};
