import * as React from 'react';
import * as classnames from 'classnames';
import SmallButton from '../../UI/SmallButton';
import TextareaAutosize from 'react-textarea-autosize';
import { Formik } from 'formik';
import * as Yup from 'yup';
import './index.scss';

const VALIDATION_SCHEMA = Yup.object().shape({
  reason: Yup.string()
});

const AccountDeleteForm = ({ onSubmit, onCancel }) => {
  const [reason, setReason] = React.useState("");

  function handleMessage(e, value, handler) {
    setReason(value);
    return handler(e);
  };


  return (
  <Formik
    validationSchema={VALIDATION_SCHEMA}
    onSubmit={values => onSubmit(values)}
    initialValues={{
      reason: ""
    }}
  >
    {({ values, handleSubmit, handleChange }) => (
      <form className="account_delete_form" onSubmit={handleSubmit}>
        <div className="account_delete_form__header">Deactivate Account</div>
        <div className="account_delete_form__inner">
          <div className="account_delete_form__title">
            Are you sure? We will be sad to see you go.
          </div>
          <p className="account_delete_form__text">
            Your account will be permanently deleted in 30 days. If you decide to come back to Kuprik after 30 days all of your existing information will no longer be available, and you will have to create a new account. If you change your mind before your account is permanently deleted, you can reactivate your account by simply logging back in.
          </p>
          <div className="account_delete_form__title">
            Help us improve our services, tell us why are you leaving.
          </div>

          <TextareaAutosize
            name="reason"
            value={values.reason}
            placeholder="I am leaving because"
            onChange={handleChange}
            className="account_delete_form__input"
            maxRows={8}
          />

          <div className="account_delete_form__buttons">
            <SmallButton label="Cancel" onClick={onCancel} />
            <SmallButton
              label="Deactivate Account"
              type="submit"
              disabled={!values.reason}
              onSubmit={handleSubmit}
              className={classnames(values.reason && 'active')}
            />
          </div>
        </div>
      </form>
    )}
  </Formik>
);
}

export default AccountDeleteForm;
