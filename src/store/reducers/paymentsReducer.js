import { FETCH_PAYMENT_HISTORY, FETCH_PAYMENT_HISTORY_TOTAL } from '../actions/actionTypes';
import { METADATA } from '../../common/metadata';

const initialState = {
  paymentHistory: { ...METADATA.default, data: null },
  paymentHistoryTotal: { ...METADATA.default, data: null }
};

const paymentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PAYMENT_HISTORY.REQUEST:
      return { ...state, paymentHistory: { ...state.paymentHistory, ...METADATA.request } };
    case FETCH_PAYMENT_HISTORY.SUCCESS:
      return { ...state, paymentHistory: { data: action.paymentHistory, ...METADATA.success } };
    case FETCH_PAYMENT_HISTORY.FAILURE:
      return { ...state, paymentHistory: { ...state.paymentHistory, ...METADATA.error } };

    case FETCH_PAYMENT_HISTORY_TOTAL.REQUEST:
      return {
        ...state,
        paymentHistoryTotal: { ...state.paymentHistoryTotal, ...METADATA.request }
      };
    case FETCH_PAYMENT_HISTORY_TOTAL.SUCCESS:
      return {
        ...state,
        paymentHistoryTotal: { data: action.paymentHistoryTotal, ...METADATA.success }
      };
    case FETCH_PAYMENT_HISTORY_TOTAL.FAILURE:
      return { ...state, paymentHistoryTotal: { ...state.paymentHistoryTotal, ...METADATA.error } };

    default:
      return state;
  }
};

export default paymentsReducer;
