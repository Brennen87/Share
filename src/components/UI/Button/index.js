import * as React from 'react';
import * as classnames from 'classnames';
import PropTypes from 'prop-types';
import './index.scss';

const Button = props => {
  const { label, className, disabled, type, ...other } = props;
  return (
    <button
      className={classnames('button_main', className, disabled && 'button_main-disabled')}
      type={type || 'button'}
      disabled={disabled}
      {...other}
    >
      <span className="button_main__label">{label}</span>
    </button>
  );
};

export default Button;

Button.propTypes = {
  label: PropTypes.string.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool
};
