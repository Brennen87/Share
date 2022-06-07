import React from 'react';
import threeDots from '../../assets/images/three-dots.svg';
import './index.scss';

export default () => (
  <p className="typingIndicator">
    <img src={threeDots} alt="typing" /> <i>typing</i>
  </p>
);
