import {
  ADD_ADDITIONAL_PAYMENT,
  CREATE_PAYMENT,
  ACCEPT_PAYMENT,
  CREATE_PROJECT,
  FETCH_DELIVERY,
  FETCH_EXTRA_PAYMENTS,
  FETCH_PROJECT,
  FETCH_PROJECTS_LIST,
  FETCH_SAVED_CARDS,
  POST_DELIVERY,
  POST_PROJECT_REVIEW
} from './actionTypes';
import axios from '../../axios-api';
import queryString from 'query-string';
import Pathes from '../../common/pathes';
import { push } from 'connected-react-router';
import Notify from '../../components/Notification';
import { getFullName } from '../../helpers';
import { ROLES } from '../../common/constants';

const fetchProjectsListRequest = () => ({ type: FETCH_PROJECTS_LIST.REQUEST });
const fetchProjectsListSuccess = payload => ({ type: FETCH_PROJECTS_LIST.SUCCESS, payload });
const fetchProjectsListFailure = error => ({ type: FETCH_PROJECTS_LIST.FAILURE, error });

const fetchProjectRequest = () => ({ type: FETCH_PROJECT.REQUEST });
const fetchProjectSuccess = project => ({ type: FETCH_PROJECT.SUCCESS, project });
const fetchProjectFailure = error => ({ type: FETCH_PROJECT.FAILURE, error });

const createProjectIntentRequest = () => ({ type: CREATE_PROJECT.REQUEST });
const createProjectIntentSuccess = intent => ({ type: CREATE_PROJECT.SUCCESS, intent });
const createProjectIntentFailure = error => ({ type: CREATE_PROJECT.FAILURE, error });

const createPaymentIntentRequest = () => ({ type: CREATE_PAYMENT.REQUEST });
const createPaymentIntentSuccess = intent => ({ type: CREATE_PAYMENT.SUCCESS, intent });
const createPaymentIntentFailure = error => ({ type: CREATE_PAYMENT.FAILURE, error });

const acceptPaymentIntentRequest = () => ({ type: ACCEPT_PAYMENT.REQUEST });
const acceptPaymentIntentSuccess = intent => ({ type: ACCEPT_PAYMENT.SUCCESS, intent });
const acceptPaymentIntentFailure = error => ({ type: ACCEPT_PAYMENT.FAILURE, error });

const fetchSavedCardsRequest = () => ({ type: FETCH_SAVED_CARDS.REQUEST });
const fetchSavedCardsSuccess = cards => ({ type: FETCH_SAVED_CARDS.SUCCESS, cards });
const fetchSavedCardsFailure = error => ({ type: FETCH_SAVED_CARDS.FAILURE, error });

const fetchDeliveryRequest = () => ({ type: FETCH_DELIVERY.REQUEST });
const fetchDeliverySuccess = delivery => ({ type: FETCH_DELIVERY.SUCCESS, delivery });
const fetchDeliveryFailure = error => ({ type: FETCH_DELIVERY.FAILURE, error });

const postDeliveryRequest = () => ({ type: POST_DELIVERY.REQUEST });
const postDeliverySuccess = delivery => ({ type: POST_DELIVERY.SUCCESS, delivery });
const postDeliveryFailure = error => ({ type: POST_DELIVERY.FAILURE, error });

const postProjectReviewRequest = () => ({ type: POST_PROJECT_REVIEW.REQUEST });
const postProjectReviewSuccess = delivery => ({ type: POST_PROJECT_REVIEW.SUCCESS, delivery });
const postProjectReviewFailure = error => ({ type: POST_PROJECT_REVIEW.FAILURE, error });

const fetchExtraPaymentsRequest = () => ({ type: FETCH_EXTRA_PAYMENTS.REQUEST });
const fetchExtraPaymentsSuccess = payments => ({ type: FETCH_EXTRA_PAYMENTS.SUCCESS, payments });
const fetchExtraPaymentsFailure = error => ({ type: FETCH_EXTRA_PAYMENTS.FAILURE, error });

export const fetchProjectList = params => {
  const status = !params.status
    ? null
    : typeof params.status === 'string'
    ? params.status.toUpperCase()
    : params.status.value === 'ALL'
    ? null
    : params.status.value;

  const reqPayload = {
    limit: params.limit,
    page: params.page,
    status
  };
  return (dispatch, getState) => {
    dispatch(fetchProjectsListRequest());
    if (params.coworker) {
      const coworkerRole =
        getState().userStore.user.role === ROLES.vendor ? ROLES.customer : ROLES.vendor;
      reqPayload[coworkerRole] = [
        typeof params.coworker === 'string'
          ? Number.parseInt(params.coworker)
          : params.coworker.value
      ];
    }

    let query = queryString.stringify(reqPayload, { skipNull: true });

    if (status === 'IN_PROGRESS' && params.combinedInProgressStatus) {
      query = `${query}&status=PENDING_CANCELLATION`;
    }

    return axios
      .get(Pathes.Projects.list(query))
      .then(
        response => {
          if (response && response.status === 200) {
            return dispatch(
              fetchProjectsListSuccess({
                ...response.data,
                customers: response.data.customers.map(user => ({
                  value: user.id,
                  label: getFullName(user.first_name, user.last_name)
                })),
                vendors: response.data.vendors.map(user => ({
                  value: user.id,
                  label: user.full_name
                }))
              })
            );
          }
        },
        error => dispatch(fetchProjectsListFailure(error))
      )
      .catch(e => dispatch(fetchProjectsListFailure(e.message)));
  };
};

export const fetchProject = id => {
  return dispatch => {
    if (!id) {
      return dispatch(push('/notfound'));
    }

    dispatch(fetchProjectRequest());
    return axios
      .get(Pathes.Projects.detail(id))
      .then(
        response => dispatch(fetchProjectSuccess(response.data)),
        error => dispatch(fetchProjectFailure(error))
      )
      .catch(e => dispatch(fetchProjectFailure(e.message)));
  };
};

export const createProjectIntent = data => {
  return dispatch => {
    dispatch(createProjectIntentRequest());
    return axios
      .post(Pathes.Projects.createIntent, data)
      .then(
        response => {
          if (response && response.data && response.data.client_secret) {
            dispatch(createProjectIntentSuccess(response.data));
            return response.data;
          }
        },
        error => {
          Notify.info(createProjectIntentFailure(error));
          dispatch(createProjectIntentFailure(error));
        }
      )
      .catch(e => {
        Notify.info(createProjectIntentFailure(e.message));
        dispatch(createProjectIntentFailure(e.message));
      });
  };
};

export const fetchSavedCards = () => {
  return dispatch => {
    dispatch(fetchSavedCardsRequest());
    return axios
      .get(Pathes.Projects.savedCards)
      .then(
        response => {
          response &&
            response.data &&
            response.data.data &&
            dispatch(fetchSavedCardsSuccess(response.data.data));
        },
        error => dispatch(fetchSavedCardsFailure(error))
      )
      .catch(e => dispatch(fetchSavedCardsFailure(e.message)));
  };
};

export const extendProject = data => {
  return () => {
    return axios.post(Pathes.Projects.extend, data);
  };
};

export const cancelProject = data => {
  return () => {
    return axios.post(Pathes.Projects.cancel, data);
  };
};

export const fetchDelivery = id => {
  return dispatch => {
    dispatch(fetchDeliveryRequest());
    return axios
      .get(Pathes.Projects.getDelivery(id))
      .then(
        response => {
          if (response && response.status === 200) {
            dispatch(fetchDeliverySuccess(response.data.data));
          }
        },
        error => dispatch(fetchDeliveryFailure(error))
      )
      .catch(e => dispatch(fetchDeliveryFailure(e.message)));
  };
};

export const postDelivery = delivery => {
  return (dispatch, getState) => {
    dispatch(postDeliveryRequest());
    return axios
      .post(Pathes.Projects.delivery, delivery)
      .then(
        response => {
          if (response && response.status === 201) {
            const { data } = getState().projectStore.delivery;
            const delivery = [response.data];
            if (!data) {
              dispatch(
                postDeliverySuccess({
                  delivery,
                  customer_review: null,
                  vendor_review: null
                })
              );
            } else {
              const delivery = [...data.delivery, response.data];
              dispatch(postDeliverySuccess({ ...data, delivery }));
            }
          }
        },
        error => dispatch(postDeliveryFailure(error))
      )
      .catch(e => dispatch(postDeliveryFailure(e.message)));
  };
};

export const postProjectReview = (isCustomer, review) => {
  return (dispatch, getState) => {
    dispatch(postProjectReviewRequest());
    const path = isCustomer
      ? Pathes.Projects.createVendorReview
      : Pathes.Projects.createCustomerReview;
    return axios
      .post(path, review)
      .then(
        response => {
          if (response && response.status === 201) {
            Notify.info(
              {
                text: isCustomer
                  ? 'Your review for the vendor is received and will be available to the public once the project is completed.'
                  : 'Your review for the customer is received and will be available to the public once the project is completed.'
              },
              { autoClose: 7000 }
            );
            const { data } = getState().projectStore.delivery;
            if (data) {
              const delivery = JSON.parse(JSON.stringify(data));
              delivery[isCustomer ? 'vendor_review' : 'customer_review'] = response.data;
              dispatch(postProjectReviewSuccess(delivery));
            } else {
              const delivery = {
                delivery: [],
                vendor_review: isCustomer ? response.data : null,
                customer_review: !isCustomer ? response.data : null
              };

              dispatch(postProjectReviewSuccess(delivery));
            }
          }
        },
        error => {
          Notify.info({ text: 'An error occured during posting the review. Please try again.' });
          dispatch(postProjectReviewFailure(error));
        }
      )
      .catch(e => {
        Notify.info({ text: 'An error occured during posting the review. Please try again.' });
        dispatch(postProjectReviewFailure(e.message));
      });
  };
};

export const fetchExtraPayments = id => {
  return dispatch => {
    dispatch(fetchExtraPaymentsRequest());
    return axios
      .get(Pathes.Projects.additionalPayments(id))
      .then(
        response => {
          if (response && response.data) {
            dispatch(fetchExtraPaymentsSuccess(response.data));
          }
        },
        error => dispatch(fetchExtraPaymentsFailure(error))
      )
      .catch(e => dispatch(fetchExtraPaymentsFailure(e.message)));
  };
};

export const createPaymentIntent = data => {
  return dispatch => {
    dispatch(createPaymentIntentRequest());
    return axios
      .post(Pathes.Projects.createPaymentIntent, data)
      .then(
        response => {
          if (response && response.status === 201) {
            dispatch(fetchExtraPayments(response.data.project));
          }
        },
        error => {
          dispatch(createPaymentIntentFailure(error));
        }
      )
      .catch(e => {
        dispatch(createPaymentIntentFailure(e.message));
      });
  };
};

export const acceptPaymentIntent = data => {
  return dispatch => {
    dispatch(acceptPaymentIntentRequest());
    return axios
      .post(Pathes.Projects.acceptPaymentIntent, data)
      .then(
        response => {
          if (response && response.data && response.data.client_secret) {
            dispatch(acceptPaymentIntentSuccess(response.data));
            return response.data;
          }
        },
        error => {
          dispatch(acceptPaymentIntentFailure(error));
        }
      )
      .catch(e => {
        dispatch(acceptPaymentIntentFailure(e.message));
      });
  };
};

export const pushExtraPayment = payment => {
  return (dispatch, getState) => {
    const extraPayments = JSON.parse(JSON.stringify(getState().projectStore.extraPayments));
    if (extraPayments.data && extraPayments.data.list) {
      extraPayments.data.list.push(payment);
    } else {
      extraPayments.data = {
        list: [payment]
      };
    }
    dispatch({ type: ADD_ADDITIONAL_PAYMENT, extraPayments });
  };
};

export const deleteSavedCard = paymentMethodDetails => (dispatch, getState) => {
  return axios.delete(Pathes.Projects.savedCards, {
    headers: {
      Authorization: `Token ${getState().userStore.user.token}`
    },
    data: paymentMethodDetails
  });
};
