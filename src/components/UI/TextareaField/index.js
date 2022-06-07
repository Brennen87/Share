import * as React from 'react';
import * as classnames from 'classnames';
import './index.scss';

const TextareaField = props => {
  const { name, label, className, error, column, text, ...other } = props;
  const textAreaClass = classnames(
    'textarea_field__input',
    error === '' && 'textarea_field__input_error',
    { textarea_error_status: error }
  );

  return (
    <React.Fragment>
      <div className={classnames('textarea_field', column && 'column', className)}>
        <div className="textarea_field__top">
          {label && (
            <label className="textarea_field__label" htmlFor={name}>
              {label}
            </label>
          )}
          {text && <span className="textarea_field__text">{text}</span>}
        </div>
        <textarea rows="6" className={textAreaClass} name={name} id={name} {...other} />
        {error ? <div className="textarea_field__error">{error}</div> : null}
      </div>
    </React.Fragment>
  );
};

export default TextareaField;
