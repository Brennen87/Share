import * as React from 'react';
import * as classnames from 'classnames';
import './index.scss';

const ServiceCard = ({ service }) => {
  const { icon, alt, services } = service;
  const isSingle = services.length < 2;

  return (
    <div className="service_card">
      <div className="service_card__inner">
        <div className="service_card__icon">
          <img src={icon} alt={alt} />
        </div>
        <div className={classnames('service_card__row', isSingle && 'service_card__row_single')}>
          {services.map((serv, index) => (
            <div
              key={index}
              className={isSingle ? 'service_card__item' : `service_card__item_${index}`}
            >
              <div className="service_card__content">
                <div className="service_card__label">{serv.label}</div>
                <div className="service_card__description">{serv.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
