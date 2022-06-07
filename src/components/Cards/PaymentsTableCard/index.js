import React from 'react';
import Avatar from '../../Avatar';
import PropTypes from 'prop-types';
import './index.scss';
import { currencyFormat } from '../../../helpers';

const PaymentsTableCards = props => {
  const {
    browserHistory,
    customer,
    vendor,
    kuprik_fee,
    projects,
    payments,
    payment,
    adjustments,
    earnings
  } = props;
  const itemIsCustomer = Boolean(customer);

  return itemIsCustomer ? (
    <div className="payments__table_card">
      <div className="payments__table_item payments__user_avatar">
        <Avatar image={customer.avatar} />
        <div
          className="username"
          onClick={() =>
            browserHistory.push(`/projects/?coworkerId=${customer.id}&status=completed`)
          }
        >
          {customer.full_name}
        </div>
      </div>
      <div className="payments__table_item">{projects}</div>
      <div className="payments__table_item">${currencyFormat(earnings / 100)}</div>
      <div className="payments__table_item">${currencyFormat(kuprik_fee / 100)}</div>
      <div className="payments__table_item">${currencyFormat(adjustments / 100)}</div>
      <div className="payments__table_item">${currencyFormat(payment / 100)}</div>
    </div>
  ) : (
    <div className="payments__table_card">
      <div className="payments__table_item payments__user_avatar">
        <Avatar image={vendor.avatar} />
        <div
          className="username"
          onClick={() => browserHistory.push(`/projects/?coworkerId=${vendor.id}&status=completed`)}
        >
          {vendor.full_name}
        </div>
      </div>
      <div className="payments__table_item">{projects}</div>
      <div className="payments__table_item">${currencyFormat(payments / 100)}</div>
      <div className="payments__table_item">${currencyFormat(adjustments / 100)}</div>
    </div>
  );
};

PaymentsTableCards.propTypes = {
  projects: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  payments: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  payment: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  kurpik_fee: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  earnings: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  adjustments: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
};

export default PaymentsTableCards;
