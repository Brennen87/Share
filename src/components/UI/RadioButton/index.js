import React from 'react';
import * as classnames from 'classnames';
import './index.scss';
import PropTypes from 'prop-types';

const RadioButton = ({ id, label, name, value, className, error, onChange, checked }) => {
  return (
    <label
      className={classnames('radio_button__container', className, error && 'radio_button__error')}
      htmlFor={id}
    >
      {label}
      <input
        type="radio"
        id={id}
        className="radio_button__input"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
      />
      <span className="radio_button__checkmark" />
    </label>
  );
};

export default RadioButton;

RadioButton.prototype = {
  label: PropTypes.any.isRequired,
  labelColor: PropTypes.string,
  name: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  checked: PropTypes.bool,
  error: PropTypes.bool,
  id: PropTypes.string
};
