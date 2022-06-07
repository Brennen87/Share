import React from 'react';
import Inbox from '../../containers/Inbox';
import DocumentTitle from '../../components/DocumentTitle';

const InboxPage = ({ route }) => {
  return (
    <DocumentTitle title={route.pageTitle}>
      <div className="inbox_page">
        <div className="container">
          <Inbox />
        </div>
      </div>
    </DocumentTitle>
  );
};

export default InboxPage;
