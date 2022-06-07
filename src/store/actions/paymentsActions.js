import { FETCH_PAYMENT_HISTORY, FETCH_PAYMENT_HISTORY_TOTAL } from './actionTypes';
import axios from '../../axios-api';
import queryString from 'query-string';
import Pathes from '../../common/pathes';
import Notify from '../../components/Notification';

const fetchPaymentHistoryRequest = () => ({ type: FETCH_PAYMENT_HISTORY.REQUEST });
const fetchPaymentHistorySuccess = paymentHistory => ({
  type: FETCH_PAYMENT_HISTORY.SUCCESS,
  paymentHistory
});
const fetchPaymentHistoryFailure = error => ({ type: FETCH_PAYMENT_HISTORY.FAILURE, error });

const fetchPaymentHistoryTotalRequest = () => ({ type: FETCH_PAYMENT_HISTORY_TOTAL.REQUEST });
const fetchPaymentHistoryTotalSuccess = paymentHistoryTotal => ({
  type: FETCH_PAYMENT_HISTORY_TOTAL.SUCCESS,
  paymentHistoryTotal
});
const fetchPaymentHistoryTotalFailure = error => ({
  type: FETCH_PAYMENT_HISTORY_TOTAL.FAILURE,
  error
});

export const fetchPaymentHistoryDownload = (data = {}) => {
  const urlParameters = new URLSearchParams(data).toString();
  return axios({
    url: `${Pathes.Payments.historyDownload}?${urlParameters}`,
    method: 'GET',
    responseType: 'blob'
  });
};

export const fetchPaymentHistory = params => {
  const requestPayload = {
    limit: params.limit,
    page: params.page
  };

  const query = queryString.stringify(requestPayload, { skipNull: true });

  return dispatch => {
    dispatch(fetchPaymentHistoryRequest());
    return axios
      .get(Pathes.Payments.history(query))
      .then(
        response => {
          if (response && response.status === 200) {
            return dispatch(fetchPaymentHistorySuccess(response.data));
          }
        },
        error => dispatch(fetchPaymentHistoryFailure(error))
      )
      .catch(e => dispatch(fetchPaymentHistoryFailure(e.message)));
  };
};

export const fetchPaymentHistoryTotal = () => {
  return dispatch => {
    dispatch(fetchPaymentHistoryTotalRequest());
    return axios
      .get(Pathes.Payments.historyTotal)
      .then(
        response => {
          if (response && response.status === 200) {
            return dispatch(fetchPaymentHistoryTotalSuccess(response.data));
          }
        },
        error => dispatch(fetchPaymentHistoryTotalFailure(error))
      )
      .catch(e => dispatch(fetchPaymentHistoryTotalFailure(e.message)));
  };
};
