import * as React from 'react';
import ProjectsSummary from './ProjectsSummary';
import ProjectsList from './ProjectsList';
import './index.scss';

const Projects = () => (
  <div className="container">
    <div className="projects">
      <ProjectsSummary />
      <ProjectsList />
    </div>
  </div>
);

export default Projects;
