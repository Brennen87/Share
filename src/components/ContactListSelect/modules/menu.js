import * as React from 'react';
import { ContactCard } from '../../Cards/ContactCard';

export const MenuList = props => {
  const { setValue, options } = props;
  const onSelect = contact => {
    setValue(contact);
  };

  return (
    <div className="contact_menu_list" style={{ display: options?.length ? 'block' : 'none' }}>
      {options.map(contact => (
        <ContactCard
          key={contact.value}
          avatar={contact.avatar}
          fullname={contact.label}
          onClick={() => onSelect(contact)}
        />
      ))}
    </div>
  );
};
