import * as React from 'react';
import * as classnames from 'classnames';
import './index.scss';

export const InfoTooltip = ({ text, className }) => (
  <div className={classnames('info_tooltip', className)}>
    <div className="info_tooltip__icon" />
    <div className="info_tooltip__text">{text}</div>
  </div>
);
