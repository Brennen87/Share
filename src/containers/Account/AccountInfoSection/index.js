import * as React from 'react';
import AccountInfoForm from '../../../components/Form/AccountInfoForm';
import { connect } from 'react-redux';
import {
  fetchAccPersonalInformation,
  updateAccPersonalInformation
} from '../../../store/actions/accountActions';

class AccountInfoSection extends React.Component {
  componentDidMount() {
    this.props.fetchAccPersonalInformation();
  }

  onSubmit = (data, { setSubmitting }) => {
    this.props
      .updateAccPersonalInformation({ ...this.props.information.data, phone: data.phone })
      .finally(() => {
        setSubmitting(false);
      });
  };

  render() {
    const { data } = this.props.information;
    if (!data) {
      return null;
    }

    return (
      <section className="account_info_section">
        <div className="title_uppercase">Url Information</div>
        <AccountInfoForm
          onSubmit={this.onSubmit}
          url={`https://kuprik.com/${data.role}/${data.username}`}
        />
      </section>
    );
  }
}

const mapStateToProps = state => ({
  information: state.accountStore.information
});

const mapDispatchToProps = dispatch => ({
  fetchAccPersonalInformation: () => dispatch(fetchAccPersonalInformation()),
  updateAccPersonalInformation: data => dispatch(updateAccPersonalInformation(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountInfoSection);
