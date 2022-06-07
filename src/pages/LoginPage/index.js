import * as React from 'react';
import DocumentTitle from '../../components/DocumentTitle';
import LoginForm from '../../components/Form/LoginForm';
import { Link } from 'react-router-dom';
import { fetchUserStatus, loginUser, logoutUserNoRedirect } from '../../store/actions/authActions';
import { connect } from 'react-redux';
import Notify from '../../components/Notification';
import TOASTER_MESSAGES from '../../common/toaster';
import './index.scss';

class LoginPage extends React.Component {
  componentDidMount() {
    this.props.user && this.props.history.push('/home');
  }

  render() {
    return (
      <DocumentTitle title={this.props.route.pageTitle}>
        <div className="login_page">
          <div className="container">
            <div className="login_page__content">
              <LoginForm onSubmit={this.onSubmit} />
              <div className="login_page__bottom">
                <Link to="/forgot" className="login_page__link">
                  Forgot password?
                </Link>
                <div>
                  <span>Not a member?</span>
                  <Link to="/register" className="login_page__link">
                    Sign Up
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DocumentTitle>
    );
  }

  onSubmit = async (values, { setSubmitting }) => {
    const loginData = {
      email: values.email,
      password: values.password
    };
    const loginResponse = await this.props.loginUser(loginData);
    if (loginResponse?.status && loginResponse?.user) {
      const statusResponse = await this.props.fetchUserStatus(loginResponse.user);
      if (statusResponse?.status) {
        this.props.history.push('/');
        Notify.info({
          text: TOASTER_MESSAGES.loginSuccess(loginResponse.user.first_name),
          isInfo: true
        });
      } else {
        setSubmitting(false);
        this.props.logoutUserNoRedirect();
      }
    } else {
      setSubmitting(false);
    }
  };
}

const mapStateToProps = state => ({
  user: state.userStore.user
});

const mapDispatchToProps = dispatch => ({
  loginUser: userData => dispatch(loginUser(userData)),
  fetchUserStatus: user => dispatch(fetchUserStatus(user)),
  logoutUserNoRedirect: () => dispatch(logoutUserNoRedirect()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
