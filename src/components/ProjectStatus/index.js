import * as React from 'react';
import * as classnames from 'classnames';
import { PROJECT_STATUSES } from '../../common/constants';
import './index.scss';

export const ProjectStatus = ({ status, className, mustIndent, realValue = false }) => {
  return (
    <div
      className={classnames(
        'project_status',
        `project_status__${status ? status.toLowerCase() : ''}`,
        realValue ? 'real' : '',
        mustIndent && 'indent',
        className
      )}
    >
      {(realValue && status === 'PENDING_CANCELLATION'
        ? 'Pending Cancellation'
        : PROJECT_STATUSES[status]) || status}
    </div>
  );
};
