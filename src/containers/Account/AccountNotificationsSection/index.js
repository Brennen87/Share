import * as React from 'react';
import { connect } from 'react-redux';
import AccountNotificationsForm from '../../../components/Form/AccountNotificationsForm';
import {
  fetchAccNotificationSettings,
  updateAccNotificationSettings
} from '../../../store/actions/accountActions';

class AccountNotificationsSection extends React.Component {
  componentDidMount() {
    this.props.fetchAccNotificationSettings();
  }

  onSubmit = (data, { setSubmitting }) => {
    this.props
      .updateAccNotificationSettings({
        new_message: data.newMessage,
        resource_updates: data.resourceUpdates,
        kuprik_updates: data.kuprikUpdates,
        kuprik_recommendations: data.kuprikRecommendations
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  render() {
    const { data } = this.props.notifications;

    if (!data) {
      return null;
    }

    return (
      <div className="account_notification_section">
        <div className="title_uppercase">Notifications</div>
        <AccountNotificationsForm onSubmit={this.onSubmit} notifications={data} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  notifications: state.accountStore.notifications
});

const mapDispatchToProps = dispatch => ({
  fetchAccNotificationSettings: () => dispatch(fetchAccNotificationSettings()),
  updateAccNotificationSettings: data => dispatch(updateAccNotificationSettings(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountNotificationsSection);
