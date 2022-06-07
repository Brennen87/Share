import * as React from 'react';
import Button from '../../components/UI/Button';
import './index.scss';

const AccountDeactivatedPage = ({ history, location }) => {
  if (!location.state || location.state.deactivate) history.push('/home');
  return (
    <div className="container">
      <div className="account_remove_page">
        <div className="account_remove_page__content">
          <div className="account_remove_page__title">Account Deactivated</div>
          <p className="account_remove_page__text">
            Your account is successfully deleted. <br />
            We are sad to see you go. If you decide to rejoin Kuprik, we will be glad to have you
            back.
          </p>
          <div className="account_remove_page__button">
            <Button label="Log in" onClick={() => history.push('/login')} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountDeactivatedPage;
