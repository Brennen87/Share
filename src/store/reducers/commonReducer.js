import { METADATA } from '../../common/metadata';
import {
  FETCH_CATEGORIES,
  FETCH_COUNTRIES,
  FETCH_GENRES,
  FETCH_EXPERTISES,
  FETCH_ALL_GENRES,
  CLEAR_GENRES,
  FEEDBACK_EMAIL_SENDING,
  CLEAR_FEEDBACK_EMAIL_SENDING
} from '../actions/actionTypes';

const initialState = {
  countriesList: { ...METADATA.default, data: [] },
  categoriesList: { ...METADATA.default, data: null },
  expertisesList: { ...METADATA.default, data: null },
  genresList: { ...METADATA.default, data: null },
  sortedGenres: { ...METADATA.default, data: null },
  feedbackEmailSending: { ...METADATA.default, data: null }
};

const commonReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COUNTRIES.REQUEST:
      return { ...state, countriesList: { ...state.countriesList, ...METADATA.request } };
    case FETCH_COUNTRIES.SUCCESS:
      return { ...state, countriesList: { data: action.countries, ...METADATA.success } };
    case FETCH_COUNTRIES.FAILURE:
      return { ...state, countriesList: { ...state.countriesList, ...METADATA.error } };

    case FETCH_CATEGORIES.REQUEST:
      return { ...state, categoriesList: { ...state.categoriesList, ...METADATA.request } };
    case FETCH_CATEGORIES.SUCCESS:
      return { ...state, categoriesList: { data: action.categories, ...METADATA.success } };
    case FETCH_CATEGORIES.FAILURE:
      return { ...state, categoriesList: { ...state.categoriesList, ...METADATA.error } };

    case FETCH_EXPERTISES.REQUEST:
      return { ...state, expertisesList: { ...state.expertisesList, ...METADATA.request } };
    case FETCH_EXPERTISES.SUCCESS:
      return { ...state, expertisesList: { data: action.expertises, ...METADATA.success } };
    case FETCH_EXPERTISES.FAILURE:
      return { ...state, expertisesList: { ...state.expertisesList, ...METADATA.error } };

    case FETCH_GENRES.REQUEST:
      return { ...state, genresList: { ...state.genresList, ...METADATA.request } };
    case FETCH_GENRES.SUCCESS:
      return { ...state, genresList: { data: action.genres, ...METADATA.success } };
    case FETCH_GENRES.FAILURE:
      return { ...state, genresList: { ...state.genresList, ...METADATA.error } };
    case CLEAR_GENRES:
      return {
        ...state,
        genresList: { ...state.genresList, ...METADATA.error, data: { list: [] } }
      };

    case FETCH_ALL_GENRES.REQUEST:
      return { ...state, sortedGenres: { ...state.sortedGenres, ...METADATA.request } };
    case FETCH_ALL_GENRES.SUCCESS:
      return { ...state, sortedGenres: { data: action.genres, ...METADATA.success } };
    case FETCH_ALL_GENRES.FAILURE:
      return { ...state, sortedGenres: { ...state.sortedGenres, ...METADATA.error } };

    case FEEDBACK_EMAIL_SENDING.RESET:
      return {
        ...state,
        feedbackEmailSending: initialState.feedbackEmailSending
      };
    case FEEDBACK_EMAIL_SENDING.REQUEST:
      return {
        ...state,
        feedbackEmailSending: { ...state.feedbackEmailSending, ...METADATA.request }
      };
    case FEEDBACK_EMAIL_SENDING.SUCCESS:
      return {
        ...state,
        feedbackEmailSending: { data: action.response, ...METADATA.success }
      };
    case FEEDBACK_EMAIL_SENDING.FAILURE:
      return {
        ...state,
        feedbackEmailSending: { ...state.feedbackEmailSending, ...METADATA.error }
      };
    case CLEAR_FEEDBACK_EMAIL_SENDING:
      return {
        ...state,
        feedbackEmailSending: { data: null, ...METADATA.default }
      };

    default:
      return state;
  }
};

export default commonReducer;
