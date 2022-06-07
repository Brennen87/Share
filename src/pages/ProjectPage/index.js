import React from 'react';
import DocumentTitle from '../../components/DocumentTitle';
import Projects from '../../containers/Projects';

const ProjectPage = ({ route }) => (
  <DocumentTitle title={route.pageTitle}>
    <Projects />
  </DocumentTitle>
);

export default ProjectPage;
