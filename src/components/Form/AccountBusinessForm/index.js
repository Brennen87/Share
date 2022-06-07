import * as React from 'react';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import * as classnames from 'classnames';
import InputTextFieldSmall from '../../UI/InputTextFieldSmall';
import TextareaField from '../../UI/TextareaField';
import SmallButton from '../../UI/SmallButton';
import SelectField from '../../UI/SelectField';
import { singleValueSelect } from '../../../common/selectFieldStyles/singleValueSelect';
import {
  ONLY_NUMBER_REGEX,
  US_DATE_FORMAT_REGEX,
  WEBSITE_REGEX,
  BUSINESS_TYPES,
  FILL_IN_ALL_REQUIRED_FIELDS,
  ATTACHMENTS_LIMIT_TEXT,
  TEN_MB_AS_BYTES,
  ALLOWED_FORMATS
} from '../../../common/constants';
import Notify from '../../Notification';
import './index.scss';
import {
  doNothing, 
  generateNameFromAPIName,
} from '../../../helpers';
import { AttachmentPicker } from '../../AttachmentPicker';
import { Attachment } from '../../UI/Attachment';
import Preloader from '../../Preloader';

const COUNTRY_CONFIGS = {
  isSearchable: true,
  isClearable: true
};

const addressDescribe = '(PO Boxes are not allowed)';
const stripeTosDescribe =
  "(Every time you make edits, you will need to re-accept Stripe's Terms of Service)";

const AccountBusinessForm = ({ onSubmit, accountInfo, exist, countries, uploadFile, user }) => {
  const [isUploadingRepresentativeFrontDoc, setIsUploadingRepresentativeFrontDoc] = React.useState(
    false
  );
  const [isUploadingRepresentativeBackDoc, setIsUploadingRepresentativeBackDoc] = React.useState(
    false
  );
  const [isUploadingBankDoc, setIsUploadingBankDoc] = React.useState(false);

  const ruleMin9Digits = Yup.string()
    .matches(ONLY_NUMBER_REGEX, 'Must be only digits')
    .min(9, 'Must be exactly 9 digits')
    .required();

  const VALIDATION_SCHEMA = Yup.object().shape({
    representativeCountry: Yup.string().required(),
    type: Yup.string().required(),
    companyName: Yup.string().required(),
    description: Yup.string().required(),
    ...(!exist ? { companyTax: Yup.string().required() } : {}),
    website: Yup.string().matches(WEBSITE_REGEX, 'Must be valid URL'),
    ...(!exist ? { accNumber: ruleMin9Digits } : {}),
    ...(!exist ? { routeNumber: ruleMin9Digits } : {}),

    ...(!exist
      ? {
          representativeSSN: Yup.string()
            .matches(ONLY_NUMBER_REGEX, 'Must be only digits')
            .min(9, 'Must be exactly 9 digits')
            .max(9, 'Must be exactly 9 digits')
            .required(),
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

    companyCountry: Yup.string().required(),
    companyState: Yup.string().required(),
    companyCity: Yup.string().required(),
    companyAddress: Yup.string().required(),
    companyZipCode: Yup.string().required(),
    companyPhone: Yup.string().required(),

    representativeState: Yup.string().required(),
    representativeCity: Yup.string().required(),
    representativeAddress: Yup.string().required(),
    representativeZipCode: Yup.string().required(),
    representativeFirstName: Yup.string().required(),
    representativeLastName: Yup.string().required(),
    representativeDateOfBirth: Yup.string()
      .matches(US_DATE_FORMAT_REGEX, 'Must be in format MM/DD/YYYY')
      .required(),
    representativeEmail: Yup.string().required(),
    representativePhone: Yup.string().required(),

    ...(!exist ? { representativeDocumentFront: Yup.string().required() } : {}),
    ...(!exist ? { representativeDocumentBack: Yup.string().required() } : {}),
    ...(!exist ? { bankAccountDocument: Yup.string().required() } : {}),

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
        type: BUSINESS_TYPES.find(elem => elem.value === accountInfo.type.value)
          ? accountInfo.type
          : '',
        representativeSSN: '',
        accNumber: '',
        routeNumber: '',
        // TODO: TEMPORARY HARD CODED VALUE. DELETE AFTER EXPANDING BUSINESS TYPES:
        representativeCountry: {
          label: 'United States of America',
          value: 'United States of America'
        },
        companyCountry: {
          label: 'United States of America',
          value: 'United States of America'
        }
      }}
    >
      {({
        values,
        errors,
        touched,
        handleSubmit,
        handleChange,
        handleBlur,
        isSubmitting,
        setFieldValue,
        validateForm
      }) => (
        <form className="acc_business_form" onSubmit={handleSubmit}>
          <SelectField
            label="Type*"
            value={values.type}
            options={BUSINESS_TYPES}
            onChange={selection => setFieldValue('type', selection)}
            styles={singleValueSelect}
            isDisabled={exist}
            placeholder=""
            error={errors?.type && errors.type.replace('type', 'Business Type')}
            onBlur={handleBlur}
          />
          <InputTextFieldSmall
            name="companyName"
            label="Company Name*"
            onChange={handleChange}
            value={values.companyName}
            error={
              touched.companyName &&
              errors.companyName &&
              errors.companyName.replace('companyName', 'Company Name')
            }
            onBlur={handleBlur}
            row
          />
          <TextareaField
            name="description"
            label="Product Description*"
            onChange={handleChange}
            value={values.description}
            error={
              touched.description &&
              errors.description &&
              errors.description.replace('description', 'Product Description')
            }
            onBlur={handleBlur}
          />
          <InputTextFieldSmall
            name="companyAddress"
            label="Company Address*"
            text={addressDescribe}
            onChange={handleChange}
            value={values.companyAddress}
            error={
              touched.companyAddress &&
              errors.companyAddress &&
              errors.companyAddress.replace('companyAddress', 'Company Address')
            }
            onBlur={handleBlur}
            row
          />
          <InputTextFieldSmall
            name="companyCity"
            label="Company City*"
            onChange={handleChange}
            value={values.companyCity}
            error={
              touched.companyCity &&
              errors.companyCity &&
              errors.companyCity.replace('companyCity', 'Company City')
            }
            onBlur={handleBlur}
            row
          />
          <InputTextFieldSmall
            name="companyZipCode"
            label="Company Zip Code*"
            onChange={handleChange}
            value={values.companyZipCode}
            error={
              touched.companyZipCode &&
              errors.companyZipCode &&
              errors.companyZipCode.replace('companyZipCode', 'Company Zip Code')
            }
            onBlur={handleBlur}
            row
          />
          <InputTextFieldSmall
            name="companyState"
            label="Company State*"
            onChange={handleChange}
            value={values.companyState}
            error={
              touched.companyState &&
              errors.companyState &&
              errors.companyState.replace('companyState', 'Company State')
            }
            onBlur={handleBlur}
            row
          />
          <SelectField
            label="Company Country*"
            styles={singleValueSelect}
            isLoading={countries.loading}
            isClearable={COUNTRY_CONFIGS.isClearable}
            isSearchable={COUNTRY_CONFIGS.isSearchable}
            onChange={companyCountry => setFieldValue('companyCountry', companyCountry)}
            name="companyCountry"
            value={{ value: 'United States of America', label: 'United States of America' }} // TODO: TEMPORARY HARD CODED VALUE. OLD VALUE: {values.companyCountry}
            placeholder=""
            options={resortedCountries()}
            filterOption={(option, input) =>
              option.value.toLowerCase().startsWith(input.toLowerCase())
            }
            isDisabled={true} // TODO: TEMPORARY DISABLE. OLD VALUE: {exist}
            error={
              errors?.companyCountry &&
              errors.companyCountry.replace('companyCountry', 'Company Country')
            }
            onBlur={handleBlur}
          />
          <InputTextFieldSmall
            name="website"
            label="Company Website"
            onChange={handleChange}
            value={values.website || ''}
            error={
              touched.website && errors.website && errors.website.replace('website', 'Website')
            }
            onBlur={handleBlur}
            row
          />
          <InputTextFieldSmall
            name="accNumber"
            label="Company Account Number*"
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
            label="Company Bank Routing Number*"
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
            name="companyTax"
            label="Company Tax ID*"
            placeholder={accountInfo.type ? '*********' : ''}
            onChange={accountInfo.type ? doNothing : handleChange}
            value={values.companyTax}
            error={
              touched.companyTax &&
              errors.companyTax &&
              errors.companyTax.replace('companyTax', 'Company Tax ID')
            }
            onBlur={accountInfo.type ? doNothing : handleBlur}
            row
          />
          <InputTextFieldSmall
            name="companyPhone"
            label="Company Phone*"
            placeholder={accountInfo.phone}
            onChange={handleChange}
            value={values.companyPhone}
            error={touched.phone && errors.phone && errors.phone.replace('phone', 'Company Phone')}
            onBlur={handleBlur}
            row
          />
          <div className="select_field">
            <label className="select_field__label">Company Email*</label>
            <div className="select_field__input">{user.email}</div>
          </div>

          <div className="acc_business_form__separator_line" />
          <h4 className="acc_business_form__subtitle">REPRESENTATIVE</h4>

          <InputTextFieldSmall
            name="representativeFirstName"
            label="First Name*"
            placeholder={accountInfo.representativeFirstName}
            onChange={handleChange}
            value={values.representativeFirstName}
            error={
              touched.representativeFirstName &&
              errors.representativeFirstName &&
              errors.representativeFirstName.replace(
                'representativeFirstName',
                'Representative First Name'
              )
            }
            onBlur={handleBlur}
            row
          />
          <InputTextFieldSmall
            name="representativeLastName"
            label="Last Name*"
            placeholder={accountInfo.representativeLastName}
            onChange={handleChange}
            value={values.representativeLastName}
            error={
              touched.representativeLastName &&
              errors.representativeLastName &&
              errors.representativeLastName.replace(
                'representativeLastName',
                'Representative Last Name'
              )
            }
            onBlur={handleBlur}
            row
          />
          <InputTextFieldSmall
            name="representativeDateOfBirth"
            label="Date of Birth*"
            placeholder={accountInfo.representativeDateOfBirth}
            onChange={handleChange}
            value={values.representativeDateOfBirth}
            error={
              touched.representativeDateOfBirth &&
              errors.representativeDateOfBirth &&
              errors.representativeDateOfBirth.replace(
                'representativeDateOfBirth',
                'Representative Date of Birth'
              )
            }
            onBlur={handleBlur}
            row
          />
          <InputTextFieldSmall
            name="representativeSSN"
            label="SSN*"
            placeholder={accountInfo.type ? (values.representativeSSNLast4Digits || "*********") : ''}
            onChange={handleChange}
            value={values.representativeSSN}
            error={
              touched.representativeSSN &&
              errors.representativeSSN &&
              errors.representativeSSN.replace('representativeSSN', 'Representative SSN')
            }
            onBlur={handleBlur}
            row
          />
          <InputTextFieldSmall
            name="representativeAddress"
            label="Address*"
            text={addressDescribe}
            placeholder={accountInfo.representativeAddress}
            onChange={handleChange}
            value={values.representativeAddress}
            error={
              touched.representativeAddress &&
              errors.representativeAddress &&
              errors.representativeAddress.replace(
                'representativeAddress',
                'Representative Address'
              )
            }
            onBlur={handleBlur}
            row
          />
          <InputTextFieldSmall
            name="representativeCity"
            label="City*"
            placeholder={accountInfo.representativeCity}
            onChange={handleChange}
            value={values.representativeCity}
            error={
              touched.representativeCity &&
              errors.representativeCity &&
              errors.representativeCity.replace('representativeCity', 'Representative City')
            }
            onBlur={handleBlur}
            row
          />
          <InputTextFieldSmall
            name="representativeZipCode"
            label="Zip Code*"
            placeholder={accountInfo.representativeZipCode}
            onChange={handleChange}
            value={values.representativeZipCode}
            error={
              touched.representativeZipCode &&
              errors.representativeZipCode &&
              errors.representativeZipCode.replace(
                'representativeZipCode',
                'Representative Zip Code'
              )
            }
            onBlur={handleBlur}
            row
          />
          <InputTextFieldSmall
            name="representativeState"
            label="State*"
            placeholder={accountInfo.representativeState}
            onChange={handleChange}
            value={values.representativeState}
            error={
              touched.representativeState &&
              errors.representativeState &&
              errors.representativeState.replace('representativeState', 'Representative State')
            }
            onBlur={handleBlur}
            row
          />
          <SelectField
            label="Country*"
            styles={singleValueSelect}
            isLoading={countries.loading}
            isClearable={COUNTRY_CONFIGS.isClearable}
            isSearchable={COUNTRY_CONFIGS.isSearchable}
            onChange={representativeCountry =>
              setFieldValue('representativeCountry', representativeCountry)
            }
            name="representativeCountry"
            value={{ value: 'United States of America', label: 'United States of America' }} // TODO: TEMPORARY HARD CODED VALUE. OLD VALUE: {values.representativeCountry}
            placeholder=""
            options={resortedCountries()}
            filterOption={(option, input) =>
              option.value.toLowerCase().startsWith(input.toLowerCase())
            }
            isDisabled={true} // TODO: TEMPORARY DISABLE. OLD VALUE: {exist}
            error={
              errors?.representativeCountry &&
              errors.representativeCountry.replace(
                'representativeCountry',
                'Representative Country'
              )
            }
            onBlur={handleBlur}
          />
          <InputTextFieldSmall
            name="representativePhone"
            label="Cell Phone*"
            placeholder={accountInfo.representativePhone}
            onChange={handleChange}
            value={values.representativePhone}
            error={
              touched.representativePhone &&
              errors.representativePhone &&
              errors.representativePhone.replace('representativePhone', 'Representative Phone')
            }
            onBlur={handleBlur}
            row
          />
          <InputTextFieldSmall
            name="representativeEmail"
            label="Email*"
            placeholder={accountInfo.representativeEmail}
            onChange={handleChange}
            value={values.representativeEmail}
            error={
              touched.representativeEmail &&
              errors.representativeEmail &&
              errors.representativeEmail.replace('representativeEmail', 'Representative Email')
            }
            onBlur={handleBlur}
            row
          />
          {/* <InputTextFieldSmall
            name="representativeRelationship"
            label="Relationship*"
            placeholder={accountInfo.representativeRelationship}
            onChange={handleChange}
            value={values.representativeRelationship}
            error={
              touched.representativeRelationship &&
              errors.representativeRelationship &&
              errors.representativeRelationship.replace('representativeRelationship', 'Representative Relationship')
            }
            onBlur={handleBlur}
            row
          /> */}

          {/* <div className="acc_business_form__separator_line"></div>
          <h4 className="acc_business_form__subtitle">
          OWNER
          </h4>

          <InputTextFieldSmall
            name="ownerFirstName"
            label="First Name*"
            placeholder={accountInfo.ownerFirstName}
            onChange={handleChange}
            value={values.ownerFirstName}
            error={
              touched.ownerFirstName &&
              errors.ownerFirstName &&
              errors.ownerFirstName.replace('ownerFirstName', 'Owner First Name')
            }
            onBlur={handleBlur}
            row
          />
          <InputTextFieldSmall
            name="ownerLastName"
            label="Last Name*"
            placeholder={accountInfo.ownerLastName}
            onChange={handleChange}
            value={values.ownerLastName}
            error={
              touched.ownerLastName &&
              errors.ownerLastName &&
              errors.ownerLastName.replace('ownerLastName', 'Owner Last Name')
            }
            onBlur={handleBlur}
            row
          />
          <InputTextFieldSmall
            name="ownerEmail"
            label="Email*"
            placeholder={accountInfo.ownerEmail}
            onChange={handleChange}
            value={values.ownerEmail}
            error={
              touched.ownerEmail &&
              errors.ownerEmail &&
              errors.ownerEmail.replace('ownerEmail', 'Owner Email')
            }
            onBlur={handleBlur}
            row
          />
          <InputTextFieldSmall
            name="ownerRelationship"
            label="Relationship*"
            placeholder={accountInfo.ownerRelationship}
            onChange={handleChange}
            value={values.ownerRelationship}
            error={
              touched.ownerRelationship &&
              errors.ownerRelationship &&
              errors.ownerRelationship.replace('ownerRelationship', 'Owner Relationship')
            }
            onBlur={handleBlur}
            row
          />

          <div className="acc_business_form__separator_line"></div> */}

          <div className="acc_business_form__image">
            <div className="acc_business_form__image_header">
              <div className="acc_business_form__image_title">Identity Document Front*</div>
              <div className="acc_business_form__image_title_tooltip">
                To verify the Representative.
                <br />
                {ATTACHMENTS_LIMIT_TEXT}
              </div>
            </div>
            <AttachmentPicker
              attachmentId="attachment-front"
              buttonText={'Upload File'}
              accept="image/png, image/jpeg, application/pdf"
              onChange={event => {
                const { type, size } = event.target.files[0];
                if (size > TEN_MB_AS_BYTES) {
                  event.preventDefault();
                  event.nativeEvent.preventDefault();
                  Notify.info({ text: ATTACHMENTS_LIMIT_TEXT });
                  return;
                }
                if (ALLOWED_FORMATS.includes(type)) {
                  setIsUploadingRepresentativeFrontDoc(true);
                  const file = new FormData();
                  file.append('file', event.target.files[0]);

                  uploadFile(file)
                    .then(res => {
                      if (res?.id) {
                        setFieldValue('representativeDocumentFront', res);
                      }
                      document.querySelector('#attachment-front').value = null;
                    })
                    .catch(error => {
                      console.error(error);
                    })
                    .finally(() => {
                      setIsUploadingRepresentativeFrontDoc(false);
                    });
                }
              }}
              disabled={values.representativeDocumentFront || isUploadingRepresentativeFrontDoc}
            />
            {isUploadingRepresentativeFrontDoc ? <Preloader style={{ width: '30%' }} /> : null}
            {values.representativeDocumentFront && (
              <Attachment
                title={generateNameFromAPIName(values.representativeDocumentFront.name)}
                onRemove={() => {
                  setFieldValue('representativeDocumentFront', null);
                }}
              />
            )}
          </div>

          <div className="acc_business_form__image">
            <div className="acc_business_form__image_header">
              <div className="acc_business_form__image_title">Identity Document Back*</div>
              <div className="acc_business_form__image_title_tooltip">
                To verify the Representative.
                <br />
                {ATTACHMENTS_LIMIT_TEXT}
              </div>
            </div>
            <AttachmentPicker
              attachmentId="attachment-back"
              buttonText={'Upload File'}
              accept="image/png, image/jpeg, application/pdf"
              onChange={event => {
                const { type, size } = event.target.files[0];
                if (size > TEN_MB_AS_BYTES) {
                  event.preventDefault();
                  event.nativeEvent.preventDefault();
                  Notify.info({ text: ATTACHMENTS_LIMIT_TEXT });
                  return;
                }
                if (ALLOWED_FORMATS.includes(type)) {
                  setIsUploadingRepresentativeBackDoc(true);
                  const file = new FormData();
                  file.append('file', event.target.files[0]);

                  uploadFile(file)
                    .then(res => {
                      if (res?.id) {
                        setFieldValue('representativeDocumentBack', res);
                      }
                      document.querySelector('#attachment-back').value = null;
                    })
                    .catch(error => {
                      console.error(error);
                    })
                    .finally(() => {
                      setIsUploadingRepresentativeBackDoc(false);
                    });
                }
              }}
              disabled={values.representativeDocumentBack || isUploadingRepresentativeBackDoc}
            />
            {isUploadingRepresentativeBackDoc ? <Preloader style={{ width: '30%' }} /> : null}
            {values.representativeDocumentBack && (
              <Attachment
                title={generateNameFromAPIName(values.representativeDocumentBack.name)}
                onRemove={() => {
                  setFieldValue('representativeDocumentBack', null);
                }}
              />
            )}
          </div>

          <div className="acc_business_form__image">
            <div className="acc_business_form__image_header">
              <div className="acc_business_form__image_title">Company Bank Account Statement*</div>
              <div className="acc_business_form__image_title_tooltip">{ATTACHMENTS_LIMIT_TEXT}</div>
            </div>
            <AttachmentPicker
              attachmentId="attachment-bank"
              buttonText={'Upload File'}
              accept="image/png, image/jpeg, application/pdf"
              onChange={event => {
                const { type, size } = event.target.files[0];
                if (size > TEN_MB_AS_BYTES) {
                  event.preventDefault();
                  event.nativeEvent.preventDefault();
                  Notify.info({ text: ATTACHMENTS_LIMIT_TEXT });
                  return;
                }
                if (ALLOWED_FORMATS.includes(type)) {
                  setIsUploadingBankDoc(true);
                  const file = new FormData();
                  file.append('file', event.target.files[0]);

                  uploadFile(file)
                    .then(res => {
                      if (res?.id) {
                        setFieldValue('bankAccountDocument', res);
                      }
                      document.querySelector('#attachment-bank').value = null;
                    })
                    .catch(error => {
                      console.error(error);
                    })
                    .finally(() => {
                      setIsUploadingBankDoc(false);
                    });
                }
              }}
              disabled={values.bankAccountDocument || isUploadingBankDoc}
            />
            {isUploadingBankDoc ? <Preloader style={{ width: '30%' }} /> : null}
            {values.bankAccountDocument && (
              <Attachment
                title={generateNameFromAPIName(values.bankAccountDocument.name)}
                onRemove={() => {
                  setFieldValue('bankAccountDocument', null);
                }}
              />
            )}
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

          <div className="acc_business_form__buttons">
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

export default connect(mapStateToProps)(AccountBusinessForm);

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
