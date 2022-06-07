import React from 'react';
import AccountPasswordForm from '../../../components/Form/AccountPasswordForm';
import { fetchChangeAccPassword } from '../../../store/actions/accountActions';
import { connect } from 'react-redux';

class AccountPasswordSection extends React.Component {
  render() {
    return (
      <div className="account_password_section">
        <div className="title_uppercase">Change Password</div>
        <AccountPasswordForm onSubmit={this.onSubmit} />
      </div>
    );
  }

  onSubmit = (values, { setSubmitting }) => {
    const data = {
      old_password: values.password,
      new_password: values.newPassword
    };
    this.props.changeAccPassword(data).then(res => {
      res && res.status ? this.setState({ ...this.state }) : setSubmitting(false);
    });
  };
}

const mapDispatchToProps = dispatch => ({
  changeAccPassword: data => dispatch(fetchChangeAccPassword(data))
});

export default connect(null, mapDispatchToProps)(AccountPasswordSection);
