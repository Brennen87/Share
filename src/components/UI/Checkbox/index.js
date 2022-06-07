import * as React from 'react';
import * as classnames from 'classnames';
import PropTypes from 'prop-types';
import './index.scss';

const Checkbox = ({ label, name, onChange, checked, className, id, value, error }) => (
  <label
    className={classnames('checkbox__container', className, error && 'checkbox__error')}
    htmlFor={id || name}
  >
    {label}
    <input
      id={id || name}
      name={name}
      type="checkbox"
      className="checkbox__input"
      value={value}
      checked={checked}
      onChange={onChange}
    />
    <span className="checkbox__checkmark" />
  </label>
);

export default Checkbox;

Checkbox.prototype = {
  label: PropTypes.any.isRequired,
  name: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  checked: PropTypes.bool,
  error: PropTypes.bool,
  id: PropTypes.string
};
