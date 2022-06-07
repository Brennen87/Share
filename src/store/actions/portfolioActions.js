import { CREATE_PORTFOLIO, FETCH_PORTFOLIO, EDIT_PORTFOLIO, DELETE_PORTFOLIO } from './actionTypes';
import axios from '../../axios-api';
import Pathes from '../../common/pathes';
import Notify from '../../components/Notification';
import queryString from 'query-string';

const createPortfolioRequest = () => ({ type: CREATE_PORTFOLIO.REQUEST });
const createPortfolioSuccess = portfolio => ({ type: CREATE_PORTFOLIO.SUCCESS, portfolio });
const createPortfolioFailure = error => ({ type: CREATE_PORTFOLIO.FAILURE, error });

const fetchPortfolioRequest = () => ({ type: FETCH_PORTFOLIO.REQUEST });
const fetchPortfolioSuccess = portfolioList => ({ type: FETCH_PORTFOLIO.SUCCESS, portfolioList });
const fetchPortfolioFailure = error => ({ type: FETCH_PORTFOLIO.FAILURE, error });

const editPortfolioRequest = () => ({ type: EDIT_PORTFOLIO.REQUEST });
const editPortfolioSuccess = portfolio => ({ type: EDIT_PORTFOLIO.SUCCESS, portfolio });
const editPortfolioFailure = error => ({ type: EDIT_PORTFOLIO.FAILURE, error });

const deletePortfolioRequest = () => ({ type: DELETE_PORTFOLIO.REQUEST });
const deletePortfolioSuccess = portfolio => ({ type: DELETE_PORTFOLIO.SUCCESS, portfolio });
const deletePortfolioFailure = error => ({ type: DELETE_PORTFOLIO.FAILURE, error });

export const createPortfolio = portfolio => {
  return (dispatch, getState) => {
    const vendorID = getState().userStore.user && getState().userStore.user.vendor_id;
    if (vendorID) {
      dispatch(createPortfolioRequest());
      return axios
        .post(Pathes.Portfolio.createPortfolio(vendorID), portfolio)
        .then(
          response => {
            dispatch(createPortfolioSuccess(response.data));
            return response.data;
          },
          error => {
            dispatch(createPortfolioFailure(error));
          }
        )
        .catch(e => Notify.info({ text: 'Something went wrong' }));
    }
    return null;
  };
};

export const fetchPortfolio = (vendorId, query, isNext) => {
  return (dispatch, getState) => {
    dispatch(fetchPortfolioRequest());
    return axios
      .get(Pathes.Portfolio.fetchPortfolio(vendorId, queryString.stringify(query)))
      .then(
        response => {
          const newPortfolio = response.data;
          const currentPortfolio = getState().portfolioStore.portfolioList;
          if (isNext && currentPortfolio.data && !!currentPortfolio.data.list.length) {
            const result = {
              ...newPortfolio,
              list: [...currentPortfolio.data.list, ...newPortfolio.list]
            };
            dispatch(fetchPortfolioSuccess(result));
          } else {
            dispatch(fetchPortfolioSuccess(newPortfolio));
          }
          return response.data;
        },
        error => {
          dispatch(fetchPortfolioFailure(error));
        }
      )
      .catch(() => Notify.info({ text: 'COULD FETCH PORTFOLIOS' }));
  };
};

export const editPortfolio = portfolio => {
  return (dispatch, getState) => {
    const vendorID = getState().userStore.user && getState().userStore.user.vendor_id;
    if (vendorID) {
      dispatch(editPortfolioRequest());
      return axios
        .patch(Pathes.Portfolio.editPortfolio(vendorID, portfolio.id), portfolio)
        .then(
          response => {
            dispatch(editPortfolioSuccess(response.data));
            return response.data;
          },
          error => {
            dispatch(editPortfolioFailure(error));
          }
        )
        .catch(e => Notify.info({ text: 'Something went wrong' }));
    }
    return null;
  };
};

export const deletePortfolio = portfolio => {
  return (dispatch, getState) => {
    const vendorID = getState().userStore.user && getState().userStore.user.vendor_id;
    if (vendorID) {
      dispatch(deletePortfolioRequest());
      return axios
        .delete(Pathes.Portfolio.deletePortfolio(vendorID, portfolio.id))
        .then(
          response => {
            dispatch(deletePortfolioSuccess(response.data));
            return response.data;
          },
          error => {
            dispatch(deletePortfolioFailure(error));
          }
        )
        .catch(() => Notify.info({ text: 'Something went wrong' }));
    }
    return null;
  };
};
