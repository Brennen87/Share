import { METADATA } from '../../common/metadata';
import { FETCH_REVIEW } from '../actions/actionTypes';

const initialState = {
  reviews: { ...METADATA.default, data: null }
};

const reviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_REVIEW.REQUEST:
      return { ...state, reviews: { ...state.reviews, ...METADATA.request } };
    case FETCH_REVIEW.SUCCESS:
      return { ...state, reviews: { data: action.reviews, ...METADATA.success } };
    case FETCH_REVIEW.FAILURE:
      return { ...state, reviews: { ...state.reviews, ...METADATA.error, error: action.error } };
    default:
      return state;
  }
};

export default reviewReducer;
