import React, { useEffect, useState } from 'react';
import Avatar from '../../Avatar';
import PropTypes from 'prop-types';
import * as classnames from 'classnames';
import './index.scss';
import { currencyFormat } from '../../../helpers';

const PaymentsTableCardMobile = ({
  index,
  browserHistory,
  customer,
  vendor,
  kuprik_fee,
  projects,
  payments,
  payment,
  adjustments,
  earnings,
  activeItemIndex,
  setActiveIndex
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const itemIsCustomer = Boolean(customer);

  const toggleIsOpen = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setActiveIndex(index);
    }
  };

  useEffect(() => {
    if (activeItemIndex !== index && isOpen) {
      setIsOpen(false);
    }
  }, [isOpen, activeItemIndex, index]);

  return itemIsCustomer ? (
    <div
      className={classnames(
        'payments__mob_user_card',
        isOpen && activeItemIndex === index && 'payments__table_active'
      )}
    >
      <div onClick={toggleIsOpen} className="payments__mob_user">
        <Avatar image={customer.avatar} alt="avatar" />
        <span
          className="name"
          onClick={() =>
            browserHistory.push(`/projects/?coworkerId=${customer.id}&status=completed`)
          }
        >
          {customer.full_name}
        </span>
        <i className="arrow" />
      </div>
      <ul className="payments__mob_list">
        <li className="payments__mob_item">
          <div className="item_title">Projects</div>
          <div className="item_descr">{projects}</div>
        </li>
        <li className="payments__mob_item">
          <div className="item_title">Earnings</div>
          <div className="item_descr">${currencyFormat(earnings / 100)}</div>
        </li>
        <li className="payments__mob_item">
          <div className="item_title">Kuprik Fee</div>
          <div className="item_descr">${currencyFormat(kuprik_fee / 100)}</div>
        </li>
        <li className="payments__mob_item">
          <div className="item_title">Adjustments</div>
          <div className="item_descr">${currencyFormat(adjustments / 100)}</div>
        </li>
        <li className="payments__mob_item">
          <div className="item_title">Payment</div>
          <div className="item_descr">${currencyFormat((payment - kuprik_fee) / 100)}</div>
        </li>
      </ul>
    </div>
  ) : (
    <div
      className={classnames(
        'payments__mob_user_card',
        isOpen && activeItemIndex === index && 'payments__table_active'
      )}
    >
      <div onClick={toggleIsOpen} className="payments__mob_user">
        <Avatar image={vendor.avatar} alt="avatar" />
        <span
          className="name"
          onClick={() => browserHistory.push(`/projects/?coworkerId=${vendor.id}&status=completed`)}
        >
          {vendor.full_name}
        </span>
        <i className="arrow" />
      </div>
      <ul className="payments__mob_list">
        <li className="payments__mob_item">
          <div className="item_title">Projects</div>
          <div className="item_descr">{projects}</div>
        </li>
        <li className="payments__mob_item">
          <div className="item_title">Payments</div>
          <div className="item_descr">${currencyFormat(payments / 100)}</div>
        </li>
        <li className="payments__mob_item">
          <div className="item_title">Adjustments</div>
          <div className="item_descr">${currencyFormat(adjustments / 100)}</div>
        </li>
      </ul>
    </div>
  );
};

PaymentsTableCardMobile.propTypes = {
  projects: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  payments: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  payment: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  kurpik_fee: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  earnings: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  adjustments: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
};

export default PaymentsTableCardMobile;
