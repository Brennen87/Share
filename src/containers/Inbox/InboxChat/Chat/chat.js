import React from 'react';
import { useHistory } from 'react-router-dom';
import Avatar from '../../../../components/Avatar';
import { forceDownloadFileFromUrl } from '../../../../helpers';
import PropTypes from 'prop-types';
import moment from 'moment';
import { HH_MM_A, MMM_DD_YYYY_FORMAT, ROLES } from '../../../../common/constants';
import '../index.scss';

export const Sender = ({
  fullname,
  date,
  text,
  attachments,
  timestamp,
  author,
  parentChatUser
}) => {
  const history = useHistory();
  const redirectToProfile = (e, messageAuthor) => {
    e.preventDefault();
    const role =
      parentChatUser.username === messageAuthor.username
        ? parentChatUser.role
        : parentChatUser.role === 'customer'
        ? 'vendor'
        : 'customer';
    messageAuthor && history.push(`/${role}/${messageAuthor.username}`);
  };
  return (
    <div className="chat_block">
      <Avatar
        image={author.avatar}
        alt={fullname}
        online={author.online}
        className="chat_sender__avatar"
      />
      <div className="chat_text">
        <div className="chat_text__header">
          <div className="chat_sender__fullname" onClick={e => redirectToProfile(e, author)}>
            {fullname}
          </div>
          <div className="chat_sender__date">
            <span>{moment(date).format(MMM_DD_YYYY_FORMAT)}</span>
            <span>{moment(timestamp).format(HH_MM_A)}</span>
          </div>
        </div>
        <Message text={text} attachments={attachments} timestamp={timestamp} />
      </div>
    </div>
  );
};

export const Message = ({ text, attachments, timestamp }) => {
  return (
    <div className="chat_message__wrapper">
      <div className="chat_message">
        {text && <span className="chat_message__text">{text}</span>}
        {!!attachments.length && (
          <div className="chat_message__attachments">
            {attachments.map(attachment => {
              return (
                <a
                  key={attachment.id}
                  download={attachment.file}
                  target="_blank"
                  href={attachment.file}
                  className="chat_message__attachment"
                  rel="noopener noreferrer"
                  title={attachment.name}
                  data-timestamp={moment(timestamp).format(HH_MM_A)}
                  onClick={async event => {
                    event.preventDefault();
                    event.nativeEvent.stopImmediatePropagation();
                    await forceDownloadFileFromUrl(attachment.file, attachment.name);
                  }}
                >
                  <span>{attachment.name}</span>
                  <svg
                    width="12"
                    height="13"
                    viewBox="0 0 12 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0)">
                      <path
                        d="M6.10547 7.48047C6.36436 7.48047 6.57422 7.27061 6.57422 7.01172V1.26953C6.57422 1.01064 6.36436 0.800781 6.10547 0.800781C5.84658 0.800781 5.63672 1.01064 5.63672 1.26953V7.01172C5.63672 7.27061 5.84658 7.48047 6.10547 7.48047Z"
                        fill="#044C5A"
                      />
                      <path
                        d="M1.60234 11.6012C1.60234 11.8221 1.87882 12.0012 2.21989 12.0012L9.7848 12.0012C10.1259 12.0012 10.4023 11.8221 10.4023 11.6012C10.4023 11.3803 10.1259 11.2012 9.7848 11.2012L2.21989 11.2012C1.87882 11.2012 1.60234 11.3803 1.60234 11.6012Z"
                        fill="#044C5A"
                      />
                      <path
                        d="M5.08529 9.40996C5.08609 9.41075 5.08686 9.41155 5.08766 9.41235C5.3619 9.68659 5.72209 9.82365 6.08228 9.82365C6.44218 9.82365 6.80204 9.68673 7.07575 9.413L9.67065 6.82822C9.85407 6.64553 9.85466 6.34874 9.67197 6.16532C9.48927 5.98192 9.19248 5.98131 9.00906 6.16401L6.4135 8.74944C6.32495 8.83797 6.20725 8.88674 6.08204 8.88674C5.95729 8.88674 5.83996 8.83834 5.75153 8.7504L3.20493 6.16703C3.02319 5.98265 2.72638 5.98054 2.54202 6.16227C2.35766 6.34401 2.35553 6.64079 2.53726 6.82518L5.08529 9.40996Z"
                        fill="#044C5A"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0">
                        <rect width="12" height="12.8" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </a>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

Sender.propTypes = {
  fullname: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  avatar: PropTypes.string,
  online: PropTypes.bool
};

Message.propTypes = {
  text: PropTypes.string,
  attachment: PropTypes.object,
  timestamp: PropTypes.string
};
