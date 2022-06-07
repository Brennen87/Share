import * as React from 'react';
import * as classnames from 'classnames';
import PropTypes from 'prop-types';
import './index.scss';

const SmallButton = props => {
  const { label, disabled, bgColor, className, ...other } = props;
  return (
    <button
      className={classnames('small_button', className, disabled && 'small_button-disabled')}
      disabled={disabled}
      {...other}
    >
      <span className="small_button__label">{label}</span>
    </button>
  );
};

export default SmallButton;

SmallButton.propTypes = {
  label: PropTypes.string.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  bgColor: PropTypes.string
};
