import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import SmallButton from '../../components/UI/SmallButton';
import PaymentHistoryDesktop from './Desktop';
import PaymentHistoryMobile from './Mobile';
import ScreenResolver from '../../components/ScreenResolver';
import { ROLES } from '../../common/constants';
import Modal from '../../components/UI/Modal';
import PaymentModal from './Modal';
import * as classnames from 'classnames';
import { connect } from 'react-redux';
import {
  fetchPaymentHistory as fetchPaymentHistoryAction,
  fetchPaymentHistoryTotal as fetchPaymentHistoryTotalAction
} from '../../store/actions/paymentsActions';
import { InfoBlockVertical } from '../../components/UI/InfoBlockVertical';
import './index.scss';
import PaymentLevels from './PaymentLevels';
import Preloader from '../../components/Preloader';
import Notify from '../../components/Notification';
import FoundingVendorCard from '../../components/UI/PaymentsCard/founding-vendor';

const DEFAULT_PAGE_SIZE = 7;

const Payments = ({
  user,
  fetchPaymentHistory,
  paymentHistory,
  fetchPaymentHistoryTotal,
  paymentHistoryTotal,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState(1);
  const isCustomer = user.role === ROLES.customer;
  const history = useHistory();

  React.useEffect(() => {
    fetchPaymentHistory({ page, limit: DEFAULT_PAGE_SIZE });
  }, [page]);

  React.useEffect(() => {
    fetchPaymentHistoryTotal();
  }, []);

  const { loading, error, data } = paymentHistory;

  React.useEffect(() => {
    if (error || paymentHistoryTotal.error) {
      Notify.info({
        text: `An error happened during fetching the payment history details. Please try again. ${error ||
          paymentHistoryTotal.error}`
      });
    }
  }, [error, paymentHistoryTotal.error]);

  if (
    loading ||
    (!loading && !error && !data) ||
    paymentHistoryTotal.loading ||
    (!paymentHistoryTotal.loading && !paymentHistoryTotal.error && !paymentHistoryTotal.data)
  ) {
    return <Preloader className="payments__preloader" />;
  }

  if (error || paymentHistoryTotal.error) {
    return null;
  }

  const isUserCustomer = user.role === ROLES.customer;
  return (
    <div className={classnames('payments', isUserCustomer && 'payments__customer')}>
      <div className="payments__table">
        <ScreenResolver
          large={800}
          desktop={
            <div className="payments__table_desktop">
              <PaymentHistoryDesktop
                isCustomer={isUserCustomer}
                page={page}
                setPage={setPage}
                browserHistory={props.history}
                total={paymentHistoryTotal.data}
                {...(data || {})}
              />
            </div>
          }
          mobile={
            <div className="payments__table_mobile">
              <PaymentHistoryMobile
                isCustomer={isUserCustomer}
                page={page}
                setPage={setPage}
                browserHistory={props.history}
                total={paymentHistoryTotal.data}
                {...(data || {})}
              />
            </div>
          }
        />
      </div>
      <div className="payments_sidebar">
        <div className="payments_sidebar__left">
          <SmallButton onClick={() => setIsOpen(true)} label="Download" />
        </div>
        <div className={classnames('payments_sidebar__right', isCustomer ? 'customer' : 'vendor')}>
          {isCustomer ? (
            <InfoBlockVertical
              hide
              title="Feedback"
              text={
                <>
                  We always welcome feedback and suggestions. We want to know what's working and
                  what's not working for you on Kuprik. You can share your thoughts with us{' '}
                  <span
                    className="payments_sidebar__right_link"
                    onClick={() => history.push('/feedback')}
                  >
                    here
                  </span>
                  . When submitting the form, please select{' '}
                  <span style={{ fontStyle: 'italic' }}>Feedback</span>.
                </>
              }
              large={991}
              className="account_page__banner"
            />
          ) : user.founder ? (
            <FoundingVendorCard />
          ) : (
            <PaymentLevels
              earnings={
                paymentHistoryTotal.data?.earnings ? paymentHistoryTotal.data.earnings / 100 : 0
              }
            />
          )}
        </div>
        {isOpen && (
          <Modal className="modal_payments" onClose={() => setIsOpen(false)}>
            <PaymentModal setIsOpen={setIsOpen} />
          </Modal>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  user: state.userStore.user,
  paymentHistory: state.paymentsStore.paymentHistory,
  paymentHistoryTotal: state.paymentsStore.paymentHistoryTotal
});

const mapDispatchToProps = dispatch => ({
  fetchPaymentHistory: query => dispatch(fetchPaymentHistoryAction(query)),
  fetchPaymentHistoryTotal: () => dispatch(fetchPaymentHistoryTotalAction())
});

export default connect(mapStateToProps, mapDispatchToProps)(Payments);
