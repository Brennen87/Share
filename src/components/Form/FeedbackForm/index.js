import * as React from 'react';
import InputTextField from '../../UI/InputTextField';
import TextareaField from '../../UI/TextareaField';
import Select from 'react-select';
import Button from '../../UI/Button';
import { Formik } from 'formik';
import { singleValueSelect } from '../../../common/selectFieldStyles/singleValueSelect';
import ERROR_MESSAGES from '../../../common/messages';
import * as Yup from 'yup';
import './index.scss';
import Notify from '../../Notification';
import { FILL_IN_ALL_REQUIRED_FIELDS } from '../../../common/constants';
import iconTrash from '../../../assets/icons/icon_deleteDarkBlue.svg';
import { Attachment } from '../../UI/Attachment';


const VALIDATION_SCHEMA = Yup.object().shape({
  firstname: Yup.string().required(),
  lastname: Yup.string().required(),
  email: Yup.string()
    .required(ERROR_MESSAGES.EMAIL__EMPTY)
    .email(ERROR_MESSAGES.EMAIL_FORMAT),
  category: Yup.object().required(),
  subject: Yup.string().required(),
  message: Yup.string().required()
});

const CATEGORY = [
  { value: 0, label: 'Feedback' },
  { value: 1, label: 'Support' }
];

class FeedbackForm extends React.Component {
  initialValues = {
    firstname: '',
    lastname: '',
    email: '',
    category: null,
    subject: '',
    attachment: null,
    message: ''
  };

  render() {
    return (
      <Formik
        validationSchema={VALIDATION_SCHEMA}
        initialValues={this.initialValues}
        onSubmit={(values, formikBag) => this.props.onSubmit(values, formikBag)}
      >
        {({ values, setFieldValue, handleChange, handleSubmit, handleReset, validateForm }) => (
          <form className="feedback_form" onSubmit={handleSubmit}>
            <h3 className="feedback_form__title">Feedback and Support</h3>
            <div className="feedback_form__row">
              <InputTextField
                label="First Name"
                name="firstname"
                value={values.firstname}
                onChange={handleChange}
                placeholder=""
              />
              <InputTextField
                label="Last Name"
                name="lastname"
                value={values.lastname}
                onChange={handleChange}
                placeholder=""
              />
            </div>
            <div className="feedback_form__col">
              <InputTextField
                label="Email Address"
                name="email"
                value={values.email}
                onChange={handleChange}
                placeholder=""
              />
            </div>

            <div className="feedback_form__category">
              <label className="input_text_field__label">Category</label>
              <Select
                className="feedback_form__category_select"
                styles={singleValueSelect}
                options={CATEGORY}
                onChange={value => setFieldValue('category', value)}
              />
            </div>
            <InputTextField
              className="feedback_form__subject"
              label="Subject"
              name="subject"
              value={values.subject}
              onChange={handleChange}
              placeholder=""
            />
            <div className="feedback_form__attachment">
              {values.attachment && (

                <Attachment
                  key={values.attachment.id}
                  title={values.attachment.name}
                  onRemove={() =>
                    setFieldValue('attachment', null)
                  }
                />
              )}

              {/* <div className="filename">
                {values.attachment.name}
                <span className="delete">
                  &nbsp;&nbsp;
                  <button
                    className="feedback_form__attachment-delete-button"
                    onClick={() => {
                      setFieldValue('attachment', null);
                    }}
                  >
                    <img alt="Delete attachment" src={iconTrash} height="15px" />
                  </button>
                </span>
              </div> */}
            </div>
            <div className="feedback_form__files">
              <label htmlFor="attachment" className="input_text_field__label">
                {"Upload\xa0"}<span className="input_text_field__label_lowercase">a</span>{"\xa0File"}
              </label>
              <input
                type="file"
                name="attachment"
                id="attachment"
                onChange={e => {
                  setFieldValue('attachment', e.target.files[0]);
                }}
              />
            </div>
            <TextareaField
              className="feedback_form__message"
              name="message"
              onChange={handleChange}
              value={values.message}
              placeholder=""
              label={<>Message</>}
            />
            <div className="feedback_form__buttons">
              <Button
                label="Clear"
                onClick={handleReset}
                disabled={
                  !(
                    values.firstname ||
                    values.lastname ||
                    values.email ||
                    values.category ||
                    values.subject ||
                    values.attachment ||
                    values.message
                  )
                }
              />
              <Button
                label="Submit"
                type="submit"
                onSubmit={handleSubmit}
                onClick={() => {
                  validateForm().then(formErrors => {
                    if (Object.keys(formErrors).length) {
                      Notify.info({ text: FILL_IN_ALL_REQUIRED_FIELDS });
                    }
                  });
                }}
                disabled={
                  !(
                    values.firstname &&
                    values.lastname &&
                    values.email &&
                    values.category &&
                    values.subject &&
                    values.message
                  )
                }
              />
            </div>
          </form>
        )}
      </Formik>
    );
  }
}

export default FeedbackForm;
