import React, { useState } from 'react';
import * as classnames from 'classnames';
import ScreenResolver from '../../ScreenResolver';
import InfoBlockVerticalMobile from './button/index';
import './index.scss';

export const InfoBlockVertical = ({ title, text, className, large }) => {
  const [show, setShow] = useState(false);
  const toggle = () => setShow(!show);

  return (
    <ScreenResolver
      large={large}
      desktop={
        <div className={classnames('info_block__vertical', className)}>
          <div className="info_block__title">{title}</div>
          <div className="info_block__text">{text}</div>
        </div>
      }
      mobile={<InfoBlockVerticalMobile show={show} onClick={() => toggle()} text={text} />}
    />
  );
};
