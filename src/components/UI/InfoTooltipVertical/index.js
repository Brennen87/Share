import React, { useState } from 'react';
import * as classnames from 'classnames';
import OutsideClickHandler from 'react-outside-click-handler';
import './index.scss';

export const InfoTooltipVertical = ({ text, className }) => {
  const [isOpen, setIsopen] = useState(false);

  return (
    <div
      className={classnames(
        'info_tooltip_vertical',
        className,
        isOpen && 'info_tooltip_vertical__active'
      )}
    >
      <OutsideClickHandler onOutsideClick={() => setIsopen(false)}>
        <div onClick={() => setIsopen(true)} className="info_tooltip_vertical__icon" />
        <div className="info_tooltip_vertical__text">{text}</div>
      </OutsideClickHandler>
    </div>
  );
};
