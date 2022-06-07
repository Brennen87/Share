import * as React from 'react';
import * as classnames from 'classnames';
import { withRouter } from 'react-router';
import Button from '../../../components/UI/Button';
import './index.scss';

class StatusBox extends React.Component {
  render() {
    const { success, history } = this.props;
    return (
      <div className={classnames('pr_status_box', !success && 'pr_status_box_fail')}>
        <div className="pr_status_box__inner">
          <div className="pr_status_box__title">{success ? 'Success' : 'Error'}</div>
          <div className="pr_status_box__description">
            {success
              ? 'Your project has been successfully created.'
              : 'Something went wrong. Please try again.'}
          </div>
          <Button
            label={success ? 'Go to Projects' : 'Try Again'}
            className="pr_status_box__button"
            onClick={() => {
              success ? history.push('/projects') : window.location.reload();
            }}
          />
        </div>
      </div>
    );
  }
}

export default withRouter(StatusBox);
