import React from 'react';
import UrgentNotificationIconSvg from '../../../../assets/icons/urgent_notification_icon.svg';
import './styles.scss';

export default function UrgentNotificationIcon(props) {
  return (
    <div className="projects_list_table_row__urgent_notification_icon" {...props}>
      <div className="projects_list_table_row__notification_text">CLICK HERE</div>

      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#filter0_d)">
        <circle cx="18" cy="17" r="14" fill="#FE6A6A"/>
        <circle cx="18" cy="17" r="13.5" stroke="white"/>
        </g>
        <path d="M18 24.2802C18.8008 24.2802 19.456 23.625 19.456 22.8242H16.544C16.544 23.625 17.1992 24.2802 18 24.2802ZM22.732 19.9122V15.9082C22.732 13.6514 21.2032 11.8314 19.092 11.3218V10.8122C19.092 10.2298 18.5824 9.72021 18 9.72021C17.4176 9.72021 16.908 10.2298 16.908 10.8122V11.3218C14.7968 11.8314 13.268 13.6514 13.268 15.9082V19.9122L11.812 21.3682V22.0962H24.188V21.3682L22.732 19.9122Z" fill="white"/>
        <defs>
        <filter id="filter0_d" x="0" y="0" width="36" height="36" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
        <feOffset dy="1"/>
        <feGaussianBlur stdDeviation="2"/>
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
        </filter>
        </defs>
      </svg>

      {/* <img src={UrgentNotificationIconSvg} alt="Urgent notification icon" /> */}
    </div>
  );
}
