import * as React from 'react';
import './index.scss';

export const CounterBadge = ({ count }) =>
  !!count && (
    <div className="counter_badge">
      <span className="counter_badge__text">{count}</span>
    </div>
  );
