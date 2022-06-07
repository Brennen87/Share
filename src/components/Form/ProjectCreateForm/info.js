import * as React from 'react';
import StatusBox from '../../../containers/ProjectCreate/StatusBox';

export const ProjectCreateStatus = ({ status }) => {
  return (
    <div className="project_create_status">
      <StatusBox success={status} />
    </div>
  );
};
