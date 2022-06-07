import React from 'react';
import DocumentTitle from '../../components/DocumentTitle';
import Payments from '../../containers/Payments';
import './index.scss';

const PaymentsPage = ({ route, ...props }) => {
  return (
    <DocumentTitle title={route.pageTitle}>
      <div className="payments_page">
        <div className="container">
          <Payments {...props} />
        </div>
      </div>
    </DocumentTitle>
  );
};

export default PaymentsPage;
