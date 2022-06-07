import * as React from 'react';
import './index.scss';
import * as classnames from 'classnames';
import { doNothing } from '../../helpers';

export const AttachmentPicker = ({ onChange, disabled, buttonText, attachmentId, accept, ...other }) => (
  <div className="attachment_picker">
    {
      buttonText ?
      (<label
        htmlFor={attachmentId || "attachment"}
        className={classnames(
          'attachment_picker__label_button',
          disabled ? 'attachment_picker__label_button_hidden' : ''
        )}
      >
        {buttonText}
      </label>) :
      (<label
        htmlFor={attachmentId || "attachment"}
        className={classnames(
          'attachment_picker__label',
          disabled ? 'attachment_picker__label_disabled' : ''
        )}
      />)
    }
    <input
      type="file"
      name={attachmentId || "attachment"}
      id={attachmentId || "attachment"}
      className="attachment_picker__input"
      accept={accept || ""}
      onChange={disabled ? doNothing : onChange}
      disabled={disabled}
      {...other}
    />
  </div>
);
