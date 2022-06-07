import * as React from 'react';

const IconBurger = ({ onClick, className }) => {
  return (
    <svg
      onClick={onClick}
      style={{ cursor: 'pointer', marginTop: '6px' }}
      width="35"
      height="24"
      viewBox="0 0 35 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="35" height="3.97727" rx="1.98864" fill="white" />
      <rect y="9.54492" width="35" height="3.97727" rx="1.98864" fill="white" />
      <rect y="19.0908" width="35" height="3.97727" rx="1.98864" fill="white" />
    </svg>
  );
};

export default IconBurger;
