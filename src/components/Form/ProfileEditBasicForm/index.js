import * as React from 'react';
import * as classnames from 'classnames';
import AvatarEditorModule from '../../../containers/AvatarEditorModule';
import { base64ToBlob } from '../../../helpers';
import { Formik } from 'formik';
import Select from 'react-select';
import SmallButton from '../../UI/SmallButton';
import { TIMEZONES } from '../../../common/timezones';
import InputTextFieldSmall from '../../UI/InputTextFieldSmall';
import { singleValueSelect } from '../../../common/selectFieldStyles/singleValueSelect';
import './index.scss';

const COUNTRY_CONFIGS = {
  isSearchable: true,
  isClearable: true
};

class ProfileEditBasicForm extends React.Component {
  render() {
    const { profile, className, countries } = this.props;

    const resortedCountries = () => {
      if (!countries || !countries.data) {
        return [];
      }
      const countryToTop = 'United States of America';
      return [
        { name: countryToTop },
        ...countries.data.filter(country => country.name !== countryToTop)
      ].map(country => ({
        value: country.name,
        label: country.name
      }));
    };

    return (
      <div className={classnames('pep_basic_form', className)}>
        <Formik
          initialValues={{
            firstName: profile.first_name,
            lastName: profile.last_name,
            country:
              (profile && profile.country && { value: profile.country, label: profile.country }) ||
              null,
            timezone:
              (profile &&
                profile.timezone && { value: profile.timezone, label: profile.timezone }) ||
              null,
            avatar: profile.avatar,
            editorRef: null,
            isUploaded: false,
            isEditMode: false
          }}
          onSubmit={(values, formikBag) => this.onSubmit(values, formikBag)}
        >
          {({ values, handleChange, handleSubmit, isSubmitting, setFieldValue, handleReset }) => (
            <form className="pep_basic_form__form" autoComplete="off" onSubmit={handleSubmit}>
              <AvatarEditorModule
                className="pep_basic_form__avatar"
                avatar={profile.avatar}
                isEditMode={values.isEditMode}
                isUploaded={values.isUploaded}
                setFieldValue={setFieldValue}
              />
              <div className="pep_basic_form__content">
                <div className="pep_basic_form__fullname">
                  <InputTextFieldSmall
                    label="First Name*"
                    name="firstName"
                    className="pep_basic_form__input"
                    value={values.firstName}
                    onChange={handleChange}
                    readOnly
                  />
                  <InputTextFieldSmall
                    label="Last Name*"
                    name="lastName"
                    className="pep_basic_form__input"
                    value={values.lastName}
                    onChange={handleChange}
                    readOnly
                  />
                </div>
                <div className="country_select">
                  <label className="select__label country_select__label" htmlFor="country">
                    Country*
                  </label>
                  <Select
                    className="select__input"
                    classNamePrefix="select"
                    styles={singleValueSelect}
                    isLoading={countries.loading}
                    isClearable={COUNTRY_CONFIGS.isClearable}
                    isSearchable={COUNTRY_CONFIGS.isSearchable}
                    onChange={country => setFieldValue('country', country)}
                    name="country"
                    isDisabled={!values.isEditMode}
                    value={values.country}
                    placeholder=""
                    options={resortedCountries()}
                    filterOption={(option, input) => option.value.toLowerCase().startsWith(input.toLowerCase())}
                  />
                </div>
                <div className="timezone_select">
                  <label className="select__label timezone_select__label" htmlFor="timezone">
                    Time Zone
                  </label>
                  <Select
                    className="select__input"
                    classNamePrefix="select"
                    styles={singleValueSelect}
                    isClearable={COUNTRY_CONFIGS.isClearable}
                    isSearchable={COUNTRY_CONFIGS.isSearchable}
                    onChange={timezone => setFieldValue('timezone', timezone)}
                    name="timezone"
                    placeholder=""
                    value={values.timezone}
                    isDisabled={!values.isEditMode}
                    options={TIMEZONES.map(timezone => ({
                      value: timezone,
                      label: timezone
                    }))}
                  />
                </div>
                <div className="pep_basic_form__buttons">
                  {values.isEditMode ? (
                    <>
                      <SmallButton
                        type="button"
                        label="Cancel"
                        onClick={() => handleReset()}
                        bgColor="#074E5C"
                      />
                      <SmallButton
                        type="submit"
                        label="Save"
                        onClick={e => handleSubmit(e)}
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
              </div>
            </form>
          )}
        </Formik>
      </div>
    );
  }

  onSubmit = (values, formikBag) => {
    if (values.editorRef) {
      values.file = this.getAvatar(values.editorRef);
    }
    this.props.onSubmit(values, formikBag);
  };

  getAvatar = editorRef => {
    try {
      const canvasScaled = editorRef.getImageScaledToCanvas().toDataURL('image/jpeg');
      const formData = new FormData();
      const jpegFile64 = canvasScaled.replace(/^data:image\/(png|jpeg|jpg);base64,/, '');
      const jpegBlob = base64ToBlob(jpegFile64, 'image/jpeg');
      formData.append('file', jpegBlob);
      return formData;
    } catch (e) {
      console.warn('Could not resolve image');
      return null;
    }
  };
}

export default ProfileEditBasicForm;
