import * as React from 'react';
import Vendors from '../../containers/Vendors';
import DocumentTitle from '../../components/DocumentTitle';

const VendorsPage = props => (
  <DocumentTitle title={props.route.pageTitle}>
    <div className="vendors_page">
      <div className="container">
        <Vendors {...props} />
      </div>
    </div>
  </DocumentTitle>
);

export default VendorsPage;
