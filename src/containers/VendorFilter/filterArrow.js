import * as React from 'react';
import * as classnames from 'classnames';

export const FilterArrow = ({ active, onClick, className }) => (
  <div className={classnames('filter_arrow', className)} onClick={onClick}>
    <svg
      width="12"
      height="7"
      viewBox="0 0 12 7"
      fill="none"
      style={{ transform: active ? 'rotate(180deg)' : 'rotate(0)' }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.8801 0.721401L11.2789 0.120283C11.1988 0.0400099 11.1066 0 11.0022 0C10.8982 0 10.8059 0.0400099 10.7258 0.120283L6.00006 4.8458L1.27451 0.120409C1.19436 0.0401364 1.10213 0.000126278 0.997933 0.000126278C0.893696 0.000126278 0.801463 0.0401364 0.721359 0.120409L0.120283 0.721569C0.04001 0.801673 0 0.893907 0 0.998143C0 1.1023 0.0401363 1.19453 0.120283 1.27463L5.72349 6.87797C5.80359 6.95811 5.89587 6.99816 6.00006 6.99816C6.10426 6.99816 6.19637 6.95811 6.27643 6.87797L11.8801 1.27463C11.9602 1.19449 12 1.10225 12 0.998143C12 0.893907 11.9602 0.801673 11.8801 0.721401Z"
        fill={active ? '#FF8C00' : '#324A5E'}
      />
    </svg>
  </div>
);
