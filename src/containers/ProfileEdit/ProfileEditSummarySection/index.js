import * as React from 'react';
import { connect } from 'react-redux';
import ProfileEditSummaryForm from '../../../components/Form/ProfileEditSummaryForm';
import { updateProfileSummary } from '../../../store/actions/profileActions';
import { fetchUserStatus } from '../../../store/actions/authActions';
import { isEmpty, responseFormat } from '../../../helpers';
import {
  fetchCategories,
  fetchExpertises,
  fetchGenres,
  clearGenres
} from '../../../store/actions/commonActions';
import Notify from '../../../components/Notification';
import { FILL_IN_ALL_REQUIRED_FIELDS } from '../../../common/constants';

class ProfileEditSummarySection extends React.Component {
  componentDidMount() {
    this.props.fetchCategories();
    this.props.fetchExpertises();
    this.props.fetchGenres(this.props.vendor.data.expertises.map(item => item.id));
  }

  render() {
    const { vendor, categories, expertises, genres, className } = this.props;
    return (
      <section className={className}>
        {!(vendor.loading || !vendor.data) && (
          <ProfileEditSummaryForm
            vendor={vendor.data}
            categories={categories}
            expertises={expertises}
            genres={genres}
            updateGenres={this.props.fetchGenres}
            clearGenres={this.props.clearGenres}
            onSubmit={this.onSubmit}
          />
        )}
      </section>
    );
  }

  onSubmit = async (values, { setSubmitting, setFieldValue }) => {
    if (
      !isEmpty(values.expertises) &&
      !isEmpty(values.genres) &&
      !isEmpty(values.categories) &&
      values.rate &&
      values.miniResume
    ) {
      const body = {
        expertises: responseFormat(values.expertises),
        genres: responseFormat(values.genres),
        services: responseFormat(values.categories),
        rate: values.rate,
        mini_resume: values.miniResume
      };

      try {
        await this.props.updateProfileSummary(body);
        try {
          await this.props.fetchUserStatus(this.props.user);
        } catch(e) {
          console.error("Error loading user status");
          console.error(e);
        }
        setSubmitting(false);
        setFieldValue('isEditMode', false);
      } catch(e) {
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
  vendor: state.profileStore.vendor,
  categories: state.commonStore.categoriesList,
  expertises: state.commonStore.expertisesList,
  genres: state.commonStore.genresList,
  user: state.userStore.user,
});

const mapDispatchToProps = dispatch => ({
  fetchCategories: () => dispatch(fetchCategories()),
  fetchExpertises: () => dispatch(fetchExpertises()),
  fetchGenres: expertises => dispatch(fetchGenres(expertises)),
  clearGenres: () => dispatch(clearGenres()),
  updateProfileSummary: data => dispatch(updateProfileSummary(data)),
  fetchUserStatus: user => dispatch(fetchUserStatus(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileEditSummarySection);
