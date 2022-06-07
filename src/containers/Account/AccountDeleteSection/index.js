import * as React from 'react';
import Modal from '../../../components/UI/Modal';
import AccountDeleteForm from '../../../components/Form/AccountDeleteForm';
import SmallButton from '../../../components/UI/SmallButton';
import { connect } from 'react-redux';
import { deactivateAccount } from '../../../store/actions/accountActions';

class AccountDeleteSection extends React.Component {
  state = {
    isOpen: false
  };

  onDeactivate = ({ reason }) => {
    this.props.deactivateAccount({ reason: reason });
  };

  render() {
    return (
      <div className="account_delete_section">
        <div className="title_uppercase">Deactivate Account</div>
        <div className="account_delete_content">
          <div className="account_delete_content__text">
            Deactivating your account will disable your profile and remove your name and photo from
            reviews you gave to other people on the platform. Please note that if you are currently
            collaborating on Kuprik, you will not be able to deactivate your account.
          </div>
          <div className="account_delete_content__buttons">
            <SmallButton
              label="Deactivate Account"
              onClick={() => this.setState({ isOpen: true })}
            />
          </div>
        </div>

        {this.state.isOpen && (
          <Modal onClose={() => this.setState({ isOpen: false })}>
            <AccountDeleteForm
              onSubmit={this.onDeactivate}
              onCancel={() => this.setState({ isOpen: false })}
            />
          </Modal>
        )}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  deactivateAccount: data => dispatch(deactivateAccount(data))
});

export default connect(null, mapDispatchToProps)(AccountDeleteSection);
