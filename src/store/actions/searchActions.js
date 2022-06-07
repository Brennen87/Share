import axios from '../../axios-api';
import Pathes from '../../common/pathes';
import { SEARCH, SET_SEARCH_VALUE } from './actionTypes';
import { push } from 'connected-react-router';

const searchRequest = () => ({ type: SEARCH.REQUEST });
const searchSuccess = result => ({ type: SEARCH.SUCCESS, result });
const searchFailure = error => ({ type: SEARCH.FAILURE, error });
const setSearchValue = text => ({ type: SET_SEARCH_VALUE, text });

export const search = text => {
  return (dispatch, getState) => {
    const query = text ? `?search=${text}` : '';
    dispatch(setSearchValue(text));
    dispatch(searchRequest());
    dispatch(push('/search'));
    const endpoint =
      getState().userStore.user.role === 'customer' ? Pathes.Search.vendor : Pathes.Search.customer;
    return axios
      .get(endpoint + query)
      .then(
        response => {
          dispatch(searchSuccess(response.data));
        },
        error => {
          dispatch(searchFailure(error));
        }
      )
      .catch(e => dispatch(searchFailure({ global: 'Something went wrong' })));
  };
};
