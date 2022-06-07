import React from 'react';
import TermsAndPolice from '../../containers/TermsAndPolice';
import DocumentTitle from '../../components/DocumentTitle';
import './index.scss';

const TermsAndPolicePage = ({ route }) => {
  return (
    <DocumentTitle title={route.pageTitle}>
      <div className="terms_and_police_page">
        <div className="container">
          <TermsAndPolice />
        </div>
      </div>
    </DocumentTitle>
  );
};

export default TermsAndPolicePage;
