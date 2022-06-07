import { METADATA } from '../../common/metadata';
import {
  FETCH_TOP_VENDORS,
  FETCH_TOP_CUSTOMERS,
  FETCH_VENDORS,
  FETCH_CUSTOMERS
} from '../actions/actionTypes';

const initialState = {
  topVendors: { ...METADATA.default, data: null },
  topCustomers: { ...METADATA.default, data: null },
  vendorsList: { ...METADATA.default, data: null },
  customersList: { ...METADATA.default, data: null }
};

const vendorReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TOP_VENDORS.REQUEST:
      return { ...state, topVendors: { ...state.topVendors, ...METADATA.request } };
    case FETCH_TOP_VENDORS.SUCCESS:
      return { ...state, topVendors: { data: action.vendors, ...METADATA.success } };
    case FETCH_TOP_VENDORS.FAILURE:
      return {
        ...state,
        topVendors: { ...state.topVendors, error: action.error, ...METADATA.error }
      };

    case FETCH_TOP_CUSTOMERS.REQUEST:
      return { ...state, topCustomers: { ...state.topCustomers, ...METADATA.request } };
    case FETCH_TOP_CUSTOMERS.SUCCESS:
      return { ...state, topCustomers: { data: action.customers, ...METADATA.success } };
    case FETCH_TOP_CUSTOMERS.FAILURE:
      return {
        ...state,
        topCustomers: { ...state.topCustomers, error: action.error, ...METADATA.error }
      };

    case FETCH_VENDORS.REQUEST:
      return { ...state, vendorsList: { ...state.vendorsList, ...METADATA.request } };
    case FETCH_VENDORS.SUCCESS:
      return { ...state, vendorsList: { data: action.vendors, ...METADATA.success } };
    case FETCH_VENDORS.FAILURE:
      return {
        ...state,
        vendorsList: { ...state.vendorsList, error: action.error, ...METADATA.error }
      };

    case FETCH_CUSTOMERS.REQUEST:
      return { ...state, customersList: { ...state.customersList, ...METADATA.request } };
    case FETCH_CUSTOMERS.SUCCESS:
      return { ...state, customersList: { data: action.customers, ...METADATA.success } };
    case FETCH_CUSTOMERS.FAILURE:
      return {
        ...state,
        customersList: { ...state.customersList, error: action.error, ...METADATA.error }
      };
    default:
      return state;
  }
};

export default vendorReducer;
