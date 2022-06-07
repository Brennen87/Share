/* eslint-disable no-unused-expressions */
const registrationErrorHandler = (res, setFieldError) => {
  res && res.email && setFieldError('email', res.email.pop());
  res && res.password1 && setFieldError('password', res.password1.pop());
};

export default registrationErrorHandler;
