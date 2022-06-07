import * as React from 'react';
import * as Yup from 'yup';
import ERROR_MESSAGES from '../../../common/messages';
import { Formik } from 'formik';
import InputTextField from '../../UI/InputTextField/index';
import Button from '../../UI/Button/index';
import { PASSWORD_MIN_LENGTH } from '../../../common/dicts';
import './index.scss';
import { STRONG_PASSWORD_REGEX } from '../../../common/constants';

const VALIDATION_SCHEMA = Yup.object().shape({
  password: Yup.string()
    .matches(STRONG_PASSWORD_REGEX, ERROR_MESSAGES.PASSWORD_WEAK)
    .required(ERROR_MESSAGES.PASSWORD_EMPTY)
    .min(PASSWORD_MIN_LENGTH, ERROR_MESSAGES.PASSWORD_FORMAT),
  passwordConfirm: Yup.string()
    .required(ERROR_MESSAGES.PASSWORD_EMPTY)
    .min(' ')
});

class PasswordRecoveryForm extends React.Component {
  initialValues = {
    password: '',
    passwordConfirm: ''
  };

  onSubmit = (values, formikBag) => {
    if (values.password !== values.passwordConfirm) {
      formikBag.setSubmitting(false);
      return formikBag.setFieldError('passwordConfirm', 'Password did not match');
    }

    this.props.onSubmit(values, formikBag);
  };

  render() {
    return (
      <Formik
        initialValues={this.initialValues}
        validationSchema={VALIDATION_SCHEMA}
        onSubmit={this.onSubmit}
      >
        {({ values, errors, touched, handleChange, handleSubmit, isSubmitting }) => (
          <form onSubmit={handleSubmit} className="pswd_recovery_form">
            <InputTextField
              label="New Password"
              name="password"
              value={values.password}
              onChange={handleChange}
              type="password"
              error={errors.password && touched.password && errors.password}
            />
            <div className="pswd_recovery_form__description">
              Your password must be at least 8 characters long, and must contain uppercase letters,
              lowercase letters, numbers, and special characters.
            </div>
            <InputTextField
              label="Confirm Password"
              name="passwordConfirm"
              value={values.passwordConfirm}
              onChange={handleChange}
              type="password"
              className="pswd_recovery_form__field"
              error={
                (errors.passwordConfirm && touched.passwordConfirm && errors.passwordConfirm) ||
                (values.password !== values.passwordConfirm &&
                  touched.passwordConfirm &&
                  'Password did not match') ||
                ''
              }
            />
            <Button
              label="Reset"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="pswd_recovery_form__button"
            />
          </form>
        )}
      </Formik>
    );
  }
}

export default PasswordRecoveryForm;
