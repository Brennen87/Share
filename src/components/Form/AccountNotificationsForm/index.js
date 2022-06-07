import * as React from 'react';
import * as classnames from 'classnames';
import { Formik } from 'formik';
import SmallButton from '../../UI/SmallButton';
import './index.scss';

const AccountNotificationsForm = ({ notifications, onSubmit }) => {
  const { new_message, resource_updates, kuprik_updates, kuprik_recommendations } = notifications;

  return (
    <Formik
      enableReinitialize
      onSubmit={(values, formikBag) => onSubmit(values, formikBag)}
      initialValues={{
        newMessage: !!new_message,
        resourceUpdates: !!resource_updates,
        kuprikUpdates: !!kuprik_updates,
        kuprikRecommendations: !!kuprik_recommendations,
        editable: false
      }}
    >
      {({
        values,
        handleChange,
        handleSubmit,
        isSubmitting,
        handleReset,
        setFieldValue,
        isDirty
      }) => (
        <form className="account_notifications_form" onSubmit={handleSubmit}>
          <div className="account_notifications_form__title">Email</div>
          <div className="account_notifications_form__text">
            Automatic notifications include all notifications in regards to user onboarding, project completion, cancellation process, refunds and payments.
          </div>
          <div className="account_notifications_form__options">
            <div className="account_notifications_form__options_left">
              <Checkbox
                label="Inbox Messages"
                name={values.editable ? 'newMessage' : 'noop1'}
                onChange={handleChange}
                value={!values.newMessage}
                checked={values.newMessage}
                disabled={!values.editable}
                className="account_checkbox"
              />
              <Checkbox
                label="Kuprik Updates"
                name={values.editable ? 'kuprikUpdates' : 'noop3'}
                onChange={handleChange}
                value={!values.kuprikUpdates}
                checked={values.kuprikUpdates}
                disabled={!values.editable}
                className="account_checkbox"
              />
            </div>
            <div className="account_notifications_form__options_right">
              <Checkbox
                label="Resource Updates"
                name={values.editable ? 'resourceUpdates' : 'noop2'}
                onChange={handleChange}
                value={!values.resourceUpdates}
                checked={values.resourceUpdates}
                disabled={!values.editable}
                className="account_checkbox"
              />
              <Checkbox
                label="Kuprik Recommendations"
                name={values.editable ? 'kuprikRecommendations' : 'noop4'}
                onChange={handleChange}
                value={!values.kuprikRecommendations}
                checked={values.kuprikRecommendations}
                disabled={!values.editable}
                className="account_checkbox"
              />
            </div>
          </div>
          <div className="account_notifications_form__buttons">
            {values.editable ? (
              <SmallButton
                type="button"
                label="Cancel"
                onClick={() => {
                  handleReset();
                  setFieldValue('editable', false);
                }}
                bgColor="#C4C4C4"
              />
            ) : (
              <SmallButton
                type="button"
                label="Edit"
                bgColor="#C4C4C4"
                onClick={() => setFieldValue('editable', true)}
              />
            )}

            {(values.editable || isDirty) && (
              <SmallButton
                type="submit"
                label="Save"
                onClick={handleSubmit}
                disabled={isSubmitting}
              />
            )}
          </div>
        </form>
      )}
    </Formik>
  );
};

export default AccountNotificationsForm;

const Checkbox = ({ label, name, onChange, checked, className, disabled, id, value }) => (
  <label className={classnames('big_checkbox__container', className)} htmlFor={id || name}>
    {label}
    <input
      id={id || name}
      name={name}
      type="checkbox"
      value={value}
      onChange={onChange}
      checked={checked}
      disabled={disabled}
      className="big_checkbox__input"
    />
    <span
      className={classnames(
        'big_checkbox__checkmark',
        disabled && 'big_checkbox__checkmark_disable'
      )}
    />
  </label>
);
