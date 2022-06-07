import React from 'react';

const ArrowIcon = props => (
  <svg
    width={props.width || '100%'}
    height={props.height || '100%'}
    viewBox="0 0 15 24"
    fill={props.color}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M13 2L3 11.7568L13 22" stroke="white" stroke-width="3.5" />
  </svg>
);

export default ArrowIcon;
