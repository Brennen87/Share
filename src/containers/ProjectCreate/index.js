import * as React from 'react';
import ProjectCreateForm from '../../components/Form/ProjectCreateForm';
import { useHistory } from 'react-router-dom';
import './index.scss';

const ProjectCreate = () => {
  const history = useHistory();
  return (
    <div className="project_create">
      <h2 className="project_create__title">Create new project</h2>
      <ProjectCreateForm history={history} />
    </div>
  );
};

export default ProjectCreate;
