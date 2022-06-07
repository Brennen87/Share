import React from 'react';
import * as classnames from 'classnames';
import PropTypes from 'prop-types';
import Avatar from '../../Avatar';
import { getFullName, lastLogin } from '../../../helpers';
import { CounterBadge } from '../../UI/CounterBadge';
import './index.scss';

const InboxUserCard = ({
  firstName,
  lastName,
  lastseen,
  avatar,
  newMessagesCount,
  active,
  online,
  newMessage,
  onClick
}) => {
  const fullname = getFullName(firstName, lastName);
  return (
    <div className="inbox_user_card" onClick={onClick}>
      <div
        className={classnames('inbox_user_card__inner', active && 'inbox_user_card__inner_active')}
      >
        <Avatar alt={fullname} image={avatar} online={online} className="inbox_user_card__avatar" />
        <div className="inbox_user_card__content">
          <div className="inbox_user_card__fullname">{fullname}</div>
          <div className="inbox_user_card__lastlogin">
            Last log in: <span>{lastLogin(online, lastseen)}</span>
          </div>
        </div>
        <CounterBadge count={newMessagesCount} />
        {newMessage && <div className="inbox_user_card__new new_message" />}
      </div>
    </div>
  );
};

InboxUserCard.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  newMessagesCount: PropTypes.number.isRequired,
  active: PropTypes.bool.isRequired,
  lastseen: PropTypes.string,
  avatar: PropTypes.string,
  online: PropTypes.bool,
  onClick: PropTypes.func
};

export default InboxUserCard;
