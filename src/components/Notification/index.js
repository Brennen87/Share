import * as React from 'react';
import * as classnames from 'classnames';
import { toast } from 'react-toastify';
import './index.scss';

const toastDefaultConfig = {
  autoClose: 4000,
  closeButton: false,
  hideProgressBar: true
};

class Notify {
  static info = (data, config) =>
    toast(<InfoToaster title={data.title} isInfo={data.isInfo} text={data.text} />, {
      ...toastDefaultConfig,
      ...config
    });
}

export default Notify;

export const InfoToaster = ({ isInfo, text, title }) => (
  <div className={classnames('toast_info', !isInfo && 'info', title && 'info_title')}>
    <div className="toast_info__inner">
      {title && <div className="toast_info__title">{title}</div>}
      <div className={classnames('toast_info__text', !title && 'toast_info__text-single')}>
        {text}
      </div>
    </div>
  </div>
);
