import { SEARCH, SET_SEARCH_VALUE } from '../actions/actionTypes';
import { METADATA } from '../../common/metadata';

const initialState = {
  searchValue: '',
  searchResult: { ...METADATA.default, data: null }
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SEARCH_VALUE:
      return { ...state, searchValue: action.text };
    case SEARCH.REQUEST:
      return { ...state, searchResult: { ...state.searchResult, ...METADATA.request } };
    case SEARCH.SUCCESS:
      return {
        ...state,
        searchResult: { data: action.result, ...METADATA.success }
      };
    case SEARCH.FAILURE:
      return {
        ...state,
        searchResult: { ...state.searchResult, error: action.error, ...METADATA.error }
      };
    default:
      return state;
  }
};

export default searchReducer;
