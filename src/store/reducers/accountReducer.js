import { METADATA } from '../../common/metadata';
import {
  FETCH_ACC_INFO,
  FETCH_ACC_NOTIFICATIONS,
  FETCH_ACC_TYPE,
  POST_ACC_TYPE,
  UPDATE_ACC_INFO,
  UPDATE_ACC_NOTIFICATIONS,
  UPDATE_ACC_TYPE,
  CLEAR_ACC_TYPE
} from '../actions/actionTypes';

const initialState = {
  accountType: { ...METADATA.default, data: null, exist: false },
  information: { ...METADATA.default, data: null },
  notifications: { ...METADATA.default, data: null }
};

const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    case CLEAR_ACC_TYPE:
      return { ...state, accountType: initialState.accountType };
    case FETCH_ACC_INFO.REQUEST:
      return { ...state, information: { ...state.information, ...METADATA.request } };
    case FETCH_ACC_INFO.SUCCESS:
      return { ...state, information: { data: action.info, ...METADATA.success } };
    case FETCH_ACC_INFO.FAILURE:
      return { ...state, information: { ...state.information, ...METADATA.error } };

    case FETCH_ACC_NOTIFICATIONS.REQUEST:
      return { ...state, notifications: { ...state.notifications, ...METADATA.request } };
    case FETCH_ACC_NOTIFICATIONS.SUCCESS:
      return { ...state, notifications: { data: action.settings, ...METADATA.success } };
    case FETCH_ACC_NOTIFICATIONS.FAILURE:
      return { ...state, notifications: { ...state.notifications, ...METADATA.error } };

    case UPDATE_ACC_NOTIFICATIONS.REQUEST:
      return { ...state, notifications: { ...state.notifications, ...METADATA.request } };
    case UPDATE_ACC_NOTIFICATIONS.SUCCESS:
      return { ...state, notifications: { data: action.settings, ...METADATA.success } };
    case UPDATE_ACC_NOTIFICATIONS.FAILURE:
      return { ...state, notifications: { ...state.notifications, ...METADATA.error } };

    case UPDATE_ACC_INFO.REQUEST:
      return { ...state, information: { ...state.information, ...METADATA.request } };
    case UPDATE_ACC_INFO.SUCCESS:
      return { ...state, information: { data: action.info, ...METADATA.success } };
    case UPDATE_ACC_INFO.FAILURE:
      return { ...state, information: { ...state.information, ...METADATA.error } };

    case FETCH_ACC_TYPE.REQUEST:
      return { ...state, accountType: { ...state.accountType, ...METADATA.request } };
    case FETCH_ACC_TYPE.SUCCESS:
      return { ...state, accountType: { data: action.accType, exist: true, ...METADATA.success } };
    case FETCH_ACC_TYPE.FAILURE:
      return { ...state, accountType: { ...state.accountType, exist: false, ...METADATA.error } };

    case POST_ACC_TYPE.REQUEST:
      return { ...state, accountType: { ...state.accountType } };
    case POST_ACC_TYPE.SUCCESS:
      return { ...state, accountType: { data: action.accType, exist: true, ...METADATA.success } };
    case POST_ACC_TYPE.FAILURE:
      return { ...state, accountType: { ...state.accountType, ...METADATA.error } };

    case UPDATE_ACC_TYPE.REQUEST:
      return { ...state, accountType: { ...state.accountType } };
    case UPDATE_ACC_TYPE.SUCCESS:
      return { ...state, accountType: { data: action.accType, exist: true, ...METADATA.success } };
    case UPDATE_ACC_TYPE.FAILURE:
      return { ...state, accountType: { ...state.accountType, ...METADATA.error } };

    default:
      return state;
  }
};

export default accountReducer;
