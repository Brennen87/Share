import * as React from 'react';
import './index.scss';

export const Attachment = ({ title, onRemove, onDownload }) => (
  <div className="attachment">
    <span className="attachment__title">{title}</span>
    {onRemove && <span className="attachment__remove" onClick={onRemove} />}
    {onDownload && <span className="attachment__download" onClick={onDownload} />}
  </div>
);
