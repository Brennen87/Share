import * as React from 'react';
import Customers from '../../containers/Customers';
import DocumentTitle from '../../components/DocumentTitle';

const CustomersPage = props => (
  <DocumentTitle title={props.route.pageTitle}>
    <div className="vendors_page">
      <div className="container">
        <Customers {...props} />
      </div>
    </div>
  </DocumentTitle>
);

export default CustomersPage;
