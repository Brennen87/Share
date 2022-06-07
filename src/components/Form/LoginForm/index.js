import * as React from 'react';
import InputTextField from '../../UI/InputTextField/index';
import { Formik } from 'formik';
import * as Yup from 'yup';
import ERROR_MESSAGES from '../../../common/messages';
import Button from '../../UI/Button/index';
import { PASSWORD_MIN_LENGTH } from '../../../common/dicts';
import './index.scss';

const VALIDATION_SCHEMA = Yup.object().shape({
  email: Yup.string()
    .required(ERROR_MESSAGES.EMAIL__EMPTY)
    .email(ERROR_MESSAGES.EMAIL_FORMAT),
  password: Yup.string()
    .required(ERROR_MESSAGES.PASSWORD_EMPTY)
    .min(PASSWORD_MIN_LENGTH, ERROR_MESSAGES.PASSWORD_FORMAT)
});

class LoginForm extends React.Component {
  initialValues = {
    email: '',
    password: ''
  };

  render() {
    return (
      <Formik
        initialValues={this.initialValues}
        validationSchema={VALIDATION_SCHEMA}
        onSubmit={(values, formikBag) => this.props.onSubmit(values, formikBag)}
      >
        {({ values, errors, touched, handleChange, handleSubmit, isSubmitting }) => (
          <form onSubmit={handleSubmit} className="login_form">
            <h3 className="login_form__title">Log In</h3>
            <InputTextField
              label="Email"
              name="email"
              value={values.email}
              onChange={handleChange}
              className="login_form__field"
              error={errors.email && touched.email && errors.email}
            />
            <InputTextField
              label="Password"
              name="password"
              value={values.password}
              onChange={handleChange}
              type="password"
              className="login_form__field"
              error={errors.password && touched.password && errors.password}
            />

            <Button
              label="Log In"
              type="submit"
              onSubmit={handleSubmit}
              disabled={isSubmitting}
              className="login_form__button"
            />
          </form>
        )}
      </Formik>
    );
  }
}

export default LoginForm;
