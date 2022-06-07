import React from 'react';
import * as classnames from 'classnames';
import './index.scss';

export const InfoBlock = ({ text, className, hide }) => {
  return (
    <div className={classnames('info_block', hide && 'info_block_small', className)}>
      <div className="info_block__text">{text}</div>
    </div>
  );
};
