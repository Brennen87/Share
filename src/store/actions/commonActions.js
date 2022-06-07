import {
  FETCH_ALL_GENRES,
  FETCH_CATEGORIES,
  FETCH_EXPERTISES,
  FETCH_GENRES,
  CLEAR_GENRES,
  FEEDBACK_EMAIL_SENDING,
  CLEAR_FEEDBACK_EMAIL_SENDING
} from './actionTypes';
import queryString from 'query-string';
import Pathes from '../../common/pathes';
import axios from '../../axios-api';
import Notify from '../../components/Notification';

const fetchCategoriesRequest = () => ({ type: FETCH_CATEGORIES.REQUEST });
const fetchCategoriesSuccess = categories => ({ type: FETCH_CATEGORIES.SUCCESS, categories });
const fetchCategoriesFailure = error => ({ type: FETCH_CATEGORIES.FAILURE, error });

const fetchExpertisesRequest = () => ({ type: FETCH_EXPERTISES.REQUEST });
const fetchExpertisesSuccess = expertises => ({ type: FETCH_EXPERTISES.SUCCESS, expertises });
const fetchExpertisesFailure = error => ({ type: FETCH_EXPERTISES.FAILURE, error });

const fetchGenresRequest = () => ({ type: FETCH_GENRES.REQUEST });
const fetchGenresSuccess = genres => ({ type: FETCH_GENRES.SUCCESS, genres });
const fetchGenresFailure = error => ({ type: FETCH_GENRES.FAILURE, error });
const clearGenresAction = () => ({ type: CLEAR_GENRES });

const fetchAllGenresRequest = () => ({ type: FETCH_ALL_GENRES.REQUEST });
const fetchAllGenresSuccess = genres => ({ type: FETCH_ALL_GENRES.SUCCESS, genres });
const fetchAllGenresFailure = error => ({ type: FETCH_ALL_GENRES.FAILURE, error });

const fetchFeedbackEmailSendingReset = () => ({ type: FEEDBACK_EMAIL_SENDING.RESET });
const fetchFeedbackEmailSendingRequest = () => ({ type: FEEDBACK_EMAIL_SENDING.REQUEST });
const fetchFeedbackEmailSendingSuccess = response => ({ type: FEEDBACK_EMAIL_SENDING.SUCCESS, response });
const fetchFeedbackEmailSendingFailure = error => ({ type: FEEDBACK_EMAIL_SENDING.FAILURE, error });
const clearFeedbackEmailSendingAction = () => ({ type: CLEAR_FEEDBACK_EMAIL_SENDING });

export const fetchCategories = () => {
  return dispatch => {
    dispatch(fetchCategoriesRequest());
    return axios
      .get(Pathes.Common.categories)
      .then(
        response => dispatch(fetchCategoriesSuccess(response.data)),
        error => dispatch(fetchCategoriesFailure(error))
      )
      .catch(e => {});
  };
};

export const fetchExpertises = () => {
  return dispatch => {
    dispatch(fetchExpertisesRequest());
    return axios
      .get(Pathes.Common.expertises)
      .then(
        response => dispatch(fetchExpertisesSuccess(response.data)),
        error => dispatch(fetchExpertisesFailure(error))
      )
      .catch(e => {});
  };
};

export const fetchGenres = expertisesList => {
  const query = `?${queryString.stringify({
    categories: expertisesList,
    limit: 70,
    page: 1
  })}`;

  return dispatch => {
    dispatch(fetchGenresRequest());
    return axios
      .get(Pathes.Common.experiences + query)
      .then(
        response => dispatch(fetchGenresSuccess(response.data)),
        error => dispatch(fetchGenresFailure(error))
      )
      .catch(e => {});
  };
};

export const clearGenres = () => dispatch => dispatch(clearGenresAction());

export const fetchAllGenres = () => {
  const query = `?${queryString.stringify({
    limit: 1000,
    page: 1
  })}`;

  return async (dispatch, getState) => {
    await dispatch(fetchExpertises());
    const expertises = getState().commonStore.expertisesList;
    if (expertises && expertises.data) {
      dispatch(fetchAllGenresRequest());
      return axios
        .get(Pathes.Common.experiences + query)
        .then(
          response => {
            if (response && response.data) {
              const sortedGenres = response.data.list.reduce((acc, genre) => {
                if (acc[genre.category_id]) {
                  acc[genre.category_id].push(genre);
                } else {
                  acc[genre.category_id] = [genre];
                }

                return acc;
              }, {});
              dispatch(fetchAllGenresSuccess(sortedGenres));
            }
          },
          error => dispatch(fetchAllGenresFailure(error))
        )
        .catch(e => {});
    }

    return dispatch(fetchAllGenresFailure('Something went wrong'));
  };
};

export const getGenresByCategoryID = id => {
  return axios.get(`${Pathes.Common.experiences}?categories=${id}`);
};

export const updateBilling = details => {
  return axios.post(Pathes.Common.updateBilling, details);
};

export const sendFeedback = payload => {
  return async dispatch => {
    await dispatch(fetchFeedbackEmailSendingRequest());
    return axios
      .post(Pathes.Common.feedback, payload)
      .then(async response => {
        if (response && response.status === 201) {
          await dispatch(
            fetchFeedbackEmailSendingSuccess({
              response: response.data,
              message: payload.get('message')
            })
          );
        } else {
          Notify.info({
            text: 'Some problem occurred when we tried to send your email. Please try again.'
          });
          await dispatch(fetchFeedbackEmailSendingFailure(response));
        }
      })
      .catch(error => {
        Notify.info({
          text: 'Some problem occurred when we tried to send your email. Please try again.'
        });
        console.error(error);
        dispatch(fetchFeedbackEmailSendingFailure(error));
      });
  };
};

export const resetFeedback = () => dispatch => dispatch(clearFeedbackEmailSendingAction());
