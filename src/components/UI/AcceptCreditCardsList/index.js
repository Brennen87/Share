import * as React from 'react';
import * as classnames from 'classnames';
import './index.scss';

const CARDS = ['visa', 'master', 'amex', 'discover'];

export const AcceptCreditCardsList = ({ className }) => {
  return (
    <div className={classnames('accept_cc_list', className)}>
      {CARDS.map(card => (
        <div key={card} className={classnames('accept_cc_card', `accept_cc_card__${card}`)} />
      ))}
    </div>
  );
};
