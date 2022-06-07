import queryString from 'query-string';
import axios from '../../axios-api';
import Pathes from '../../common/pathes';
import { FETCH_RESOURCES, FETCH_RESOURCE_CATEGORIES } from './actionTypes';

const fetchResourcesRequest = () => ({ type: FETCH_RESOURCES.REQUEST });
const fetchResourcesSuccess = resources => ({
  type: FETCH_RESOURCES.SUCCESS,
  resources
});
const fetchResourcesFailure = error => ({ type: FETCH_RESOURCES.FAILURE, error });

const fetchResourceCategoriesRequest = () => ({ type: FETCH_RESOURCE_CATEGORIES.REQUEST });
const fetchResourceCategoriesSuccess = resourceCategories => ({
  type: FETCH_RESOURCE_CATEGORIES.SUCCESS,
  resourceCategories
});
const fetchResourceCategoriesFailure = error => ({
  type: FETCH_RESOURCE_CATEGORIES.FAILURE,
  error
});

export const fetchResources = params => {
  const query = queryString.stringify(params, { skipNull: true });
  return dispatch => {
    dispatch(fetchResourcesRequest());
    return axios
      .get(Pathes.Resources.resources(query))
      .then(
        response => {
          dispatch(fetchResourcesSuccess(response.data));
        },
        error => {
          dispatch(fetchResourcesFailure(error));
        }
      )
      .catch(() => dispatch(fetchResourcesFailure({ global: 'Something went wrong' })));
  };
};

export const fetchResourceCategories = query => {
  return dispatch => {
    dispatch(fetchResourceCategoriesRequest());
    return axios
      .get(Pathes.Resources.categories + (query || ''))
      .then(
        response => {
          dispatch(fetchResourceCategoriesSuccess(response.data));
        },
        error => {
          dispatch(fetchResourceCategoriesFailure(error));
        }
      )
      .catch(() => dispatch(fetchResourceCategoriesFailure({ global: 'Something went wrong' })));
  };
};
