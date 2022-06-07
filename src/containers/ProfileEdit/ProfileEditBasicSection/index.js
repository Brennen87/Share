import * as React from 'react';
import { connect } from 'react-redux';
import ProfileEditBasicForm from '../../../components/Form/ProfileEditBasicForm';
import { uploadFile } from '../../../store/actions/fileActions';
import { fetchProfile, updateProfileBasic } from '../../../store/actions/profileActions';
import { fetchCountries } from '../../../store/actions/externalActions';
import { fetchUserStatus } from '../../../store/actions/authActions';
import Preloader from '../../../components/Preloader';
import Notify from '../../../components/Notification';
import { FILL_IN_ALL_REQUIRED_FIELDS } from '../../../common/constants';

class ProfileEditBasicSection extends React.Component {
  componentDidMount() {
    this.props.fetchCountries();
  }

  render() {
    const { profile, className, countries } = this.props;
    if (profile.error) {
      return null;
    }

    return (
      <section className={className}>
        {profile.loading || !profile.data ? (
          <Preloader className="pep_basic_form__preloader" />
        ) : (
          <ProfileEditBasicForm
            profile={profile.data}
            countries={countries}
            onSubmit={this.onSubmit}
          />
        )}
      </section>
    );
  }

  onSubmit = async (data, { setSubmitting, setFieldValue }) => {
    if (
      data.firstName &&
      data.lastName &&
      data.country &&
      data.country.value &&
      (data.avatar || data.file)
    ) {
      const basicInfo = {
        first_name: data.firstName,
        last_name: data.lastName,
        country: (data.country && data.country.value) || null,
        timezone: (data.timezone && data.timezone.value) || null
      };

      try {
        if (data.file) {
          await this.props.uploadFile(data.file).then(result => {
            if (result && result.id) {
              basicInfo.avatar = result.id;
            }
          });
        }

        await this.props.updateProfileBasic(basicInfo);

        try {
          await this.props.fetchUserStatus(this.props.user);
        } catch (e) {
          console.error("Error loading user status");
          console.error(e);
        }
        setSubmitting(false);
        setFieldValue('isEditMode', false);
        setFieldValue('isUploaded', false);
      } catch (e) {
        // Do nothing. could not upload file.
        console.error("Error updating profile");
        console.error(e);
      }
    } else {
      setSubmitting(false);
      Notify.info({ text: FILL_IN_ALL_REQUIRED_FIELDS });
    }
  };
}

const mapStateToProps = state => ({
  user: state.userStore.user,
  profile: state.profileStore.profile,
  countries: state.commonStore.countriesList
});

const mapDispatchToProps = dispatch => ({
  uploadFile: file => dispatch(uploadFile(file)),
  updateProfileBasic: userData => dispatch(updateProfileBasic(userData)),
  fetchCountries: () => dispatch(fetchCountries()),
  fetchProfile: () => dispatch(fetchProfile()),
  fetchUserStatus: user => dispatch(fetchUserStatus(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileEditBasicSection);
