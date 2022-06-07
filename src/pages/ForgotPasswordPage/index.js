import * as React from 'react';
import { Link } from 'react-router-dom';
import DocumentTitle from '../../components/DocumentTitle';
import ForgotPasswordForm from '../../components/Form/ForgotPasswordForm';
import { forgotPassword } from '../../store/actions/authActions';
import { connect } from 'react-redux';
import './index.scss';

class ForgotPasswordPage extends React.Component {
  render() {
    return (
      <DocumentTitle title={this.props.route.pageTitle}>
        <div className="fgt_password_page">
          <div className="container">
            <div className="fgt_password_page__wrapper">
              <h4 className="fgt_password_page__title">Forgot Password</h4>
              <p className="fgt_password_page__description">
                Please enter your email address and we will send you instructions on how to reset
                your password.
              </p>
              <ForgotPasswordForm onSubmit={this.onSubmit} />
              <div className="fgt_password_page__bottom">
                <span>Back to </span>
                <Link className="fgt_password_page__link" to="/login">
                  Log In
                </Link>
              </div>
            </div>
          </div>
        </div>
      </DocumentTitle>
    );
  }

  onSubmit = (email, { setSubmitting }) => {
    this.props.forgotPassword(email).then(res => !res && setSubmitting(false));
  };
}

const mapDispatchToProps = dispatch => ({
  forgotPassword: email => dispatch(forgotPassword(email))
});

export default connect(null, mapDispatchToProps)(ForgotPasswordPage);
