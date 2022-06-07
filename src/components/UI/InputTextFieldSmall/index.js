import * as React from 'react';
import * as classnames from 'classnames';
import PropTypes from 'prop-types';
import './index.scss';

const InputTextFieldSmall = ({
  className,
  name,
  value,
  onChange,
  label,
  row,
  disabled,
  type,
  placeholder,
  error,
  text,
  readOnly,
  iconButton,
  ...other
}) => (
  <div
    className={classnames(
      'input_text_field_small',
      row && 'input_text_field_small__row',
      className
    )}
  >
    <div className="input_text_field_small__top">
      <label className="input_text_field_small__label" htmlFor={name}>
        {label}
      </label>
      {text && <span className="input_text_field_small__text">{text}</span>}
    </div>
    <input
      className={classnames(
        'input_text_field_small__input',
        error && 'input_text_field_small__input_error',
        readOnly && 'input_text_field_small__input_read_only'
      )}
      type={type || 'text'}
      name={name}
      id={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
      placeholder={placeholder}
      readOnly={readOnly}
      {...other}
    />
    {iconButton ? <>{iconButton}</> : null}
    {error ? <div className="input_text_field_small__error">{error}</div> : null}
  </div>
);

export default InputTextFieldSmall;

InputTextFieldSmall.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.oneOf(['text', 'number', 'password', 'email']),
  row: PropTypes.bool,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool
};
