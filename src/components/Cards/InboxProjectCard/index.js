import React from 'react';
import * as classnames from 'classnames';
import { getFullName } from '../../../helpers';
import { ProjectDetailIcon } from '../../UI/Icons/ProjectDetailIcon';
import { Link } from 'react-router-dom';
import './index.scss';

const InboxProjectCard = ({
  onClick,
  id,
  active,
  title,
  firstName,
  lastName,
  newMessage,
  status
}) => {
  const owner = getFullName(firstName, lastName);
  const isClosed = ['CANCELLED', 'COMPLETED'].includes(status);
  return (
    <div className="inbox_project_card" onClick={onClick}>
      <div
        className={classnames(
          'inbox_project_card__inner',
          active && 'inbox_project_card__inner_active'
        )}
      >
        <Link to={`/projects/${id}/`} className="inbox_project_card__icon">
          <ProjectDetailIcon status={status} />
        </Link>
        <div className="inbox_project_card__content">
          <div className="inbox_project_card__title">{title}</div>
          {owner ? <div className="inbox_project_card__owner">{owner}</div> : null}
          {isClosed ? (
            <div
              className={`inbox_project_card__closed-indicator_${
                status === 'CANCELLED' ? 'cancelled' : 'completed'
              }`}
            >
              {status}
            </div>
          ) : null}
        </div>
        {newMessage ? <div className="inbox_project_card__new new_message" /> : null}
      </div>
    </div>
  );
};

export default InboxProjectCard;
