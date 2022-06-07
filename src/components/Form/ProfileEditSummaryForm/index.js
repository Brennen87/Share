import React from 'react';
import SmallButton from '../../UI/SmallButton';
import InputTextFieldSmall from '../../UI/InputTextFieldSmall';
import SelectField from '../../UI/SelectField';
import TextareaField from '../../UI/TextareaField';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { responseFormat, selectFormat } from '../../../helpers';
import { multiValueSelect } from '../../../common/selectFieldStyles/multiValueSelect';
import './index.scss';
import Notify from '../../Notification';
import { FILL_IN_ALL_REQUIRED_FIELDS } from '../../../common/constants';

const rateDescribe = '(Only in US dollars. Example: $0.002/word)';
const miniResumeDescribe = 'Do not include websites, e-mails or phone numbers';

const DOLLAR_SIGN_WARNING = 'You must include a dollar sign before your rate. Example: $30/hr';
const MINI_RESUME_WARNING =
  'You must not include websites, e-mail addresses or phone numbers in your description';

const validatorMiniResume = () => {};

const VALIDATION_SCHEMA = Yup.object().shape({
  categories: Yup.array().required(),
  expertises: Yup.array().required(),
  genres: Yup.array().required(),
  rate: Yup.string()
    .required()
    .matches(/[$]/, DOLLAR_SIGN_WARNING),
  miniResume: Yup.string().required()
});

const ProfileEditSummaryForm = props => {
  const { vendor, categories, expertises, genres, onSubmit, updateGenres, clearGenres } = props;
  return (
    <div className="pep_summary_form">
      <Formik
        enableReinitialize
        initialValues={{
          rate: vendor.rate || '',
          categories: selectFormat(vendor.services),
          expertises: selectFormat(vendor.expertises),
          genres: selectFormat(vendor.genres),
          miniResume: vendor.mini_resume || '',
          isEditMode: false
        }}
        onSubmit={(values, formikBag) => onSubmit(values, formikBag)}
        validationSchema={VALIDATION_SCHEMA}
      >
        {({
          values,
          handleChange,
          handleSubmit,
          setFieldValue,
          handleReset,
          isSubmitting,
          validateForm
        }) => (
          <form className="pep_summary_form__form" autoComplete="off" onSubmit={handleSubmit}>
            <div className="pep_summary_form__title">Summary</div>
            {categories && categories.data && (
              <div className="pep_summary_form__categories">
                <SelectField
                  label="Service*"
                  classNamePrefix="select"
                  styles={multiValueSelect}
                  isLoading={categories.loading}
                  isMulti
                  name="services"
                  value={values.categories}
                  onChange={value => setFieldValue('categories', value)}
                  isDisabled={!values.isEditMode}
                  options={
                    categories?.data?.list
                      ? categories.data.list.map(category => ({
                          value: category.id,
                          label: category.name
                        }))
                      : []
                  }
                />
              </div>
            )}
            {expertises.data && (
              <div className="pep_summary_form__expertises">
                <SelectField
                  label="Expertise*"
                  classNamePrefix="select"
                  styles={multiValueSelect}
                  isLoading={expertises.loading}
                  isMulti
                  name="expertises"
                  value={values.expertises}
                  isDisabled={!values.isEditMode}
                  onChange={async value => {
                    setFieldValue('expertises', value);
                    if (responseFormat(value).length) {
                      await updateGenres(responseFormat(value));
                    } else {
                      await clearGenres();
                    }

                    let updatedGenreValues = values.genres ? [...values.genres] : [];
                    const selectedExpertiseIds = value
                      ? value.map(expertise => expertise.value)
                      : [];
                    values.genres &&
                      values.genres.forEach(currentGenre => {
                        const foundGenreData = genres.data.list.find(
                          genreData => genreData.id === currentGenre.value
                        );
                        if (
                          foundGenreData &&
                          !selectedExpertiseIds.includes(foundGenreData.category_id)
                        ) {
                          updatedGenreValues = updatedGenreValues.filter(
                            genre => genre.value !== currentGenre.value
                          );
                        }
                      });
                    setFieldValue('genres', updatedGenreValues);
                  }}
                  options={expertises.data.list.map(category => ({
                    value: category.id,
                    label: category.name
                  }))}
                />
              </div>
            )}
            {genres.data && (
              <div className="pep_summary_form__experiences">
                <SelectField
                  label="Experienced In*"
                  classNamePrefix="select"
                  styles={multiValueSelect}
                  isLoading={genres.loading}
                  isMulti
                  name="genres"
                  value={values.genres}
                  isDisabled={!values.isEditMode}
                  onChange={value => setFieldValue('genres', value)}
                  options={genres.data.list.map(genre => ({
                    value: genre.id,
                    label: genre.name
                  }))}
                />
              </div>
            )}
            <InputTextFieldSmall
              name="rate"
              label="Rate*"
              className="pep_summary_form__rate"
              value={values.rate}
              onChange={handleChange}
              disabled={!values.isEditMode}
              text={rateDescribe}
              row
            />
            <div className="pep_summary_form__resume">
              <TextareaField
                value={values.miniResume}
                onChange={handleChange}
                disabled={!values.isEditMode}
                name="miniResume"
                label="Professional Summary*"
                text={miniResumeDescribe}
              />
            </div>
            <div className="pep_summary_form__buttons">
              {values.isEditMode ? (
                <>
                  <SmallButton
                    type="button"
                    label="Cancel"
                    onClick={() => handleReset()}
                    bgColor="#074E5C"
                  />
                  <SmallButton
                    type="button"
                    label="Save"
                    onClick={() => {
                      validateForm().then(formErrors => {
                        if (Object.keys(formErrors).length) {
                          if (formErrors.rate === DOLLAR_SIGN_WARNING) {
                            Notify.info({ text: DOLLAR_SIGN_WARNING });
                            return;
                          }

                          Notify.info({ text: FILL_IN_ALL_REQUIRED_FIELDS });
                          return;
                        }

                        const foundGenreExpertises = new Set();
                        values.genres &&
                          values.genres.forEach(genre => {
                            const foundGenreData = genres.data.list.find(
                              genreData => genreData.id === genre.value
                            );
                            if (foundGenreData) {
                              foundGenreExpertises.add(foundGenreData.category_id);
                            }
                          });

                        if (
                          values.expertises &&
                          values.expertises.length !== foundGenreExpertises.size
                        ) {
                          Notify.info({
                            text:
                              'Please select at least one field you are experienced in for every selected expertise.'
                          });
                          return;
                        }

                        if (
                          values.miniResume.includes('www') ||
                          values.miniResume.includes('http') ||
                          values.miniResume.includes('.com') ||
                          values.miniResume.includes('.net') ||
                          values.miniResume.includes('.org') ||
                          values.miniResume.includes('.io') ||
                          values.miniResume.includes('@')
                        ) {
                          Notify.info({ text: MINI_RESUME_WARNING });
                          return;
                        }

                        handleSubmit();
                      });
                    }}
                    disabled={isSubmitting}
                    bgColor="#074E5C"
                  />
                </>
              ) : (
                <SmallButton
                  type="button"
                  label="Edit"
                  onClick={() => setFieldValue('isEditMode', true)}
                  bgColor="#074E5C"
                />
              )}
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default ProfileEditSummaryForm;
