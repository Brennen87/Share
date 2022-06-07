import { METADATA } from '../../common/metadata';
import {
  CLEAN_PROFILE_INFO,
  FETCH_VENDOR,
  FETCH_PROFILE,
  FETCH_PUBLIC_PROFILE,
  UPDATE_PROFILE_BASIC,
  UPDATE_PROFILE_SUMMARY,
  SEND_VERIFICATION_DOCUMENTS,
  ACKNOWLEDGE_VERIFICATION,
} from '../actions/actionTypes';

const initialState = {
  profile: { ...METADATA.default, data: null },
  vendor: { ...METADATA.default, data: null },
  publicProfile: { ...METADATA.default, customer: null, vendor: null }
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PROFILE_BASIC.SUCCESS:
      return { ...state, profile: { ...state.profile, data: action.profile } };

    case UPDATE_PROFILE_SUMMARY.SUCCESS:
      return { ...state, vendor: { ...state.vendor, data: action.vendor } };
    case UPDATE_PROFILE_SUMMARY.FAILURE:
      return { ...state, vendor: { ...state.vendor, ...METADATA.error, error: action.error } };

    case SEND_VERIFICATION_DOCUMENTS.SUCCESS:
      return { ...state, vendor: { ...state.vendor, verificationDocumentsSentSuccessfully: true } };
    case SEND_VERIFICATION_DOCUMENTS.FAILURE:
      return { ...state, vendor: { ...state.vendor, ...METADATA.error, error: action.error } };

    case ACKNOWLEDGE_VERIFICATION.SUCCESS:
      return { ...state, vendor: { ...state.vendor } };
    case ACKNOWLEDGE_VERIFICATION.FAILURE:
      return { ...state, vendor: { ...state.vendor, ...METADATA.error, error: action.error } };

    case FETCH_PROFILE.REQUEST:
      return { ...state, profile: { ...state.profile, ...METADATA.request } };
    case FETCH_PROFILE.SUCCESS:
      return { ...state, profile: { ...METADATA.success, data: action.profile } };
    case FETCH_PROFILE.FAILURE:
      return { ...state, profile: { ...state.profile, ...METADATA.error, error: action.error } };

    case FETCH_VENDOR.REQUEST:
      return { ...state, vendor: { ...state.vendor, ...METADATA.request } };
    case FETCH_VENDOR.SUCCESS:
      return { ...state, vendor: { ...METADATA.success, data: action.vendor } };
    case FETCH_VENDOR.FAILURE:
      return {
        ...state,
        vendor: { ...state.vendor, ...METADATA.error, error: action.error }
      };
    case CLEAN_PROFILE_INFO:
      return {
        ...state,
        profile: { ...METADATA.default, data: null },
        vendor: { ...METADATA.default, data: null }
      };
    case FETCH_PUBLIC_PROFILE.REQUEST:
      return {
        ...state,
        publicProfile: {
          ...state.publicProfile,
          ...METADATA.request,
          customer: null,
          vendor: null
        }
      };
    case FETCH_PUBLIC_PROFILE.SUCCESS:
      return {
        ...state,
        publicProfile: {
          ...METADATA.success,
          vendor: action.vendor,
          customer: action.customer
        }
      };
    case FETCH_PUBLIC_PROFILE.FAILURE:
      return {
        ...state,
        publicProfile: { ...state.publicProfile, ...METADATA.error, error: action.error }
      };

    default:
      return state;
  }
};

export default profileReducer;
