import React from 'react';
import PaymentsTableCards from '../../../components/Cards/PaymentsTableCard';
import Pagination from '../../../components/Pagination';
import { InfoTooltipVertical } from '../../../components/UI/InfoTooltipVertical';
import { currencyFormat } from '../../../helpers';
import './index.scss';

const PaymentHistoryDesktop = ({
  isCustomer,
  list,
  total_count,
  total_pages,
  page,
  setPage,
  browserHistory,
  total
}) => {
  return (
    <>
      {isCustomer ? (
        <div className="payments__table_top">
          <div className="payments__table_top_item">Vendor Name</div>
          <div className="payments__table_top_item">Projects</div>
          <div className="payments__table_top_item">Payments</div>
          <div className="payments__table_top_item">
            Adjustments
            <span className="payments__table_box_icon" />
            <div className="payments__table_box">
              Adjustments to payments made outside of the standard project payment flow. 
            </div>
          </div>
        </div>
      ) : (
        <div className="payments__table_top">
          <div className="payments__table_top_item">Customer Name</div>
          <div className="payments__table_top_item">Projects</div>
          <div className="payments__table_top_item">Earnings</div>
          <div className="payments__table_top_item">Kuprik Fee</div>
          <div className="payments__table_top_item">
            Adjustments
            <span className="payments__table_box_icon" />
            <div className="payments__table_box">
              Adjustments to payments made outside of the standard project payment flow. 
            </div>
          </div>
          <div className="payments__table_top_item">Total Paid</div>
        </div>
      )}

      <div className="payments__table_bottom">
        {isCustomer ? (
          <div className="payments__table_header">
            <div className="payments__table_item">
              <span>TOTAL</span>
            </div>
            <div className="payments__table_item">
              <span>{total.projects}</span>
            </div>
            <div className="payments__table_item">
              <span>${currencyFormat(total.payments / 100)}</span>
            </div>
            <div className="payments__table_item">
              <span>${currencyFormat(total.adjustments / 100)}</span>
            </div>
          </div>
        ) : (
          <div className="payments__table_header">
            <div className="payments__table_item">
              <span>TOTAL</span>
            </div>
            <div className="payments__table_item">
              <span>{total.projects}</span>
            </div>
            <div className="payments__table_item">
              <span>${currencyFormat(total.earnings / 100)}</span>
            </div>
            <div className="payments__table_item">
              <span>${currencyFormat(total.kuprik_fee / 100)}</span>
            </div>
            <div className="payments__table_item">
              <span>${currencyFormat(total.adjustments / 100)}</span>
            </div>
            <div className="payments__table_item">
              <span>${currencyFormat(total.payment / 100)}</span>
            </div>
          </div>
        )}

        <div className="payments__table_content">
          <div className="payments__table_list">
            {list
              ? list.map((item, index) => {
                  return (
                    <PaymentsTableCards key={index} browserHistory={browserHistory} {...item} />
                  );
                })
              : null}
          </div>
        </div>
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

export default PaymentHistoryDesktop;
