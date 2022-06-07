import {
  LOGIN_USER,
  FETCH_USER_STATUS,
  LOGOUT_USER,
  REGISTER_USER,
  SWITCH_ROLE,
  UPDATE_USER_INFO
} from '../actions/actionTypes';

const initialState = {
  user: null,
  userStatus: null,
  loading: false,
  loginError: null,
  registerError: null
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER.REQUEST:
    case LOGIN_USER.REQUEST:
    case FETCH_USER_STATUS.REQUEST:
      return { ...state, loading: true };
    case REGISTER_USER.SUCCESS:
      return { ...state, user: action.user, registerError: null, loading: false };
    case REGISTER_USER.FAILURE:
      return { ...state, registerError: action.error, loading: false };
    case LOGIN_USER.SUCCESS:
      return { ...state, user: action.user, loginError: null, loading: false };
    case LOGIN_USER.FAILURE:
      return { ...state, loginError: action.error, loading: false };
    case FETCH_USER_STATUS.SUCCESS:
      return { ...state, userStatus: action.userStatus, loginError: null, loading: false};
    case FETCH_USER_STATUS.FAILURE:
      return { ...state, loginError: action.error, loading: false };
    case LOGOUT_USER:
      return { ...state, user: null, userStatus: null, loading: false };
    case UPDATE_USER_INFO:
      return { ...state, user: action.user };
    case SWITCH_ROLE:
      return { ...state, user: action.user };
    default:
      return state;
  }
};

export default userReducer;
