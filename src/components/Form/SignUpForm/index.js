import * as React from 'react';
import * as classnames from 'classnames';
import InputTextField from '../../UI/InputTextField/index';
import { Formik } from 'formik';
import * as Yup from 'yup';
import ERROR_MESSAGES from '../../../common/messages';
import Button from '../../UI/Button/index';
import { PASSWORD_MIN_LENGTH } from '../../../common/dicts';
import Checkbox from '../../UI/Checkbox';
import { Link } from 'react-router-dom';
import { STRONG_PASSWORD_REGEX } from '../../../common/constants';
import './index.scss';

const VALIDATION_SCHEMA = Yup.object().shape({
  firstName: Yup.string().required(' '),
  lastName: Yup.string().required(' '),
  email: Yup.string()
    .required(ERROR_MESSAGES.EMAIL__EMPTY)
    .email(ERROR_MESSAGES.EMAIL_FORMAT),
  role: Yup.string().required(),
  password: Yup.string()
    .matches(STRONG_PASSWORD_REGEX, ERROR_MESSAGES.PASSWORD_WEAK)
    .required(ERROR_MESSAGES.PASSWORD_EMPTY)
    .min(PASSWORD_MIN_LENGTH, ERROR_MESSAGES.PASSWORD_FORMAT),
  passwordConfirm: Yup.string()
    .required(ERROR_MESSAGES.PASSWORD_EMPTY)
    .min(' '),
  termsAccepted: Yup.boolean().oneOf([true], ' ')
});

class SignUpForm extends React.Component {
  initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    role: '',
    password: '',
    passwordConfirm: '',
    termsAccepted: false
  };

  render() {
    return (
      <div>
        <Formik
          initialValues={this.initialValues}
          validationSchema={VALIDATION_SCHEMA}
          onSubmit={(values, formikBag) => this.props.onSubmit(values, formikBag)}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleSubmit,
            setFieldValue,
            isSubmitting
          }) => (
            <form onSubmit={handleSubmit} className="sign_up_form">
              <h3 className="sign_up_form__title">Sign Up</h3>
              <div className="sign_up_form__fullname sign_up_form__row">
                <InputTextField
                  label="First Name"
                  name="firstName"
                  value={values.firstName}
                  onChange={handleChange}
                  className="sign_up_form__row sign_up_form__name"
                  error={errors.firstName && touched.firstName && errors.firstName}
                />
                <InputTextField
                  label="Last Name"
                  name="lastName"
                  value={values.lastName}
                  onChange={handleChange}
                  className="sign_up_form__row sign_up_form__name"
                  error={errors.lastName && touched.lastName && errors.lastName}
                />
              </div>
              <span className="sign_up_form__text">
                Please ensure the correct spelling of your name. You will not be able to update/change it once registered. For the U.S. businesses only: if you are a Sole Proprietorship or a Single Member LLC, and opening an account on behalf of a business, enter the business name. All other users can set up only an Individual account.
              </span>
              <div
                className={classnames(
                  'sign_up_form__roles__title',
                  errors.role && touched.role && errors.role && 'sign_up_form__roles__title_error'
                )}
              >
                Please select your role.
                <span className="sign_up_form__roles__title_grey">
                  If needed, you can switch the role once registered.
                </span>
              </div>
              <div className="sign_up_form__roles">
                <div className="sign_up_form__roles_item">
                  <Checkbox
                    name="customer"
                    onChange={e => setFieldValue('role', this.setRole(e.target.value, values.role))}
                    checked={values.role === 'customer'}
                    value="customer"
                    label="CUSTOMER"
                    error={errors.role && touched.role && errors.role}
                  />
                  <div className="sign_up_form__roles_description">
                    Find and hire vendors to help with your projects.
                  </div>
                </div>
                <div className="sign_up_form__roles_item">
                  <Checkbox
                    name="vendor"
                    onChange={e => setFieldValue('role', this.setRole(e.target.value, values.role))}
                    checked={values.role === 'vendor'}
                    value="vendor"
                    label="VENDOR"
                    error={errors.role && touched.role && errors.role}
                  />
                  <div className="sign_up_form__roles_description">
                    Create professional profile and receive projects to work on.
                  </div>
                </div>
              </div>
              <InputTextField
                label="Email"
                name="email"
                value={values.email}
                onChange={handleChange}
                className="sign_up_form__row"
                error={errors.email && touched.email && errors.email}
              />
              <span className="sign_up_form__text">
                Please ensure the correct spelling of your personal or business email. You will not be able to update/change it once registered. 
              </span>
              <InputTextField
                label="Password"
                name="password"
                value={values.password}
                onChange={handleChange}
                type="password"
                className="sign_up_form__row sign_up_form__row_mt"
                error={errors.password && touched.password && errors.password}
              />
              <div className="sign_up_form__password_rules">
                Your password must be at least 8 characters long, and must contain uppercase
                letters, lowercase letters, numbers, and special characters.
              </div>
              <InputTextField
                label="Confirm Password"
                name="passwordConfirm"
                value={values.passwordConfirm}
                onChange={handleChange}
                type="password"
                className="sign_up_form__row sign_up_form__row_mt"
                error={
                  (errors.passwordConfirm && touched.passwordConfirm && errors.passwordConfirm) ||
                  (values.password !== values.passwordConfirm &&
                    touched.passwordConfirm &&
                    'Password mismatch') ||
                  ''
                }
              />

              <div className="sign_up_form__terms">
                <Checkbox
                  label={
                    <span
                      className={classnames(
                        'sign_up_form__terms_title',
                        !values.termsAccepted &&
                          touched.termsAccepted &&
                          'sign_up_form__terms_error'
                      )}
                    >
                      By creating an account, you agree to our
                      <Link to="/terms"> Terms of Service</Link> and
                      <Link to="/policy"> Privacy Policy</Link>.
                    </span>
                  }
                  className="sign_up_form__terms"
                  name="termsAccepted"
                  checked={values.termsAccepted}
                  error={!values.termsAccepted && touched.termsAccepted && 'Terms Not checked'}
                  onChange={e => setFieldValue('termsAccepted', e.target.checked)}
                />
              </div>

              <Button
                label="Sign Up"
                type="submit"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="sign_up_form__button"
              />
            </form>
          )}
        </Formik>
      </div>
    );
  }

  setRole = (selectedRole, currentRole) => (currentRole === selectedRole ? '' : selectedRole);
}

export default SignUpForm;
