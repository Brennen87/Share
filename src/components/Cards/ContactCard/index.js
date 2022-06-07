import * as React from 'react';
import Avatar from '../../Avatar';
import './index.scss';

export const ContactCard = ({ avatar, fullname, onClick }) => {
  return (
    <div className="contact_card" onClick={onClick}>
      <Avatar image={avatar} alt={fullname} />
      <div className="contact_card__title">{fullname}</div>
    </div>
  );
};
