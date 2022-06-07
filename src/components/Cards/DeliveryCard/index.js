import * as React from 'react';
import * as classnames from 'classnames';
import Avatar from '../../Avatar';
import { Attachment } from '../../UI/Attachment';
import { forceDownloadFileFromUrl, nl2br } from '../../../helpers';
import SanitizedHTML from 'react-sanitized-html';
import moment from 'moment';
import { MM__DD_YYYY_HH_MM_A } from '../../../common/constants';
import './index.scss';

export const DeliveryCard = ({ vendor, message, attachments, datetime, className }) => {
  return (
    <div className={classnames('delivery_card', className)}>
      <div className="delivery_card__inner">
        <Avatar
          className="delivery_card__avatar"
          image={vendor.avatar}
          online={vendor.online}
          alt={vendor.full_name}
        />
        <div className="delivery_card__right">
          <div className="delivery_card__fullname">
            {vendor.full_name}
            <span>{moment(datetime).format(MM__DD_YYYY_HH_MM_A)}</span>
          </div>
          <div className="delivery_card__text">
            <SanitizedHTML allowedTags={['br']} html={nl2br(message)} />
          </div>
          <div className="delivery_card__attachments">
            {attachments.map(file => (
              <Attachment
                key={file.id}
                title={file.name}
                url={file.file}
                onDownload={() => forceDownloadFileFromUrl(file.file, file.name)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
