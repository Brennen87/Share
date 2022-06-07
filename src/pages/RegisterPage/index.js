import * as React from 'react';
import DocumentTitle from '../../components/DocumentTitle';
import { Link } from 'react-router-dom';
import SignUpForm from '../../components/Form/SignUpForm';
import { connect } from 'react-redux';
import { registerUser } from '../../store/actions/authActions';
import registrationErrorHandler from './errorHandler';
import './index.scss';

class RegisterPage extends React.Component {
  render() {
    const { pageTitle } = this.props.route;
    return (
      <DocumentTitle title={pageTitle}>
        <div className="register_page">
          <div className="container">
            <div className="register_page__content">
              <SignUpForm onSubmit={this.onSubmit} errors={this.props.errors} />
              <div className="register_page__bottom">
                Already a member?
                <Link to="/login" className="register_page__bottom_link">
                  Log In
                </Link>
              </div>
            </div>
          </div>
        </div>
      </DocumentTitle>
    );
  }

  onSubmit = (userData, { setSubmitting, setFieldError }) => {
    const registrationData = {
      first_name: userData.firstName,
      last_name: userData.lastName,
      role: userData.role,
      email: userData.email,
      password1: userData.password,
      password2: userData.passwordConfirm
    };

    this.props.registerUser(registrationData).then(res => {
      if (res !== 'success') {
        registrationErrorHandler(res, setFieldError);
        setSubmitting(false);
      }
    });
  };
}

const mapStateToProps = state => ({
  errors: state.userStore.registerError
});

const mapDispatchToProps = dispatch => ({
  registerUser: userData => dispatch(registerUser(userData))
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
