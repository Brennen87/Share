import * as React from 'react';
import * as classnames from 'classnames';
import './index.scss';

export const Stepper = ({ active, steps, complete, complete_green }) => {
  return (
    <div className="stepper">
      {steps.map((title, index) => (
        <div
          key={index}
          className={classnames(
            'stepper_circle',
            `stepper_circle__${index}`,
            active !== index && 'stepper_circle__disabled',
            active === index && 'stepper_circle__current',
            index < active && 'stepper_circle__passed',
            !!complete && 'stepper_circle__complete',
            !!complete_green && 'stepper_circle__complete_green'
          )}
          data-index={index + 1}
        >
          <span className="stepper_title">{title}</span>
        </div>
      ))}
    </div>
  );
};
