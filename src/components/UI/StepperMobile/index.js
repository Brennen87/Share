import * as React from 'react';
import * as classnames from 'classnames';
import './index.scss';

export const StepperMobile = ({ active, steps, complete, complete_green }) => {
  return (
    <div className="stepper_mobile">
      {steps.map((title, index) => (
        <div
          key={index}
          className={classnames(
            'stepper_mobile_circle',
            `stepper_mobile_circle__${index}`,
            active !== index && 'stepper_mobile_circle__disabled',
            active === index && 'stepper_mobile_circle__current',
            index < active && 'stepper_mobile_circle__passed',
            !!complete && 'stepper_mobile_circle__complete',
            !!complete_green && 'stepper_circle__complete_green'
          )}
          data-index={index + 1}
        >
          <span className="stepper_mobile_title">{title}</span>
        </div>
      ))}
    </div>
  );
};
