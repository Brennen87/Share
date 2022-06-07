import React from 'react';
import DocumentTitle from '../../components/DocumentTitle';
import ProjectCreate from '../../containers/ProjectCreate';

const ProjectCreatePage = ({ route }) => (
  <DocumentTitle title={route.pageTitle}>
    <div className="container">
      <div className="project_create_page">
        <ProjectCreate />
      </div>
    </div>
  </DocumentTitle>
);

export default ProjectCreatePage;
