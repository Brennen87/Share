import React from 'react';
import { renderRoutes } from 'react-router-config';
import ROUTES from './routes';
import { connect } from 'react-redux';

const allowedRoutes = (user, userStatus) => {
  return ROUTES.filter(route => (route.auth ? route.auth(user, userStatus) : true)) || [];
};

function App({ user, userStatus }) {
  return <div className="App">{renderRoutes(allowedRoutes(user, userStatus))}</div>;
}

const mapStateToProps = state => ({
  user: state.userStore.user,
  userStatus: state.userStore.userStatus,
});

export default connect(mapStateToProps)(App);
