import * as React from 'react';
import DocumentTitle from '../../components/DocumentTitle';
import PasswordRecoveryForm from '../../components/Form/PasswordRecoveryForm';
import Button from '../../components/UI/Button';
import { connect } from 'react-redux';
import { resetPassword } from '../../store/actions/authActions';
import './index.scss';

class PasswordRecoveryPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resetSuccess: false
    };
  }

  render() {
    const { resetSuccess } = this.state;
    const { route, history } = this.props;

    return (
      <DocumentTitle title={route.pageTitle}>
        <div className="pswd_recovery_page">
          <div className="container">
            {!resetSuccess && (
              <div className="pswd_recovery_page__wrapper">
                <h4 className="pswd_recovery_page__title">Reset Password</h4>
                <PasswordRecoveryForm onSubmit={this.onSubmit} />
              </div>
            )}

            {resetSuccess && (
              <div className="pswd_recovery_page__success_wrapper">
                <h4 className="pswd_recovery_page__title">Success</h4>
                <p className="pswd_recovery_page__description">
                  Your password has been successfully reset. You can now login with your new
                  password.
                </p>
                <Button
                  label="Log In"
                  onClick={() => history.push('/login')}
                  className="pswd_recovery_page__btn_success"
                />
              </div>
            )}
          </div>
        </div>
      </DocumentTitle>
    );
  }

  onSubmit = (values, { setSubmitting }) => {
    const data = {
      new_password1: values.password,
      new_password2: values.passwordConfirm,
      uid: this.props.match.params.uid,
      token: this.props.match.params.token
    };

    this.props.resetPassword(data).then(res => {
      res && res.status
        ? this.setState({ ...this.state, resetSuccess: true })
        : setSubmitting(false);
    });
  };
}

const mapDispatchToProps = dispatch => ({
  resetPassword: data => dispatch(resetPassword(data))
});

export default connect(null, mapDispatchToProps)(PasswordRecoveryPage);
