import * as React from 'react';
import InputTextField from '../../UI/InputTextField/index';
import { Formik } from 'formik';
import * as Yup from 'yup';
import ERROR_MESSAGES from '../../../common/messages';
import Button from '../../UI/Button/index';
import './index.scss';

const VALIDATION_SCHEMA = Yup.object().shape({
  email: Yup.string()
    .required(ERROR_MESSAGES.EMAIL__EMPTY)
    .email(ERROR_MESSAGES.EMAIL_FORMAT)
});

class ForgotPasswordForm extends React.Component {
  initialValues = {
    email: ''
  };

  render() {
    return (
      <Formik
        initialValues={this.initialValues}
        validationSchema={VALIDATION_SCHEMA}
        onSubmit={(values, formikBag) => this.props.onSubmit(values, formikBag)}
      >
        {({ values, errors, touched, handleChange, handleSubmit, isSubmitting }) => (
          <form onSubmit={handleSubmit} className="fgt_password_form">
            <InputTextField
              label="Email"
              name="email"
              value={values.email}
              onChange={handleChange}
              className="fgt_password_form__field"
              error={errors.email && touched.email && errors.email}
            />
            <Button
              label="Submit"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="fgt_password_form__button"
            />
          </form>
        )}
      </Formik>
    );
  }
}

export default ForgotPasswordForm;
