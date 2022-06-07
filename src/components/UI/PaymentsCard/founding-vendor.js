import React from 'react';
import * as classNames from 'classnames';
import './index.scss';

const FoundingVendorCard = () => {
  return (
    <div className={classNames('paymentsinfo_card', 'paymentsinfo_card__ownLevel')}>
      <h3 className="paymentsinfo_card__level">
        Founding vendor
        <div className="indicator_container indicator_container--founder" />
      </h3>
      <p className="paymentsinfo_card__fee">Kuprik Fee: 13%</p>
      <span className="paymentsinfo_card__timeframe--founder">For Life</span>
    </div>
  );
};

export default FoundingVendorCard;
