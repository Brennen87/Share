import { METADATA } from '../../common/metadata';
import { FETCH_RESOURCES, FETCH_RESOURCE_CATEGORIES } from '../actions/actionTypes';

const initialState = {
  resourcesList: { ...METADATA.default, data: null },
  resourceCategoriesList: { ...METADATA.default, data: null }
};

const resourceReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_RESOURCES.REQUEST:
      return { ...state, resourcesList: { ...state.resourcesList, ...METADATA.request } };
    case FETCH_RESOURCES.SUCCESS:
      return { ...state, resourcesList: { data: action.resources, ...METADATA.success } };
    case FETCH_RESOURCES.FAILURE:
      return {
        ...state,
        resourcesList: { ...state.resourcesList, error: action.error, ...METADATA.error }
      };

    case FETCH_RESOURCE_CATEGORIES.REQUEST:
      return {
        ...state,
        resourceCategoriesList: { ...state.resourceCategories, ...METADATA.request }
      };
    case FETCH_RESOURCE_CATEGORIES.SUCCESS:
      return {
        ...state,
        resourceCategoriesList: { data: action.resourceCategories, ...METADATA.success }
      };
    case FETCH_RESOURCE_CATEGORIES.FAILURE:
      return {
        ...state,
        resourceCategoriesList: { ...state.resourceCategories, ...METADATA.error }
      };
    default:
      return state;
  }
};

export default resourceReducer;
