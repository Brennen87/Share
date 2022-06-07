import * as React from 'react';
import { useEffect } from 'react';
import { ATTACHMENTS_LIMIT_TEXTv2, ATTACHMENTS_LIMIT_TEXTv3, VENDOR_STATUSES } from '../../../../common/constants';
import InputTextFieldSmall from '../../../../components/UI/InputTextFieldSmall';
import { Attachment } from '../../../../components/UI/Attachment';
import { fetchCategories } from '../../../../store/actions/commonActions';
import { fetchProfile, sendVerificationDocuments } from '../../../../store/actions/profileActions';
import { uploadFile } from '../../../../store/actions/fileActions';
import { connect } from 'react-redux';
import { Formik, Field } from 'formik';
import * as classnames from 'classnames';
import '../index.scss';

const ProfileVerificationCredentials = ({ vendor, categoriesList, sendVerificationDocuments, fetchProfile, fetchCategories }) => {
  const isInsufficientCredentialsError =
    vendor &&
    vendor.data &&
    vendor.data.verification_status === VENDOR_STATUSES.INSUFFICIENT_CREDENTIALS;
  const documentsSentSuccessfully = vendor && vendor.verificationDocumentsSentSuccessfully;
  const status = isInsufficientCredentialsError ? 'INSUFFICIENT CREDENTIALS' : null;

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (documentsSentSuccessfully) {
      fetchProfile();
    }
  }, [documentsSentSuccessfully]);

  const uploadedFileInfo = async file => {
    const formData = new FormData();
    formData.append('file', file);
    try {
      return await uploadFile(formData)();
    } catch (error) {
      throw new Error(error);
    }
  };

  let errors = [];
  if (vendor.error) {
    try {
      errors = JSON.parse(vendor.error);
      errors = Object.keys(errors).map(key =>
        Array.isArray(errors[key]) ? errors[key].shift() : errors[key]
      );
    } catch (e) {}
  }

  const onSubmit = async values => {
    values.services = values.services.map(stringId => Number(stringId));

    const uploadedResumeFileInfo = values.resume_file
      ? await uploadedFileInfo(values.resume_file)
      : null;
    const uploadedWorkFileInfo = values.work_sample_file
      ? await uploadedFileInfo(values.work_sample_file)
      : null;

    const bodyToSend = {
      ...values,
      resume_file: uploadedResumeFileInfo?.id,
      work_sample_file: uploadedWorkFileInfo?.id
    };

    try {
      await sendVerificationDocuments(bodyToSend);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Formik
      initialValues={{
        services: [],
        resume_file: null,
        resume_link: '',
        work_sample_file: null,
        work_sample_link: ''
      }}
      onSubmit={onSubmit}
    >
      {({ values, setFieldValue, handleSubmit }) => (
        <form className="profile_verification" onSubmit={handleSubmit}>
          <div className="profile_verification__top">
            <span className="profile_verification__title">Verification of Credentials</span>
            {status && (
              <span
                className={`profile_verification__status ${
                  isInsufficientCredentialsError ? 'error' : ''
                }`}
              >
                {status}
              </span>
            )}
          </div>
          <div className="profile_verification__content">
            <p className="profile_verification__description">
              {
                isInsufficientCredentialsError
                ? "Thank you for submitting your documents for verification. Unfortunately, at this time, we are unable to offer you access to the Kuprik platform. We always encourage you to improve on your skills and welcome you to resubmit your application when you are ready."
                : "To get verified, please submit all the required documents below. We verify your identity and assess your skill level. If applicable, we may send a sample to you to evaluate your work. We assess hard and soft skills before onboarding vendors. We may schedule an interview if needed."
              }
            
            </p>
            <div className="profile_verification__checkboxes">
              <h4 className="profile_verification__checkboxes_title">
                WHAT SERVICES WILL YOU PROVIDE? *
              </h4>
              <div className="profile_verification__checkboxes_main">

                {categoriesList?.data?.list?.map(category => {
                  return (
                    <div key={category.id} className="profile_verification__checkboxes_main_cell">
                      <label 
                        className={classnames('big_checkbox__container', 'profile_checkbox')}
                      >
                        <Field
                          name="services"
                          type="checkbox"
                          value={String(category.id)}
                          className="big_checkbox__input"
                        />
                        <span
                          className='big_checkbox__checkmark'
                        />
                        {category.name}
                      </label>
                    </div>
                  )
                })}

              </div>
            </div>
            <div className="profile_verification__blocks">
              <Input
                name="resume"
                title="RESUME*"
                description={ATTACHMENTS_LIMIT_TEXTv2}
                setFieldValue={setFieldValue}
                fileValue={values.resume_file}
                linkValue={values.resume_link}
              />
              <Input
                name="work_sample"
                title="WORK SAMPLE*"
                description={ATTACHMENTS_LIMIT_TEXTv3}
                setFieldValue={setFieldValue}
                fileValue={values.work_sample_file}
                linkValue={values.work_sample_link}
              />
            </div>
          </div>
          <div className="profile_verification__submit">
            <button onSubmit={handleSubmit}
                    type="submit"
                    className="profile_verification__btn"
                    disabled={
                      !values.services.length || 
                      (!values.resume_file && !values.resume_link) || 
                      (!values.work_sample_file && !values.work_sample_link)}
                    >
              Submit for Verification
            </button>
          </div>
        </form>
      )}
    </Formik>
  );
};

const mapStateToProps = state => ({
  vendor: state.profileStore.vendor,
  categoriesList: state.commonStore.categoriesList,
});

const mapDispatchToProps = dispatch => ({
  sendVerificationDocuments: data => dispatch(sendVerificationDocuments(data)),
  fetchProfile: data => dispatch(fetchProfile(data)),
  uploadFile: file => dispatch(uploadFile(file)),
  fetchCategories: () => dispatch(fetchCategories()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileVerificationCredentials);

const Input = ({ name, title, description, fileValue, linkValue, setFieldValue }) => (
  <div className="profile_verification__block">
    <div className="profile_verification__block_item">
      <h3 className="profile_verification__block_title">{title}</h3>
      <div className="profile_verification__block_subtitle">Provide a File</div>
      <p className="profile_verification__block_desc">{description}</p>
    </div>
    <div className="profile_verification__block_item">
      {fileValue ? (
        <Attachment title={fileValue.name} onRemove={() => setFieldValue(`${name}_file`, null)} />
      ) : (
        <>
          <label className="profile_verification__label" htmlFor={`${name}_file`}>
            Upload
          </label>
          <input
            className="profile_verification__file"
            type="file"
            name={`${name}_file`}
            id={`${name}_file`}
            onChange={e => {
              setFieldValue(`${name}_file`, e.target.files[0]);
            }}
          />
        </>
      )}
    </div>
    <div className="profile_verification__block_item">
      <span className="profile_verification__block_text">And/or</span>
      <InputTextFieldSmall
        label="Provide a Link"
        type="text"
        name={`${name}_link`}
        onChange={e => setFieldValue(`${name}_link`, e.target.value)}
      />
    </div>
  </div>
);
