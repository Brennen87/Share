import { createBrowserHistory } from 'history';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import thunkMiddleware from 'redux-thunk';
import axios from '../axios-api';
import { loadFromLocalStorage, saveToLocalStorage } from './localStorage';
import { logoutUser } from './actions/authActions';
import userReducer from './reducers/userReducer';
import commonReducer from './reducers/commonReducer';
import profileReducer from './reducers/profileReducer';
import searchReducer from './reducers/searchReducer';
import portfolioReducer from './reducers/portfolioReducer';
import teamReducer from './reducers/teamReducer';
import vendorReducer from './reducers/vendorReducer';
import reviewReducer from './reducers/reviewReducer';
import projectsReducer from './reducers/projectsReducer';
import inboxReducer from './reducers/inboxReducer';
import accountReducer from './reducers/accountReducer';
import conversationReducer from './reducers/conversationReducer';
import resourceReducer from './reducers/resourceReducer';
import paymentsReducer from './reducers/paymentsReducer';

export const history = createBrowserHistory();

const rootReducer = combineReducers({
  router: connectRouter(history),
  userStore: userReducer,
  profileStore: profileReducer,
  commonStore: commonReducer,
  searchStore: searchReducer,
  portfolioStore: portfolioReducer,
  teamStore: teamReducer,
  vendorStore: vendorReducer,
  reviewStore: reviewReducer,
  projectStore: projectsReducer,
  inboxStore: inboxReducer,
  accountStore: accountReducer,
  conversationStore: conversationReducer,
  paymentsStore: paymentsReducer,
  resourceStore: resourceReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middleware = [thunkMiddleware, routerMiddleware(history)];

const enhancers = composeEnhancers(applyMiddleware(...middleware));

const persistedState = loadFromLocalStorage();

const store = createStore(rootReducer, persistedState, enhancers);

store.subscribe(() => {
  saveToLocalStorage({
    userStore: {
      user: store.getState().userStore.user,
      userStatus: store.getState().userStore.userStatus,
    }
  });
});

axios.interceptors.request.use(config => {
  try {
    config.headers.Authorization = `Token ${store.getState().userStore.user.token}`;
  } catch (e) {
    // do nothing, user is not logged in
  }

  return config;
});

axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error && error.response && error.response.status === 401) {
      store.dispatch(logoutUser());
    }
    return error.response;
  }
);

export default store;
