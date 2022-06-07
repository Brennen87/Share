import axios from '../../axios-api';
import Pathes from '../../common/pathes';
import queryString from 'query-string';
import {
  FETCH_TOP_VENDORS,
  FETCH_TOP_CUSTOMERS,
  FETCH_VENDORS,
  FETCH_CUSTOMERS
} from './actionTypes';

const fetchTopVendorsRequest = () => ({ type: FETCH_TOP_VENDORS.REQUEST });
const fetchTopVendorsSuccess = vendors => ({
  type: FETCH_TOP_VENDORS.SUCCESS,
  vendors
});
const fetchTopVendorsFailure = error => ({ type: FETCH_TOP_VENDORS.FAILURE, error });

const fetchTopCustomersRequest = () => ({ type: FETCH_TOP_CUSTOMERS.REQUEST });
const fetchTopCustomersSuccess = customers => ({
  type: FETCH_TOP_CUSTOMERS.SUCCESS,
  customers
});
const fetchTopCustomersFailure = error => ({ type: FETCH_TOP_CUSTOMERS.FAILURE, error });

const fetchVendorsRequest = () => ({ type: FETCH_VENDORS.REQUEST });
const fetchVendorsSuccess = vendors => ({
  type: FETCH_VENDORS.SUCCESS,
  vendors
});
const fetchVendorsFailure = error => ({ type: FETCH_VENDORS.FAILURE, error });

const fetchCustomersRequest = () => ({ type: FETCH_CUSTOMERS.REQUEST });
const fetchCustomersSuccess = customers => ({
  type: FETCH_CUSTOMERS.SUCCESS,
  customers
});
const fetchCustomersFailure = error => ({ type: FETCH_CUSTOMERS.FAILURE, error });

export const fetchTopVendors = params => {
  return dispatch => {
    dispatch(fetchTopVendorsRequest());
    const query = `?${queryString.stringify(params)}`;

    return axios
      .get(Pathes.Vendors.topVendors + query)
      .then(
        response => {
          dispatch(fetchTopVendorsSuccess(response.data));
        },
        error => {
          dispatch(fetchTopVendorsFailure(error));
        }
      )
      .catch(() => dispatch(fetchTopVendorsFailure({ global: 'Something went wrong' })));
  };
};

export const fetchTopCustomers = query => {
  return dispatch => {
    dispatch(fetchTopCustomersRequest());

    return axios
      .get(Pathes.Customer.topCustomers + (query || ''))
      .then(
        response => {
          dispatch(fetchTopCustomersSuccess(response.data));
        },
        error => {
          dispatch(fetchTopCustomersFailure(error));
        }
      )
      .catch(() => dispatch(fetchTopCustomersFailure({ global: 'Something went wrong' })));
  };
};

export const fetchVendors = query => {
  return dispatch => {
    dispatch(fetchVendorsRequest());
    return axios
      .get(Pathes.Vendors.vendors + (query || ''))
      .then(
        response => {
          dispatch(fetchVendorsSuccess(response.data));
        },
        error => {
          dispatch(fetchVendorsFailure(error));
        }
      )
      .catch(() => dispatch(fetchVendorsFailure({ global: 'Something went wrong' })));
  };
};

export const fetchCustomers = query => {
  return dispatch => {
    dispatch(fetchCustomersRequest());
    return axios
      .get(Pathes.Customer.customers + (query || ''))
      .then(
        response => {
          dispatch(fetchCustomersSuccess(response.data));
        },
        error => {
          dispatch(fetchCustomersFailure(error));
        }
      )
      .catch(() => dispatch(fetchCustomersFailure({ global: 'Something went wrong' })));
  };
};
