import * as React from 'react';
import * as classnames from 'classnames';
import PropTypes from 'prop-types';
import './index.scss';

const CheckboxWhiteBigger = ({
  label,
  labelColor,
  name,
  onChange,
  checked,
  className,
  id,
  value,
  error,
  disabled
}) => (
  <label
    className={classnames(
      'checkbox_white_bigger__container',
      className,
      error && 'checkbox_white_bigger__error'
    )}
    style={{ color: labelColor || '#000' }}
    htmlFor={id || name}
  >
    {label}
    <input
      id={id || name}
      name={name}
      type="checkbox"
      className="checkbox_white_bigger__input"
      value={value}
      checked={checked}
      onChange={onChange}
      disabled={disabled}
    />
    <span className={`checkbox_white_bigger__checkmark${checked ? ' checked' : ''}`} />
  </label>
);

export default CheckboxWhiteBigger;

CheckboxWhiteBigger.prototype = {
  label: PropTypes.any.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  labelColor: PropTypes.string,
  className: PropTypes.string,
  checked: PropTypes.bool,
  error: PropTypes.bool,
  id: PropTypes.string,
  disabled: PropTypes.bool
};
