import * as React from 'react';
import * as classnames from 'classnames';
import PropTypes from 'prop-types';
import './index.scss';

const CheckboxWhite = ({
  label,
  labelColor,
  name,
  onChange,
  checked,
  className,
  id,
  value,
  error
}) => (
  <label
    className={classnames('checkbox_white__container', className, error && 'checkbox_white__error')}
    style={{ color: labelColor || '#000' }}
    htmlFor={id || name}
  >
    {label}
    <input
      id={id || name}
      name={name}
      type="checkbox"
      className="checkbox_white__input"
      value={value}
      checked={checked}
      onChange={onChange}
    />
    <span className="checkbox_white__checkmark" />
  </label>
);

export default CheckboxWhite;

CheckboxWhite.prototype = {
  label: PropTypes.any.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  labelColor: PropTypes.string,
  className: PropTypes.string,
  checked: PropTypes.bool,
  error: PropTypes.bool,
  id: PropTypes.string
};
