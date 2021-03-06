import React from 'react';
import PropTypes from 'prop-types';

const InfoBlockVerticalMobile = ({ onClick, show, text }) => {
  return (
    <div className="info_block__mobile">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="25"
        height="25"
        viewBox="0 0 25 25"
        fill="none"
        onClick={onClick}
      >
        <path
          d="M12.5 0C5.60769 0 0 5.60731 0 12.5C0 19.3927 5.60769 25 12.5 25C19.3923 25 25 19.3927 25 12.5C25 5.60731 19.3923 0 12.5 0ZM12.5 23.4615C6.45577 23.4615 1.53846 18.5442 1.53846 12.5C1.53846 6.45577 6.45577 1.53846 12.5 1.53846C18.5442 1.53846 23.4615 6.45577 23.4615 12.5C23.4615 18.5442 18.5442 23.4615 12.5 23.4615Z"
          fill="#666"
        />
        <path
          d="M12.5 8C13.3284 8 14 7.32843 14 6.5C14 5.67157 13.3284 5 12.5 5C11.6716 5 11 5.67157 11 6.5C11 7.32843 11.6716 8 12.5 8Z"
          fill="#666"
        />
        <path
          d="M12.5 11C11.672 11 11 11.4267 11 11.9524V20.0476C11 20.5733 11.672 21 12.5 21C13.328 21 14 20.5733 14 20.0476V11.9524C14 11.4262 13.328 11 12.5 11Z"
          fill="#666"
        />
      </svg>
      {show && <p>{text}</p>}
    </div>
  );
};

InfoBlockVerticalMobile.prototype = {
  onClick: PropTypes.func.isRequired
};

export default InfoBlockVerticalMobile;
