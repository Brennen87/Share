import React, { useState } from 'react';
import PaymentsTableCardMobile from '../../../components/Cards/PaymentsTableCardMobile';
import { mockDataPaymets } from '../../../common/mockData';
import * as classnames from 'classnames';
import './index.scss';
import { currencyFormat } from '../../../helpers';
import Pagination from '../../../components/Pagination';

const PaymentHistoryMobile = ({
  isCustomer,
  list,
  total_count,
  total_pages,
  page,
  setPage,
  browserHistory,
  total
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItemIndex, setActiveItemIndex] = useState(0);

  return (
    <>
      <div className={classnames('payments__table_mob_top', isOpen && 'payments__table_active')}>
        <h3 onClick={() => setIsOpen(!isOpen)}>Total</h3>
        <i className="arrow" />
        <div className="payments__mob_user_card">
          {isCustomer ? (
            <ul className="payments__mob_list">
              <li className="payments__mob_item">
                <div className="item_title">Total Projects</div>
                <div className="item_descr">{total.projects}</div>
              </li>
              <li className="payments__mob_item">
                <div className="item_title">Total Payments</div>
                <div className="item_descr">${currencyFormat(total.payments / 100)}</div>
              </li>
              <li className="payments__mob_item">
                <div
                  className="item_title"
                  title="Adjustments to payments made outside of the standard project payment flow. "
                >
                  Total Adjustments
                </div>
                <div className="item_descr">${currencyFormat(total.adjustments / 100)}</div>
              </li>
            </ul>
          ) : (
            <ul className="payments__mob_list">
              <li className="payments__mob_item">
                <div className="item_title">Total Projects</div>
                <div className="item_descr">{total.projects}</div>
              </li>
              <li className="payments__mob_item">
                <div className="item_title">Total Earnings</div>
                <div className="item_descr">${currencyFormat(total.earnings / 100)}</div>
              </li>
              <li className="payments__mob_item">
                <div className="item_title">Total Kuprik Fee</div>
                <div className="item_descr">${currencyFormat(total.kuprik_fee / 100)}</div>
              </li>
              <li className="payments__mob_item">
                <div
                  className="item_title"
                  title="Adjustments to payments made outside of the standard project payment flow. "
                >
                  Total Adjustments
                </div>
                <div className="item_descr">${currencyFormat(total.adjustments / 100)}</div>
              </li>
              <li className="payments__mob_item">
                <div className="item_title">Total Payment</div>
                <div className="item_descr">${currencyFormat(total.payment / 100)}</div>
              </li>
            </ul>
          )}
        </div>
      </div>
      <div className="payments__table_mob_bottom">
        {list
          ? list.map((item, index) => {
              return (
                <PaymentsTableCardMobile
                  key={index}
                  index={index}
                  browserHistory={browserHistory}
                  activeItemIndex={activeItemIndex}
                  setActiveIndex={setActiveItemIndex}
                  {...item}
                />
              );
            })
          : null}
      </div>

      {total_pages > 1 ? (
        <div className="projects_list__pagination">
          <Pagination
            totalPages={total_pages || 0}
            activePage={page}
            onChange={newPage => {
              setPage(newPage);
            }}
          />
        </div>
      ) : null}
    </>
  );
};

export default PaymentHistoryMobile;
