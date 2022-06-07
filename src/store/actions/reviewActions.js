import { FETCH_REVIEW } from './actionTypes';
import axios from '../../axios-api';
import Pathes from '../../common/pathes';
import queryString from 'query-string';

const fetchReviewsRequest = () => ({ type: FETCH_REVIEW.REQUEST });
const fetchReviewsSuccess = reviews => ({ type: FETCH_REVIEW.SUCCESS, reviews });
const fetchReviewsFailure = error => ({ type: FETCH_REVIEW.FAILURE, error });

export const fetchReviews = (role, id, query, isNext) => {
  return (dispatch, getState) => {
    dispatch(fetchReviewsRequest());
    return axios
      .get(Pathes.Review.reviews(role, id, queryString.stringify(query)))
      .then(
        response => {
          if (response && response.status === 200) {
            const newReviews = response.data;
            const currentReviews = getState().reviewStore.reviews;
            if (isNext && currentReviews.data && !!currentReviews.data.list.length) {
              const result = {
                ...newReviews,
                list: [...currentReviews.data.list, ...newReviews.list]
              };

              dispatch(fetchReviewsSuccess(result));
            } else {
              dispatch(fetchReviewsSuccess(newReviews));
            }
            return response.data;
          }

          throw Error('Could not get reviews');
        },
        error => {
          dispatch(fetchReviewsFailure(error));
        }
      )
      .catch(e => dispatch(fetchReviewsFailure(e.message)));
  };
};
