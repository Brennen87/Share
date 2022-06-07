import {
  ADD_ADDITIONAL_PAYMENT,
  FETCH_DELIVERY,
  FETCH_EXTRA_PAYMENTS,
  FETCH_PROJECT,
  FETCH_PROJECTS_LIST,
  FETCH_SAVED_CARDS,
  POST_DELIVERY,
  POST_PROJECT_REVIEW,
  CREATE_PAYMENT
} from '../actions/actionTypes';
import { METADATA } from '../../common/metadata';

const initialState = {
  paymentHistory: { ...METADATA.default, data: null },
  project: { ...METADATA.default, data: null },
  projectsList: { ...METADATA.default, data: null },
  savedCards: { ...METADATA.default, data: null },
  delivery: { ...METADATA.default, data: null },
  extraPayments: { ...METADATA.default, data: null },
  usersList: { customers: [], vendors: [] }
};

const projectsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PROJECTS_LIST.REQUEST:
      return { ...state, projectsList: { ...initialState.projectsList, ...METADATA.request } };
    case FETCH_PROJECTS_LIST.SUCCESS:
      return {
        ...state,
        projectsList: { data: action.payload, ...METADATA.success },
        usersList: { customers: action.payload.customers, vendors: action.payload.vendors }
      };
    case FETCH_PROJECTS_LIST.FAILURE:
      return { ...state, projectsList: { ...state.projectsList, ...METADATA.error } };

    case FETCH_SAVED_CARDS.REQUEST:
      return { ...state, savedCards: { ...state.savedCards, ...METADATA.request } };
    case FETCH_SAVED_CARDS.SUCCESS:
      return { ...state, savedCards: { data: action.cards, ...METADATA.success } };
    case FETCH_SAVED_CARDS.FAILURE:
      return { ...state, savedCards: { ...state.savedCards, ...METADATA.error } };

    case FETCH_PROJECT.REQUEST:
      return { ...state, project: { ...state.project, ...METADATA.request } };
    case FETCH_PROJECT.SUCCESS:
      return { ...state, project: { data: action.project, ...METADATA.success } };
    case FETCH_PROJECT.FAILURE:
      return { ...state, project: { ...state.project, ...METADATA.error } };

    case FETCH_DELIVERY.REQUEST:
      return { ...state, delivery: { ...state.delivery, ...METADATA.request } };
    case FETCH_DELIVERY.SUCCESS:
      return { ...state, delivery: { data: action.delivery, ...METADATA.success } };
    case FETCH_DELIVERY.FAILURE:
      return { ...state, delivery: { ...state.delivery, ...METADATA.error } };

    case POST_DELIVERY.REQUEST:
      return state;
    case POST_DELIVERY.SUCCESS:
      return { ...state, delivery: { data: action.delivery, ...METADATA.success } };
    case POST_DELIVERY.FAILURE:
      return { ...state, delivery: { ...state.delivery, ...METADATA.error } };

    case POST_PROJECT_REVIEW.REQUEST:
      return { ...state, delivery: { ...state.delivery, ...METADATA.request } };
    case POST_PROJECT_REVIEW.SUCCESS:
      return { ...state, delivery: { data: action.delivery, ...METADATA.success } };
    case POST_PROJECT_REVIEW.FAILURE:
      return { ...state, delivery: { ...state.delivery, ...METADATA.error } };

    case FETCH_EXTRA_PAYMENTS.REQUEST:
      return { ...state, extraPayments: { ...state.extraPayments, ...METADATA.request } };
    case FETCH_EXTRA_PAYMENTS.SUCCESS:
      return { ...state, extraPayments: { data: action.payments, ...METADATA.success } };
    case FETCH_EXTRA_PAYMENTS.FAILURE:
      return { ...state, extraPayments: { ...state.extraPayments, ...METADATA.error } };

    case CREATE_PAYMENT.REQUEST:
      return { ...state, extraPayments: { ...state.extraPayments, ...METADATA.request } };
    case CREATE_PAYMENT.SUCCESS:
      return { ...state, extraPayments: { data: action.payments, ...METADATA.success } };
    case CREATE_PAYMENT.FAILURE:
      return { ...state, extraPayments: { ...state.extraPayments, ...METADATA.error } };

    case ADD_ADDITIONAL_PAYMENT:
      return { ...state, extraPayments: action.extraPayments };

    default:
      return state;
  }
};

export default projectsReducer;
