import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import * as serviceWorker from './serviceWorker';
import store, { history } from './store/configureStore';
import { ToastContainer } from 'react-toastify';
import { StripeProvider } from 'react-stripe-elements';
import ReactGA from 'react-ga';
import config from './config';
import App from './App';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import 'core-js/es/map';
import 'core-js/es/set';

import 'normalize.css';
import 'react-toastify/dist/ReactToastify.min.css';
import './index.scss';
import './assets/styles/common.scss';

ReactGA.initialize('UA-131122439-1');
history.listen(location => {
  ReactGA.pageview(window.location.pathname + window.location.search);
});

const app = (
  <Provider store={store}>
    <StripeProvider apiKey={config.stripeApiKey}>
      <ConnectedRouter history={history}>
        <App />
        <ToastContainer />
      </ConnectedRouter>
    </StripeProvider>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
