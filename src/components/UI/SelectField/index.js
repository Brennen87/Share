import Select from 'react-select';
import * as React from 'react';
import * as classnames from 'classnames';
import './index.scss';

const SelectField = props => {
  const { label, className, error, classNamePrefix, id, name, ...other } = props;
  return (
    <div className={classnames('select_field', className)}>
      <label className="select_field__label" htmlFor={id || name}>
        {label}
      </label>
      <Select
        name={id || name}
        className="select_field__input"
        classNamePrefix={`${error ? 'error ' : ''}select ${classNamePrefix}`}
        {...other}
      />
      {error ? <div className="select_field__error">{error}</div> : null}
    </div>
  );
};

export default SelectField;
