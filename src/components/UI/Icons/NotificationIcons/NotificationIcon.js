import React from 'react';
import NotificationIconSvg from '../../../../assets/icons/notification_icon.svg';

export default function NotificationIcon(props) {
  return (
    <div className="projects_list_table_row__notification_icon" {...props}>
      <img src={NotificationIconSvg} alt="Notification icon" />
    </div>
  );
}
