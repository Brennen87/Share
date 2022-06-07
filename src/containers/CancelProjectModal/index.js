import * as React from 'react';
import SelectField from '../../components/UI/SelectField';
import TextareaField from '../../components/UI/TextareaField';
import { singleValueSelect } from '../../common/selectFieldStyles/singleValueSelect';
import SmallButton from '../../components/UI/SmallButton';
import TextareaAutosize from 'react-textarea-autosize';
import { Formik } from 'formik';
import {
  CANCEL_REASONS_CUSTOMER,
  CANCEL_REASONS_VENDOR,
  CANCEL_WARNING_FOR_CUSTOMER,
  CANCEL_WARNING_FOR_VENDOR,
  FILL_IN_ALL_REQUIRED_FIELDS
} from '../../common/constants';
import StarRating from 'react-svg-star-rating';
import { RATING_STARS_COUNT, RATING_STARS_SIZE } from '../../common/dicts';
import * as Yup from 'yup';
import Notify from '../../components/Notification';
import './index.scss';

const styles = {
  menuList: base => ({
    ...base,
    '&::-webkit-scrollbar': {
      width: '6px'
    },
    '&::-webkit-scrollbar-thumb': {
      background: '#e7e7e7',
      borderRadius: '10px'
    }
  })
};

const CancelProjectForm = ({ close, onSubmit, isCustomer, review, cancellation }) => {
  const VALIDATION_SCHEMA = Yup.object().shape({
    ...(!cancellation
      ? {
          reason: Yup.string().required(),
          more_details: Yup.string().required()
        }
      : {}),
    rate: Yup.number()
      .required()
      .min(1),
    comment: Yup.string().required()
  });

  return (
    <Formik
      onSubmit={values => onSubmit(values)}
      validationSchema={VALIDATION_SCHEMA}
      initialValues={{
        reason: '',
        wipeData: false,
        rate: 0,
        comment: '',
        more_details: ''
      }}
    >
      {({ values, setFieldValue, handleSubmit, handleChange, validateForm }) => (
        <form className="cancel_project_modal" onSubmit={handleSubmit}>
          <h3 className="cancel_project_modal__header">Cancel Project</h3>
          <div className="cancel_project_modal__content">
            {!cancellation ? (
              <>
                <div className="cancel_project_modal__subtitle">
                  Are you sure you want to cancel the project?
                </div>
                <div className="cancel_project_modal__description">
                  {isCustomer ? (
                    <>
                      We encourage you to do your best to resolve any issues directly with the
                      vendor before cancelling the project. Please note it might take up to 14 days
                      for our team to decide on a cancelled project and additional several days to
                      process a refund, if applicable. The decision will be made based on our
                      Cancellation, Refund and Payment Policy. We will use the communication on the
                      project under{' '}
                      <span className="cancel_project_modal__description_font_italic">
                        Inbox-Projects
                      </span>{' '}
                      to help us arrive at a fair decision.
                    </>
                  ) : (
                    <>
                      We encourage you to do your best to resolve the issue directly with the
                      customer before cancelling the project. Please note it might take up to 14
                      days for our team to come to a decision on a cancelled project and additional
                      several days to process a payment, if applicable. The decision will be made
                      based on our Cancellation, Refund and Payment Policy. We will use
                      communication on the project under{' '}
                      <span className="cancel_project_modal__description_font_italic">
                        Inbox-Projects
                      </span>{' '}
                      to help us arrive at a fair decision.
                    </>
                  )}
                </div>
                <div className="cancel_project_modal__subtitle">
                  Tell us why you are cancelling the project.
                </div>
                <div className="cancel_project_modal__reason_container">
                  <TextareaAutosize
                    name="reason"
                    value={values.reason}
                    placeholder="I am cancelling because"
                    onChange={handleChange}
                    className="cancel_project_modal__reason_input"
                    maxRows={8}
                  />
                </div>
                <TextareaField
                  label={`Please share more details with your ${
                    isCustomer ? 'vendor' : 'customer'
                  }.`}
                  className="cancel_project_modal__details"
                  placeholder="Write your message..."
                  name="more_details"
                  onChange={handleChange}
                  column
                  style={{ backgroundColor: !values.more_details ? '#fbfbfb' : '#ffffff' }}
                />
              </>
            ) : (
              <>
                <div className="cancel_project_modal__subtitle">
                  Your acknowledgement of cancellation
                </div>
                <div className="cancel_project_modal__description">
                  {isCustomer ? CANCEL_WARNING_FOR_CUSTOMER : CANCEL_WARNING_FOR_VENDOR}
                </div>
                <hr style={{ border: 0, borderTop: '1px solid #b6b6b6', paddingBottom: '1em' }} />
                <div className="cancel_project_modal__subtitle">Reason for cancellation</div>
                <div className="cancel_project_modal__description">{cancellation.reason} </div>
                <div className="cancel_project_modal__subtitle">
                  Message from {isCustomer ? 'Vendor' : 'Customer'}
                </div>
                <div className="cancel_project_modal__description">
                  {cancellation.more_details}{' '}
                </div>
              </>
            )}

            <div className="cancel_project_modal__subtitle">Rate and Review</div>
            <div className="cancel_project_modal__description">
              {isCustomer ? 'Vendor' : 'Customer'} will not see the rate and review that you leave
              until the project is closed from both ends and marked as completed by Kuprik system.
            </div>

            {/* <Checkbox */}
            {/*  checked={values.wipeData} */}
            {/*  onChange={() => setFieldValue('wipeData', !values.wipeData)} */}
            {/*  label="Yes, remove my data from Kuprik's servers" */}
            {/* /> */}

            {!review && (
              <div className="cancel_project_modal__rate">
                <div className="cancel_project_modal__rating">
                  <div className="cancel_project_modal__rate_title">
                    {isCustomer ? 'Rate Vendor' : 'Rate Customer'}
                  </div>
                  <StarRating
                    handleOnClick={rate => setFieldValue('rate', rate)}
                    initialRating={values.rate}
                    size={RATING_STARS_SIZE}
                    count={RATING_STARS_COUNT}
                    activeColor="#FF8C00"
                    isHalfRating
                  />
                </div>
                <TextareaField
                  label={isCustomer ? 'Review Vendor' : 'Review Customer'}
                  className="cancel_project_modal__review"
                  placeholder="Write your message..."
                  name="comment"
                  onChange={handleChange}
                  style={{ backgroundColor: !values.comment ? '#fbfbfb' : '#ffffff' }}
                />
              </div>
            )}

            <div className="cancel_project_modal__buttons">
              <SmallButton label="Back" onClick={() => close(false)} />
              <SmallButton
                label="Cancel Project"
                onSubmit={handleSubmit}
                onClick={() => {
                  validateForm().then(formErrors => {
                    if (Object.keys(formErrors).length) {
                      Notify.info({ text: FILL_IN_ALL_REQUIRED_FIELDS });
                    } else if (cancellation) {
                      setFieldValue('more_details', 'Cancellation acknowledged');
                    }
                  });
                }}
                type="submit"
              />
            </div>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default CancelProjectForm;
