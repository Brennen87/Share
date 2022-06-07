import * as React from 'react';
import AccountInfoSection from '../../containers/Account/AccountInfoSection';
import AccountNotificationsSection from '../../containers/Account/AccountNotificationsSection';
import AccountPasswordSection from '../../containers/Account/AccountPasswordSection';
import AccountTypeSection from '../../containers/Account/AccountTypeSection';
import AccountDeleteSection from '../../containers/Account/AccountDeleteSection';
import DocumentTitle from '../../components/DocumentTitle';
import { PROJECT_CREATE_WARNING_TEXT } from '../../common/constants';
import { InfoBlockVertical } from '../../components/UI/InfoBlockVertical';
import './index.scss';

const AccountPage = ({ route }) => (
  <DocumentTitle title={route.pageTitle}>
    <div className="container">
      <div className="account_page">
        <div className="account_page__left">
          <AccountTypeSection />
          <AccountInfoSection />
          <AccountNotificationsSection />
          <AccountPasswordSection />
          <AccountDeleteSection />
        </div>
        <div className="account_page__right">
          <InfoBlockVertical
            hide
            title="Information on Stripe"
            text={
              <>
                We use Stripe to process payments on the Kuprik platform. Stripe processes charges on a Kuprik user's behalf. Although Kuprik initiates and manages the transactions, funds do not flow through the Kuprik platform itself but through Stripe. As a user of Kuprik, you do not need to have a separate account with Stripe.
                <br/><br/>
                Stripe has a legal obligation to know who the Kuprik users are. To comply with local KYC (Know Your Customer) requirements, Stripe requires certain information as a part of the onboarding process.
                <br/><br/>
                Therefore, to make/receive any payments on the Kuprik platform and avoid possible delays in processing transactions and payouts, you will need to fill out the <span className="account_page__right_font_italic">Account Type</span> information.
              </>
            }
            large={1080}
            className="account_page__banner"
          />
        </div>
      </div>
    </div>
  </DocumentTitle>
);

export default AccountPage;
