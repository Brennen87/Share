import * as React from 'react';
import { connect } from 'react-redux';
import InputTextFieldSmall from '../../UI/InputTextFieldSmall';
import SmallButton from '../../UI/SmallButton';
import { Formik } from 'formik';
import * as Yup from 'yup';
import SelectField from '../../UI/SelectField';
import { singleValueSelect } from '../../../common/selectFieldStyles/singleValueSelect';
import {
  ONLY_NUMBER_REGEX,
  US_DATE_FORMAT_REGEX,
  WEBSITE_REGEX,
  SSN_REQUIRING_COUNTRIES,
  FILL_IN_ALL_REQUIRED_FIELDS
} from '../../../common/constants';
import './index.scss';
import TextareaField from '../../UI/TextareaField';
import Notify from '../../Notification';
import InputMask from 'react-input-mask';
import * as classnames from 'classnames';
import Preloader from '../../Preloader';

const COUNTRY_CONFIGS = {
  isSearchable: true,
  isClearable: true
};

const addressDescribe = '(PO Boxes are not allowed)';
const stripeTosDescribe =
  "(Every time you make edits, you will need to re-accept Stripe's Terms of Service)";

const AccountIndividualForm = ({ onSubmit, accountInfo, exist, countries, user }) => {
  const [isWebsiteRequired, setIsWebsiteRequired] = React.useState(false);
  const [isSsnRequired, setIsSsnRequired] = React.useState(() =>
    SSN_REQUIRING_COUNTRIES.includes(accountInfo?.country?.value?.toLowerCase())
  );

  const VALIDATION_SCHEMA = Yup.object().shape({
    type: Yup.string().required(),
    firstName: Yup.string().required(),
    lastName: Yup.string().required(),
    productDescription: Yup.string().required(),
    dateOfBirth: Yup.string()
      .matches(US_DATE_FORMAT_REGEX, 'Must be in format MM/DD/YYYY')
      .required(),
    occupation: Yup.string().required(),
    ...(isWebsiteRequired
      ? {
          website: Yup.string().matches(WEBSITE_REGEX, 'Must be valid URL')
        }
      : {}),
    ...(!exist
      ? {
          ...(isSsnRequired
            ? {
                ssn: Yup.string()
                  .matches(ONLY_NUMBER_REGEX, 'Must be only digits')
                  .min(9, 'Must be exactly 9 digits')
                  .max(9, 'Must be exactly 9 digits')
                  .required()
              }
            : {}),
          accNumber: Yup.string()
            .matches(ONLY_NUMBER_REGEX, 'Must be only digits')
            .min(9, 'Must be exactly 9 digits')
            .required(),
          routeNumber: Yup.string()
            .matches(ONLY_NUMBER_REGEX, 'Must be only digits')
            .min(9, 'Must be exactly 9 digits')
            .required()
        }
      : {}),
    address: Yup.string().required(),
    city: Yup.string().required(),
    zipCode: Yup.string().required(),
    state: Yup.string().required(),
    country: Yup.string()
      .nullable()
      .required(),
    phone: Yup.string().required(),
    acceptStripeTos: Yup.bool().oneOf([true], 'Field must be checked')
  });

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
    <Formik
      enableReinitialize
      validationSchema={VALIDATION_SCHEMA}
      onSubmit={(values, formikBag) => onSubmit(values, formikBag)}
      initialValues={{
        ...accountInfo,
        type: 'individual',
        ssn: '',
        accNumber: '',
        routeNumber: ''
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleSubmit,
        handleBlur,
        setFieldValue,
        isSubmitting,
        validateForm
      }) => (
        <form className="acc_individual_form" onSubmit={handleSubmit}>
          <div className="select_field">
            <label className="select_field__label">Type*</label>
            <div className="select_field__input">Individual</div>
          </div>
          <SelectField
            name="country"
            label="Country*"
            placeholder=""
            onChange={country => {
              setFieldValue('country', country);
              setIsSsnRequired(SSN_REQUIRING_COUNTRIES.includes(country?.value?.toLowerCase()));
            }}
            value={values.country}
            styles={singleValueSelect}
            isLoading={countries.loading}
            isClearable={COUNTRY_CONFIGS.isClearable}
            isSearchable={COUNTRY_CONFIGS.isSearchable}
            options={resortedCountries()}
            filterOption={(option, input) =>
              option.value.toLowerCase().startsWith(input.toLowerCase())
            }
            isDisabled={exist}
            error={errors?.country && errors.country.replace('country', 'Country')}
            onBlur={handleBlur}
          />
          <TextareaField
            name="productDescription"
            label="Product Description*"
            onChange={handleChange}
            value={values.productDescription}
            error={
              touched.productDescription &&
              errors.productDescription &&
              errors.productDescription.replace('productDescription', 'Product Description')
            }
            onBlur={handleBlur}
          />
          <InputTextFieldSmall
            name="firstName"
            label="First Name*"
            onChange={handleChange}
            value={values.firstName}
            error={
              touched.firstName &&
              errors.firstName &&
              errors.firstName.replace('firstName', 'First Name')
            }
            onBlur={handleBlur}
            row
          />
          <InputTextFieldSmall
            name="lastName"
            label="Last Name*"
            onChange={handleChange}
            value={values.lastName}
            error={
              touched.lastName &&
              errors.lastName &&
              errors.lastName.replace('lastName', 'Last Name')
            }
            onBlur={handleBlur}
            row
          />
          <div className="acc_individual_form__birthdate">
            <InputMask
              mask="99/99/9999"
              value={values.dateOfBirth}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="MM/DD/YYYY"
            >
              {inputProps => (
                <InputTextFieldSmall
                  {...inputProps}
                  name="dateOfBirth"
                  label="Date of Birth*"
                  placeholder="MM/DD/YYYY"
                  error={
                    touched.dateOfBirth &&
                    errors.dateOfBirth &&
                    errors.dateOfBirth.replace('dateOfBirth', 'Date of Birth')
                  }
                  row
                />
              )}
            </InputMask>
          </div>
          {isSsnRequired ? (
            <InputTextFieldSmall
              name="ssn"
              label="SSN*"
              text="(or similar government issued number)"
              placeholder={accountInfo.type ? (values.ssnLast4Digits || "*********") : ''}
              onChange={handleChange}
              value={values.ssn}
              error={touched.ssn && errors.ssn && errors.ssn.replace('ssn', 'SSN')}
              onBlur={handleBlur}
              row
            />
          ) : null}
          <InputTextFieldSmall
            name="occupation"
            label="Occupation*"
            onChange={handleChange}
            value={values.occupation}
            error={
              touched.occupation &&
              errors.occupation &&
              errors.occupation.replace('occupation', 'Occupation')
            }
            onBlur={handleBlur}
            row
          />
          <InputTextFieldSmall
            name="website"
            label="Website"
            onChange={handleChange}
            value={values.website}
            error={
              touched.website && errors.website && errors.website.replace('website', 'Website')
            }
            onBlur={handleBlur}
            row
          />
          <InputTextFieldSmall
            name="accNumber"
            label="Account Number*"
            placeholder={accountInfo.type ? `*****${values.accountNumberLast4Digits}` : ''}
            onChange={handleChange}
            value={values.accNumber}
            error={
              touched.accNumber &&
              errors.accNumber &&
              errors.accNumber.replace('accNumber', 'Account Number')
            }
            onBlur={handleBlur}
            row
          />
          <InputTextFieldSmall
            name="routeNumber"
            label="Bank Routing Number*"
            placeholder={accountInfo.routeNumber}
            onChange={handleChange}
            value={values.routeNumber}
            error={
              touched.routeNumber &&
              errors.routeNumber &&
              errors.routeNumber.replace('routeNumber', 'Bank Routing Number')
            }
            onBlur={handleBlur}
            row
          />
          <InputTextFieldSmall
            name="address"
            label="Address*"
            text={addressDescribe}
            placeholder={accountInfo.address}
            onChange={handleChange}
            value={values.address}
            error={
              touched.address && errors.address && errors.address.replace('address', 'Address')
            }
            onBlur={handleBlur}
            row
          />
          <InputTextFieldSmall
            name="city"
            label="City*"
            placeholder={accountInfo.city}
            onChange={handleChange}
            value={values.city}
            error={touched.city && errors.city && errors.city.replace('city', 'City')}
            onBlur={handleBlur}
            row
          />
          <InputTextFieldSmall
            name="zipCode"
            label="Zip Code*"
            placeholder={accountInfo.zipCode}
            onChange={handleChange}
            value={values.zipCode}
            error={
              touched.zipCode && errors.zipCode && errors.zipCode.replace('zipCode', 'Zip Code')
            }
            onBlur={handleBlur}
            row
          />
          <InputTextFieldSmall
            name="state"
            label="State*"
            placeholder={accountInfo.state}
            onChange={handleChange}
            value={values.state}
            error={touched.state && errors.state && errors.state.replace('state', 'State')}
            onBlur={handleBlur}
            row
          />
          <InputTextFieldSmall
            name="phone"
            label="Cell Phone*"
            onChange={handleChange}
            value={values.phone}
            error={touched.phone && errors.phone && errors.phone.replace('phone', 'Cell Phone')}
            onBlur={handleBlur}
            row
          />
          <div className="select_field">
            <label className="select_field__label">Email*</label>
            <div className="select_field__input">{user.email}</div>
          </div>
          <Checkbox
            name="acceptStripeTos"
            label="Accept Stripe's Terms of Service*"
            text={stripeTosDescribe}
            onChange={handleChange}
            value={values.acceptStripeTos}
            error={
              touched.acceptStripeTos &&
              errors.acceptStripeTos &&
              errors.acceptStripeTos.replace('acceptStripeTos', "Accept Stripe's Terms of Service")
            }
            className="account_checkbox_stripe"
          />

          <div className="acc_individual_form__buttons">
            {isSubmitting ? <Preloader style={{ width: '30%' }} /> : null}
            <SmallButton
              disabled={
                isSubmitting ||
                Object.keys(errors).length > 0 ||
                !VALIDATION_SCHEMA.isValidSync(values)
              }
              type="submit"
              label="Save"
              size="100x25"
              onSubmit={handleSubmit}
              onClick={() => {
                validateForm().then(formErrors => {
                  if (Object.keys(formErrors).length) {
                    Notify.info({ text: FILL_IN_ALL_REQUIRED_FIELDS });
                  }
                  console.error(formErrors);
                });
              }}
            />
          </div>
        </form>
      )}
    </Formik>
  );
};

const mapStateToProps = state => ({
  user: state.userStore.user
});

export default connect(mapStateToProps)(AccountIndividualForm);

const Checkbox = ({ label, text, name, onChange, checked, className, disabled, id, value }) => (
  <label className={classnames('big_checkbox_stripe__container', className)} htmlFor={id || name}>
    <div className="big_checkbox_stripe__text_container">
      <div className="big_checkbox_stripe__label">{label}</div>
      <div className="big_checkbox_stripe__text">{text}</div>
    </div>
    <input
      id={id || name}
      name={name}
      type="checkbox"
      value={value}
      onChange={onChange}
      checked={checked}
      disabled={disabled}
      className="big_checkbox_stripe__input"
    />
    <span
      className={classnames(
        'big_checkbox_stripe__checkmark',
        disabled && 'big_checkbox_stripe__checkmark_disable'
      )}
    />
  </label>
);
