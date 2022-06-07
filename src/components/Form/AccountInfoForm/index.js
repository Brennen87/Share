import * as React from 'react';
import InputTextFieldSmall from '../../UI/InputTextFieldSmall';
import { Formik } from 'formik';
import './index.scss';

const AccountInfoForm = ({ url, onSubmit }) => (
  <Formik
    enableReinitialize
    onSubmit={(values, formikBag) => onSubmit(values, formikBag)}
    initialValues={{
      url: url || '',
      editable: false
    }}
  >
    {({ values, handleChange, handleSubmit, setFieldValue, submitForm }) => (
      <form className="account_info_form" onSubmit={handleSubmit}>
        <div className="select_field">
          <label className="select_field__label">Your URL</label>
          <div className="select_field__input">{url}</div>
        </div>
      </form>
    )}
  </Formik>
);

export default AccountInfoForm;

const editIcon = (
  <svg
    width="8"
    height="8"
    viewBox="0 0 8 8"
    fill="none"
    className="checkbox_icon"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.875 1.79167L7.0625 2.60417L5.39583 0.9375L6.20833 0.125C6.29167 0.0416667 6.39583 0 6.52083 0C6.64583 0 6.75 0.0416667 6.83333 0.125L7.875 1.16667C7.95833 1.25 8 1.35417 8 1.47917C8 1.60417 7.95833 1.70833 7.875 1.79167ZM0 6.33333L4.91667 1.41667L6.58333 3.08333L1.66667 8H0V6.33333Z"
      fill="white"
    />
  </svg>
);

const checkmarkIcon = (
  <svg
    width="10"
    height="8"
    viewBox="0 0 10 8"
    fill="none"
    className="edit_icon"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1 3.09524L3.97674 6.14286L9 1"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);
