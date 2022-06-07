import React, { useEffect, useState } from 'react';
import * as classNames from 'classnames';
import './index.scss';
import { currencyFormatInteger } from '../../../helpers';

const PaymentsCard = ({
  level,
  fee,
  totalEarningsMin,
  totalEarningsMax,
  ownLevel = false,
  number = 0
}) => {
  const [symbolCount, setSymbolCount] = useState([]);

  const createArray = count => {
    const array = [];
    for (let i = 0; i < count; i++) {
      array.push(i);
    }
    return array;
  };

  useEffect(() => {
    setSymbolCount(createArray(number));
  }, []);

  return (
    <div className={classNames('paymentsinfo_card', ownLevel && 'paymentsinfo_card__ownLevel')}>
      <h3 className="paymentsinfo_card__level">
        {`${ownLevel ? 'You are ' : ''}${level}`}
        {ownLevel ? (
          <div className="indicator_container">
            <span className="level_number">{number}</span>
          </div>
        ) : (
          symbolCount.map(item => <i key={item} className="business_icon" />)
        )}
      </h3>
      <p className="paymentsinfo_card__fee">{`Kuprik Fee: ${fee}%`}</p>
      <span>
        {`Total Earnings: $${
          totalEarningsMax
            ? `${currencyFormatInteger(totalEarningsMin)} - $${currencyFormatInteger(
                totalEarningsMax
              )}`
            : `${currencyFormatInteger(totalEarningsMin - 1)} +`
        }`}
      </span>
    </div>
  );
};

export default PaymentsCard;
