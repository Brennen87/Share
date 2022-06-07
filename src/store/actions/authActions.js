import axios from '../../axios-api';
import { push } from 'connected-react-router';
import Pathes from '../../common/pathes';
import Notify from '../../components/Notification';
import TOASTER_MESSAGES from '../../common/toaster';
import config from '../../config';
import {
  CLEAN_PROFILE_INFO,
  FETCH_USER_STATUS,
  LOGIN_USER,
  LOGOUT_USER,
  PASSWORD_FORGOT,
  PASSWORD_RESET,
  REGISTER_USER,
  VERIFY_USER_EMAIL
} from './actionTypes';

const registerUserRequest = () => ({ type: REGISTER_USER.REQUEST });
const registerUserSuccess = () => ({ type: REGISTER_USER.SUCCESS });
const registerUserFailure = error => ({ type: REGISTER_USER.FAILURE, error });

const verifyUserEmailRequest = () => ({ type: VERIFY_USER_EMAIL.REQUEST });
const verifyUserEmailSuccess = user => ({ type: VERIFY_USER_EMAIL.SUCCESS, user });
const verifyUserEmailFailure = error => ({ type: VERIFY_USER_EMAIL.FAILURE, error });

const loginUserRequest = () => ({ type: LOGIN_USER.REQUEST });
const loginUserSuccess = user => ({ type: LOGIN_USER.SUCCESS, user });
const loginUserFailure = error => ({ type: LOGIN_USER.FAILURE, error });

const fetchUserStatusRequest = () => ({ type: FETCH_USER_STATUS.REQUEST });
const fetchUserStatusSuccess = userStatus => ({ type: FETCH_USER_STATUS.SUCCESS, userStatus });
const fetchUserStatusFailure = error => ({ type: FETCH_USER_STATUS.FAILURE, error });


export const registerUser = userData => {
  return async dispatch => {
    dispatch(registerUserRequest());
    try {
      const response = await fetch(`${config.apiURL}/${Pathes.Auth.registration}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      const data = await response.json();
      if (data && data.detail) {
        dispatch(registerUserSuccess());
        Notify.info({
          text: TOASTER_MESSAGES.registrationSuccess.text,
          title: TOASTER_MESSAGES.registrationSuccess.title
        });
        dispatch(push('/'));
        return 'success';
      }
      throw new Error(JSON.stringify(data));
    } catch (e) {
      const errorMsg = JSON.parse(e.message);
      const isEmailError = errorMsg && errorMsg.email;
      !isEmailError && Notify.info({ text: TOASTER_MESSAGES.registrationFail });
      dispatch(registerUserFailure(errorMsg));
      return errorMsg;
    }
  };
};

export const verifyUserEmail = key => {
  return dispatch => {
    dispatch(verifyUserEmailRequest());
    return axios
      .post(Pathes.Auth.registrationVerify, { key })
      .then(
        () => {
          dispatch(verifyUserEmailSuccess());
          Notify.info({ text: TOASTER_MESSAGES.verifyEmailSuccess });
          dispatch(push('/login'));
        },
        error => {
          Notify.info({
            text:
              (error && error.response.data && error.response.data.detail) ||
              TOASTER_MESSAGES.verifyEmailError
          });
          dispatch(verifyUserEmailFailure(error.response.data));
          dispatch(push('/home'));
        }
      )
      .catch(() => dispatch(registerUserFailure({ global: 'Something went wrong' })));
  };
};

export const loginUser = userData => {
  return dispatch => {
    dispatch(loginUserRequest());
    return axios.post(Pathes.Auth.login, userData)
      .then(response => {
        if (response?.data?.user) {
          const user = {
            ...response.data.user,
            token: response.data.key
          };

          dispatch({ type: CLEAN_PROFILE_INFO });
          dispatch(loginUserSuccess(user));
          return { status: true, user: user };
        }

        dispatch(loginUserFailure('Credentials invalid'));
        return Notify.info({ text: TOASTER_MESSAGES.loginFail });
      },
      error => {
        if (error.response) {
          dispatch(loginUserFailure(error.response.data));
        } else {
          dispatch(loginUserFailure({ global: 'No connection' }));
        }
      }
    );
  };
};

export const logoutUser = () => {
  return dispatch => {
    return axios.post(Pathes.Auth.logout).then(
      () => {
        dispatch(push('/home'));
        dispatch({ type: LOGOUT_USER });
        dispatch({ type: CLEAN_PROFILE_INFO });
      },
      () => {
        Notify.info({ text: TOASTER_MESSAGES.somethingWentWrong });
      }
    );
  };
};

export const logoutUserNoRedirect = () => {
  return dispatch => {
    return axios.post(Pathes.Auth.logout).then(
      () => {
        dispatch({ type: LOGOUT_USER });
        dispatch({ type: CLEAN_PROFILE_INFO });
      },
      () => {
        Notify.info({ text: TOASTER_MESSAGES.somethingWentWrong });
      }
    );
  };
};

export const deactivateUser = ({ path, state }) => {
  return dispatch => {
    return axios.post(Pathes.Auth.logout).then(
      () => {
        dispatch(push(path, state));
        dispatch({ type: LOGOUT_USER });
        dispatch({ type: CLEAN_PROFILE_INFO });
      },
      () => {
        Notify.info({ text: TOASTER_MESSAGES.somethingWentWrong });
      }
    );
  };
};

export const forgotPassword = email => {
  return dispatch => {
    return axios.post(Pathes.Auth.passwordForgot, email).then(
      response => {
        dispatch({ type: PASSWORD_FORGOT });
        Notify.info({ text: TOASTER_MESSAGES.forgotPassword });
        dispatch(push('/home'));
        return true;
      },
      e => {
        Notify.info({ text: (e && e.response.data.email) || TOASTER_MESSAGES.somethingWentWrong });
      }
    );
  };
};

export const resetPassword = data => {
  return async dispatch => {
    try {
      const response = await axios.post(Pathes.Auth.passwordReset, data);
      if (response && response.status === 200) {
        dispatch({ type: PASSWORD_RESET });
        return { status: true };
      }
      Notify.info({ text: TOASTER_MESSAGES.resetPasswordFail });
    } catch (e) {
      Notify.info({ text: TOASTER_MESSAGES.resetPasswordFail });
    }
  };
};

export const fetchUserStatus = user => {
  return dispatch => {
    dispatch(fetchUserStatusRequest());
    // TODO: replace with normal URL once done
    return axios.get(Pathes.Auth.fetchUserStatus(user.id))
      .then(
        response => {
          if (response?.status >= 200 && response?.status < 300) {
            dispatch(fetchUserStatusSuccess(response.data));
            return { status: true };
          }
          dispatch(fetchUserStatusFailure(new Error("Server error fetching user status")));
          Notify.info({ text: 'Something went wrong while getting user status. Please try again.' });
        },
        error => {
          dispatch(fetchUserStatusFailure(error));
          Notify.info({ text: 'Something went wrong while getting user status. Please try again.' });
        }
      )
      .catch(error => {
        dispatch(fetchUserStatusFailure(error.message));
        Notify.info({ text: 'Something went wrong while getting user status. Please try again.' });
      });
  }
}
