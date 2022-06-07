import React from 'react';
import DocumentTitle from '../../components/DocumentTitle';
import Resources from '../../containers/Resources';

const ResourcesPage = ({ route }) => (
  <DocumentTitle title={route.pageTitle}>
    <div className="resources_page" style={{height: "100%"}}>
      <div className="container" style={{height: "100%"}}>
        <Resources />
      </div>
    </div>
  </DocumentTitle>
);

export default ResourcesPage;
