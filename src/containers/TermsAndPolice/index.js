import React from 'react';
import { withRouter } from 'react-router';
import TermsAndPoliceMenu from '../../components/TermsAndPoliceMenu';
import { POLICY } from '../../common/constants';
import './index.scss';

const TermsAndPolice = props => {
  const path = props.history.location.pathname;
  const isTerms = path === '/terms';
  const isPolicy = path === '/policy';

  return (
    <div className="terms_and_police">
      <div className="terms_and_police__content">
        <div className="terms_and_police_menu">
          <TermsAndPoliceMenu />
        </div>
        <div className="terms_and_police_main">
          {isPolicy && <PolicySection />}
          {isTerms && <TermsSection />}
        </div>
      </div>
    </div>
  );
};

export default withRouter(TermsAndPolice);

const PolicySection = () => {
  return (
    <div className="terms_and_police_section">
      <div className="terms_and_police_section__header">
        <h1>PRIVACY POLICY</h1>
        <span>Last Updated April 25, 2021</span>
      </div>
      <div className="terms_and_police_section__content">
        <h3 className="terms_and_police_section__content_weight_normal">Welcome to Kuprik!</h3>
        <p>
          We know you value your privacy, which is why we are providing this Privacy Policy
          (“Privacy Policy”) to help explain the types of information Kuprik LLC (“Kuprik,” “we,”
          “us,” “our”) collects, uses, and shares about you when you visit or use kuprik.com (the
          “Platform”) or any of the services offered on the Platform (the “Services”). Please read
          this Privacy Policy carefully as it explains your and our rights and obligations over your
          information. By accessing and using our Platform or any of our Services, you acknowledge
          you have read and understood this Policy.
        </p>
        <p>
          If you reside in the European Economic Area (“EEA”), you may have additional data rights.
          Please refer to the “EU Data Rights” section below. The data controller for the personal
          information governed by this Privacy Policy is Kuprik LLC, with mailing address of 607
          Foothill Blvd, PO Box 1120, La Canada Flintridge, CA 91011, USA
        </p>
        <br />

        <h3>1. Personal Information We Collect</h3>
        <p>
          We collect certain information about you when you visit or use our Platform or our
          Services. This information may personally identify you or have the potential to personally
          identify you (“Personal Information”). In this section, we describe the Personal
          Information we may collect about you and the sources of that information.
        </p>

        <h4>Information We May Collect</h4>
        <ul>
          <li>
            Identifiers: We may collect your full name, email address, physical address, phone
            number, IP Address, device ID, or other similar identifiers. We may also collect any
            other Personal Information that you provide to us, such as social media identifiers,
            language preference, or website URL.
          </li>
          <li>
            Internet or Other Electronic Network Activity Information: We may collect information
            regarding your interaction with the Services, including time of visit and geolocation
            data, pages visited, links clicked, emails opened, language preferences, and the pages
            that led or referred you to our Services. We may also collect information automatically
            from your device, such as device type, operating system and Internet browser type,
            screen resolution, operating system name and version, device manufacturer and model,
            language, plug-ins, and add-ons.
          </li>
          <li>
            Geolocation Data: We may collect your physical location or infer your physical location
            based on your IP address, mailing address, or other network or voluntarily provided
            information.
          </li>
          <li>
            Commercial Information: We may collect information about the products or services you
            have purchased, obtained, or considered from us.
          </li>
          <li>
            Payment Information: In order to process your order, we collect credit card information,
            bank account number, or other payment information.
          </li>
          <li>
            Professional or Employment-related Information: We may collect job-related information
            from you, such as your title or occupation, company name, business type or description,
            or website. You provide this Personal Information in your User Account, profile, through
            your voluntary communications with us, by providing contact or payment information (such
            as your email address or company credit card), or by responding to an email, newsletter,
            or survey.
          </li>
        </ul>

        <p>
          You may refuse to provide, or request that we delete, certain categories of Personal
          Information we have about you. However, if our collection of the Personal Information is
          required by law or contract or is necessary for you to access or use the Services, we may
          be unable to provide the Services to you.
        </p>

        <h4>Sources of Your Personal Information</h4>
        <ul>
          <li>
            We may automatically collect certain information about the computer or other devices
            that you use to access the Services, including mobile devices, through commonly used
            information-gathering tools, such as cookies and web beacons (more information is in our
            Cookies section below).
          </li>
          <li>
            You provide some Personal Information to us directly. For example, you provide
            Identifiers (such as name, email address, phone number, and billing address) and Payment
            Information (such as credit card information or bank account information) when you
            register for a User Account.
          </li>
          <li>
            We may generate information about you based on our relationship with you or your use of
            the Services. Such information may be aggregated or anonymized before we process it.
          </li>
          <li>
            Third parties or public sources may provide us with certain Personal Information. For
            example, we may collect Personal Information from publicly accessible social media
            profiles and posts, private third parties, law enforcement, or public sources.
          </li>
        </ul>
        <br />

        <h3>2. How We Use Your Personal Information</h3>
        <p>
          This section describes the purposes for which we process your Personal Information. We
          process your Personal Information:
        </p>
        <ul>
          <li>
            To perform our contractual obligations to you. This includes but is not limited to
            providing you access to the Services and, specifically, the Platform; processing
            customer service requests; sending you order confirmations and updates; processing
            payment transactions; and performing our contractual obligations to you under our Terms
            of Use.
          </li>
          <li>
            For legitimate business interests which outweigh the general privacy rights of
            individual data subjects. This includes but is not limited to analyzing and improving
            our Services and business operations; ensuring the security and availability of the
            Services; and monitoring use of the Platform to prevent fraud or abuse.
          </li>
          <li>
            To comply with a legal obligation or requirement. We use and process your Personal
            Information when we believe doing so is necessary to comply with laws and regulations,
            pursuant to a judicial authorization, or to exercise or defend our legal rights or those
            of a third party.
          </li>
          <li>
            With your consent. We process your Personal Information if we obtained your affirmative
            consent to such processing, such as to send you our newsletter and other marketing
            communications that you requested, or to respond to inquiries and questions that you
            initiated.
          </li>
        </ul>
        <p>
          If we need to process your Personal Information for a purpose other than that for which
          the information was initially collected, we will provide you with information about that
          other purpose before we further process your Personal Information.
        </p>
        <br />

        <h3>3. How Your Personal Information Is Shared and Disclosed </h3>
        <p>
          We understand that you entrust us with your Personal Information, which is why we try to
          be transparent about if and when we share your Personal Information with other Users,
          third parties, or our business partners. Here are the reasons why we may share your
          Personal Information with third parties:
        </p>
        <ul>
          <li>
            To provide the Services to you and operate our business. We share Personal Information
            with a limited number of service providers or agents who process it on our behalf to
            provide or improve our business functions, and who have agreed to privacy restrictions
            similar to the ones in our Privacy Policy by making similar commitments. We ensure that
            the third-party service providers who process your data also comply with the GDPR.
            <ul>
              <li>
                We use Stripe for payment processing, and we share certain Personal Information with
                Stripe when you initiate a payment transaction via the Platform. This Personal
                Information may include your name, phone number, company name, tax ID, date of
                birth, SSN, bank account information or credit card information, and transaction
                details. You should read Stripe’s Privacy Policy to learn more about how Stripe uses
                and protects your Personal Information. Your use of Stripe is subject to our Terms
                of Use and the Stripe Recipient Agreement.
              </li>
            </ul>
          </li>
          <li>
            For legal disclosure. We may share your information with third parties when we
            reasonably believe disclosure is required or permitted in order to comply with a
            subpoena, court order or other applicable law, regulation or legal process.
          </li>
          <li>
            To protect us or others. We may share your information to the extent we believe that
            sharing such information is necessary to protect the rights, property, or safety of us,
            our products or services, our customers, or others.
          </li>
          <li>
            As aggregate information. We may share certain aggregated, non-personally identifying
            information internally or with others for purposes of research, reporting, and
            benchmarking.
          </li>
          <li>
            As a result of merger or sale of our business. We may share Personal Information if we
            are involved in a merger, sale, financing, liquidation, bankruptcy or acquisition of
            corporate entities or business units.
          </li>
          <li>
            With your consent. We share your Personal Information if you affirmatively consent to
            it. If we are legally obligated to obtain your consent prior to sharing your Personal
            Information, we notify you of the specific purpose for which we are obtaining your
            consent, and we do not share beyond that purpose without notifying you of and obtaining
            additional consent for further disclosure.
          </li>
        </ul>
        <p>We do not sell any Personal Information for any reason.</p>
        <p>
          Please note that if you choose to post your Personal Information to publicly-accessible
          areas of the Platform, your Personal Information may be seen, copied, or downloaded by
          anyone on or off the Platform. This includes Personal Information in your account profile.
          We have no control over what anyone else does with your Personal Information if you post
          it publicly.
        </p>
        <br />

        <h3>4. Access and Control of Your Personal Information</h3>
        <p>
          Kuprik provides you with certain choices over your Personal Information. You may access,
          update, alter, or delete some of the Personal Information we have about you by contacting
          us using the information provided in the “Contact Information” section below. Please note
          that we may be unable to respond to a request if we cannot verify that you are the owner
          of the Personal Information, if deletion of your Personal Information is technically
          infeasible, or if we need to retain your Personal Information to comply with our legal
          obligations.
        </p>
        <p>
          EU residents may have additional rights. Please refer to the EU Data Rights section below.
        </p>
        <br />

        <h3>5. How We Retain Your Personal Information</h3>
        <p>
          In general, we retain your Personal Information according to applicable laws or regulatory
          requirements and keep it as long as is necessary to fulfill the purposes described in this
          Privacy Policy or for which the personal data was collected. If you have questions about
          the Personal Information that we retain about you, please contact us using the Contact
          Information provided below.
        </p>
        <p>
          As we describe in our Terms of Use, we may but have no contractual obligation to retain
          your Personal Information or any content you submit to the Platform for any specific
          length of time, although we may retain certain information to comply with our legal
          obligations.
        </p>
        <br />

        <h3>6. Data Security</h3>
        <p>
          While no online service is 100% secure, and we make no guarantee about the security of
          your Personal Information, we work to protect information about you against unauthorized
          access, use, alteration, or destruction, and take reasonable measures to do so. We monitor
          our Services for potential vulnerabilities and attacks, and we use a variety of security
          technologies and organizational procedures to help protect your personal data from
          unauthorized access, use, or disclosure. We also limit access to your Personal Information
          to those personnel and service providers with a need to know in order to perform job
          duties for us.
        </p>
        <br />

        <h3>7. Children’s Privacy</h3>
        <p>
          The Services are not intended for children under the age of 13 (“Children”), and we do not
          knowingly collect the Personal Information of Children. If you are a parent or guardian
          and believe we have collected information about any child, please contact us using the
          Contact Information provided in this Privacy Policy. We will take steps to delete the
          information as soon as possible.
        </p>
        <br />

        <h3>8. Do Not Track Disclosure</h3>
        <p>
          We are committed to providing you with meaningful choices about the information we collect
          on the Services, and that is why we provide the access and control choices set forth in
          this Privacy Policy. However, we do not recognize or respond to browser-initiated Do Not
          Track (“DNT”) signals, in part because no common industry standard for DNT has been
          adopted by industry groups, technology companies, or regulators, nor is there a consistent
          standard of interpreting user intent.
        </p>
        <br />

        <h3>9. Third Party Links</h3>
        <p>
          We may provide content on the Services that links to third-party websites. For example, we
          may post links to our social media profiles so you can find us easily, or to outside
          resources with information we think may be useful or relevant to your business or use of
          the Services. This Privacy Policy does not apply to third-party websites, content,
          products, or services, even if they link to or from our Services or Platform. We do not
          control, and are not responsible for, third parties’ privacy practices and content. When
          you visit a third-party site, the third party may collect your Personal Information, which
          will be governed by the third party’s privacy policy. Please read the third party’s
          privacy policy to learn about how they collect and process your personal information.
        </p>
        <br />

        <h3>10. EU Data Rights </h3>
        <p>
          EU residents may have additional rights under applicable data protection laws, including
          the EU General Data Protection Regulation (GDPR), which include the rights to:
        </p>
        <ul>
          <li>Request access to and obtain a copy of your Personal Information;</li>
          <li>
            Request correction of incorrect or inaccurate Personal Information you have provided;
          </li>
          <li>
            Request erasure of Personal Information that we no longer need to fulfill the purposes
            for which it was collected or that no longer serves our other legitimate interests;
          </li>
          <li>Object to or restrict the processing of your Personal Information;</li>
          <li>Request transfer of your Personal Information to a third party, or to you; </li>
          <li>Not be subject to a decision based solely on automated processing; and</li>
          <li>
            Withdraw consent to process your Personal Information that we process on the basis of
            consent. Please note however that this will not affect the lawfulness of the processing
            before you withdraw consent.
          </li>
        </ul>
        <p>
          You may request to exercise any of the rights above by contacting us using the information
          in the Contact Information section below. We may ask you to provide information to verify
          your identity and right to access the information in your request. We will consider and
          act upon any such requests in accordance with applicable data protection laws.
        </p>

        <h4>Legal Bases for Processing</h4>
        <p>The legal bases we rely on for processing your Personal Information are:</p>
        <ul>
          <li>
            To perform a contract, such as to fulfill our obligations under our Terms of Use or
            process your transactions via the Platform;{' '}
          </li>
          <li>To comply with a legal obligation;</li>
          <li>
            For legitimate interests which are not overridden by your data protection interests; and
          </li>
          <li>With your consent. </li>
        </ul>
        <p>
          If you have complaints or disputes about this Privacy Policy or our privacy practices,
          please contact us using the Contact Information provided below. We will respond to your
          complaint in the time period required by applicable law. You may also have a right to
          lodge a complaint with your local data protection authority (DPA).
        </p>
        <br />

        <h3>11. International Data Transfers </h3>
        <p>
          Our Services may operate on servers located within the United States. If you access or use
          our Services from the European Union or other regions of the world with data protection
          laws that differ from United States law, then you acknowledge and consent to the transfer
          of your Personal Information to the United States for the purposes of providing the
          Services and performing our obligations to you under our Terms of Use, and for any other
          purpose for which you provide explicit, informed consent.
        </p>
        <p>
          We may transfer Personal Information we have collected about you to a third-party data
          processor located in countries outside of the European Economic Area (“EEA”), in
          accordance with and as permitted by applicable laws and regulations. This is necessary for
          the purposes described in the How We Use Your Personal Information section above. When
          providing information about you to entities outside the EEA, we will take appropriate
          measures to ensure that those entities protect your Personal Information in accordance
          with this Privacy Policy as required by applicable law.
        </p>
        <br />

        <h3>12. Cookies Policy</h3>
        <p>
          Cookies are small text files that are stored in a web browser’s memory. Cookies help us
          remember your preferences and that you have already logged in, and they help us analyze
          how you use the Platform so we can improve the Services. This Cookies Policy explains how
          we use cookies and other similar technologies to help us ensure that our Services function
          properly, prevent fraud and other harm, and analyze and improve the Services in accordance
          with our Privacy Policy. Any capitalized term used and not otherwise defined below has the
          meaning assigned to it in the Privacy Policy.
        </p>

        <h4>How We Use Cookies</h4>
        <p>
          Cookies help us personalize the Services and offer an effective and safe Platform. We
          update our cookies periodically, but we generally use cookies for the following purposes:
        </p>
        <ul>
          <li>
            To operate the Services. We use cookies for functions such as authentication, fraud
            prevention and detection, and site features and preferences.
          </li>
          <li>
            To analyze and improve the Services. We use cookies to understand how you use the
            Platform and the Services so that we can improve your user experience.
          </li>
          <li>
            For better advertising. We use cookies to help us deliver more relevant ads to you.
          </li>
        </ul>

        <h4>How You Can Manage Cookies</h4>
        <p>
          Your web browser may allow you to control the cookies we and other websites set on your
          computer. Please consult the help section of your web browser for more information on how
          to delete cookies. However, note that if you choose to delete or disable cookies, we may
          be unable to provide the Platform and the Services to you.
        </p>

        <h4>Cookie List</h4>
        <p>
          Cookies that we commonly use are listed below. This list is not exhaustive but describes
          the main reasons we typically set cookies.
        </p>
        <table className="terms_and_police_section__table">
          <thead>
            <tr>
              <th>Domain</th>
              <th>First Or Third Party</th>
              <th>Cookie Name</th>
              <th>Cookie Type</th>
              <th>Description</th>
              <th>Expiration</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="terms_and_police_section__table_align_center_padding_medium">
                .kuprik.com
              </td>
              <td className="terms_and_police_section__table_align_center_padding_medium">
                Third party
              </td>
              <td className="terms_and_police_section__table_align_center_padding_medium">
                _stripe_mid
              </td>
              <td className="terms_and_police_section__table_align_center_padding_medium">
                Essensial
              </td>
              <td className="terms_and_police_section__table_align_start">
                Stripe is used to make credit card payments in our application. Stripe uses this
                cookie to remember who you are and process payments without storing any credit card
                information on our servers.
              </td>
              <td className="terms_and_police_section__table_align_center_padding_medium">
                1 year
              </td>
            </tr>
            <tr>
              <td className="terms_and_police_section__table_align_center_padding_medium">
                .kuprik.com
              </td>
              <td className="terms_and_police_section__table_align_center_padding_medium">
                Third party
              </td>
              <td className="terms_and_police_section__table_align_center_padding_medium">
                _stripe_sid
              </td>
              <td className="terms_and_police_section__table_align_center_padding_medium">
                Essential
              </td>
              <td className="terms_and_police_section__table_align_start">
                Stripe is used to make credit card payments in our application. Stripe uses this
                cookie to remember who you are and process payments without storing any credit card
                information on our servers.
              </td>
              <td className="terms_and_police_section__table_align_center_padding_medium">
                30 minutes
              </td>
            </tr>
            <tr>
              <td className="terms_and_police_section__table_align_center_padding_medium">
                .kuprik.com
              </td>
              <td className="terms_and_police_section__table_align_center_padding_medium">
                Third party
              </td>
              <td className="terms_and_police_section__table_align_center_padding_medium">
                _ga _gid _gat
              </td>
              <td className="terms_and_police_section__table_align_center_padding_medium">
                Analytical
              </td>
              <td className="terms_and_police_section__table_align_start terms_and_police_section__table_long">
                Used by Google Analytics to collect anonymous information about how visitors use our
                website. We use the information to compile reports and help us improve our website.
                The information collected is anonymous and includes the number of visitors to the
                website, what pages they visited and where they have come to the website from. More
                information is available here:{' '}
                {`https://developers.google.com/analytics/devguides/collection/analyticsjs/cookie-usage`}
              </td>
              <td></td>
            </tr>
          </tbody>
        </table>
        <br />

        <h3>13. Contact Information</h3>
        <p>Kuprik LLC</p>
        <p class="terms_and_police_section__info_footer">
          The best way to contact us is through email. Company contacts:{' '}
          <span className="terms_and_police_section__content_color_blue">admin@kuprik.com</span> or{' '}
          <span className="terms_and_police_section__content_color_blue">support@kuprik.com</span>.
          <br />
          Founder and CEO contact: Ugulay Sloan at{' '}
          <span className="terms_and_police_section__content_color_blue">
            ugulaysloan@kuprik.com
          </span>
          .<br />
          Mailing address: 607 Foothill Blvd, PO Box 1120, La Canada Flintridge, CA 91011, USA
        </p>
        <br />

        <h3>14. Changes to this Privacy Policy</h3>
        <p>
          We will provide you with notice of changes to the way we process your Personal Information
          and will obtain your consent as required by applicable law. All changes are effective
          immediately upon posting a notice of such changes. Your continued access to or use of the
          Services following the posting of changes constitutes your acknowledgment of such changes.
          You can see when this Privacy Policy was last updated by checking the “Last Updated” date
          displayed at the beginning of this Privacy Policy.
        </p>
      </div>
    </div>
  );
};

// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

const TermsSection = () => {
  return (
    <div className="terms_and_police_section">
      <div className="terms_and_police_section__header">
        <h1>TERMS OF SERVICE</h1>
        <span>Last Updated April 25, 2021</span>
      </div>
      <div className="terms_and_police_section__content">
        <h3 className="terms_and_police_section__content_weight_normal">Welcome to Kuprik!</h3>
        <p>
          These Terms of Service (“Terms of Service” or “Terms”) are a binding agreement between you
          and Kuprik LLC (“Kuprik,” “we” or “us”) that govern your access to and use of the Kuprik
          platform (the “Platform”), including any content, functionality or services offered on or
          through the Platform (together, the foregoing are referred to as the “Services”). By using
          the Services, registering for an account on the Platform, or by clicking to accept or
          agree to these Terms of Service, you accept and agree to be bound and abide by these Terms
          of Service, our Privacy Policy, and any other guidelines, rules, or policies expressly
          incorporated into these Terms. If you do not or are unable to agree to these Terms of
          Service or the Privacy Policy, you must not access or use the Services.
        </p>
        <p>
          PLEASE READ THESE TERMS OF SERVICE CAREFULLY BECAUSE THEY CONTAIN IMPORTANT INFORMATION
          ABOUT YOUR LEGAL RIGHTS, REMEDIES, AND OBLIGATIONS, INCLUDING BUT NOT LIMITED TO A BINDING
          ARBITRATION AGREEMENT AND CLASS ACTION WAIVER.
        </p>
        <p>
          If you are using the Platform on behalf of a third party (such as your company, employer,
          or agency), you represent and warrant that you have the authority to bind that third party
          to these Terms. You accept these Terms on your own behalf and on behalf of that third
          party, and any reference to “you” or “your” in these Terms will mean both you and that
          third party.
        </p>
        <p>
          We may, in our sole discretion, update these Terms of Service at any time. We will notify
          you of material changes by notification on the Platform and/or by sending you an email.
          The Effective Date of these Terms of Service will be posted at the top of this page. Your
          continued access to or use of the Platform or the Services after the Effective Date
          constitutes your agreement to be bound by the then-current Terms of Service. If you do not
          accept the revised Terms of Service, you must not access or use any of the Services after
          the Effective Date.
        </p>
        <br />

        <h3>1. User Accounts</h3>
        <h4>1.1 Account Registration and Eligibility</h4>
        <p>
          To use the Platform as a Customer or Vendor (each, a “User”), you must register for a
          Platform account using a valid email address (“User Account”). You agree not to maintain
          or register more than one User Account without our express permission. We may suspend,
          terminate, or delete any User Account that we believe is a duplicate User Account or
          violates these Terms. As used herein, a “Customer” is an authorized User who uses the
          Platform to search for and purchase services and deliverables (“Deliverables”) from
          Vendors; and a “Vendor” is an authorized User who uses the Platform to offer or provide
          services and deliver agreed-upon Deliverables (“Vendor Services”) to Customers.
        </p>
        <p>
          If you register for a User Account or use the Services, you agree and represent that you:
          (a) are a business entity (either a sole proprietor at least the age of majority in your
          jurisdiction, or another legal entity, such as a corporation or limited liability company)
          and have full legal capacity to enter into binding contracts; (b) are authorized to act
          for and bind yourself and the legal entity on whose behalf you are using the Services, if
          applicable; (c) will comply with all laws, rules, and regulations, including but not
          limited to licensing or other professional certification requirements, applicable to your
          use of the Platform and offering or performance of Vendor Services; and (d) will submit
          only true, accurate, current, complete, and lawful information to the Services.
        </p>
        <p>
          When you register a User Account on the Platform, you must provide information to describe
          or identify your business and/or services (a “Profile”). Your Profile may be visible to
          other Users and to the public. You accept full responsibility for any information you
          provide to the Platform, including your Profile information. If you do not want
          information to be publicly visible, do not post it to your Profile. We handle the personal
          information you share with us in accordance with applicable law and our Privacy Policy,
          which is incorporated into these Terms of Service.
        </p>
        <p>
          We may, in our sole discretion, for any or no reason and without penalty or notice, deny,
          suspend, or terminate your User Account, or discontinue providing access to all or any
          part of the Services. If we terminate your User Account or your right to use the Services,
          you agree that we will not be liable to you or any third party for any such termination.
        </p>
        <p>
          Kuprik makes no representations that the Services are appropriate or available for use
          outside of the United States. If you access or use the Services outside of the United
          States, you do so at your own risk, and you will be solely responsible for your compliance
          with all applicable foreign, United States, state, and local laws and regulations.
        </p>

        <h4>1.2 Security and Confidentiality of Account Credentials </h4>
        <p>
          When you register for a User Account, you must provide a valid email address and create a
          password (“User Account Credentials”). You cannot share, transfer, or assign your User
          Account Credentials, and any attempted transfer or assignment is void. You are solely
          responsible for maintaining the accuracy, truthfulness, completeness, and confidentiality
          of your User Account Credentials, and you accept responsibility for all activities that
          occur under your User Account Credentials. If you have reason to believe that your User
          Account is no longer secure (e.g., in the event of loss, theft, or unauthorized disclosure
          or use of your User Account Credentials), you agree to immediately notify Kuprik. You may
          be liable for any losses we or others incur as a result of unauthorized use of your User
          Account Credentials.
        </p>

        <h4>1.3 Information Verification</h4>
        <p>
          Upon registration of a User Account, Kuprik will request additional information from each
          Vendor to verify the information you have submitted to the Services. You agree to promptly
          respond to reasonable requests by Kuprik for information about yourself and your business,
          such as government-issued identification or other legal documents and verification. You
          authorize Kuprik to verify the information you have provided to us and obtain additional
          background information about you and your business, whether directly or through a third
          party. While we verify your information, we may restrict or suspend your access to the
          Platform and Services. If we find that the information you have submitted to the Services
          is incomplete, untruthful, inaccurate, unlawful, or otherwise violates these Terms, we may
          deny you registration and/or permanently terminate your User Account.
        </p>
        <p>
          You understand and agree that, although Kuprik may verify certain information about
          Vendors for internal business purposes, this internal verification is not, and will not be
          deemed to be, a representation or guarantee about any User or information on the Services.
        </p>
        <p>
          Whether you are a Customer or a Vendor, you agree to fully cooperate with any reasonable
          requests for information, documentation, records, or assistance by Kuprik in connection
          with your use of the Platform or the Services, and so we can verify your compliance with
          these Terms.
        </p>
        <br />

        <h3>2. Kuprik Services</h3>
        <h4>2.1 Use of the Platform</h4>
        <p>
          Kuprik makes the Platform and the Services available for use by Vendors to offer Vendor
          Services, and by Customers to search for Vendor Services and contract with Vendors. You
          can learn more about how to use the Platform by referring to the Kuprik Service Flow and
          Rules for Customers and Vendors, which are expressly incorporated into these Terms. You
          acknowledge and agree that your right to use the Platform and the Services is
          automatically revoked if you attempt to use the Platform or Services for any other
          purpose.
        </p>

        <h4>2.2 Fees</h4>
        <p>
          In connection with their use of the Services, Vendors will pay Kuprik the fees (“Service
          Fees”) as set forth in the Kuprik Fees Schedule. The Service Fees are paid solely by
          Vendors. Subject to Kuprik’s right to withhold, chargeback, retain, or recoup any amounts
          under these Terms, when funds related to a Project Contract are released by the Customer,
          Kuprik will credit the Vendor for the amount paid or released by the Customer after
          subtracting any applicable Service Fees. Each Vendor irrevocably authorizes and instructs
          Kuprik to deduct the Service Fees from the Project Price and pay Kuprik on Vendor’s
          behalf. Kuprik reserves the right to change the Service Fees from time to time or at any
          time by revising the Fees Schedule.
        </p>

        <table className="terms_and_police_section__table">
          <thead>
            <tr>
              <th>Earnings</th>
              <th>Fees</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="terms_and_police_section__table_align_center_padding_small">
                $0 to $1,000
              </td>
              <td className="terms_and_police_section__table_align_center_padding_small">19%</td>
            </tr>
            <tr>
              <td className="terms_and_police_section__table_align_center_padding_small">
                $1,001 to $10,000
              </td>
              <td className="terms_and_police_section__table_align_center_padding_small">17%</td>
            </tr>
            <tr>
              <td className="terms_and_police_section__table_align_center_padding_small">
                $10,001 +
              </td>
              <td className="terms_and_police_section__table_align_center_padding_small">15%</td>
            </tr>
          </tbody>
        </table>
        <br />

        <h3>3. Project Contracts</h3>
        <p>
          The Platform and the Services offer an online marketplace where Customers and Vendors can
          find each other and enter into a contract for Vendor Services (a “Project Contract”). This
          Section 3 describes the terms and conditions that apply to Project Contracts and the
          relationship between Customers and Vendors.
        </p>

        <h4>3.1 Project Contract Terms</h4>
        <p>
          A Customer creates a Project Contract by (a) sending terms to a Vendor for the purchase
          and delivery of Vendor Services (a “Project”), including Due Date, Scope, and Quality
          requirements; and (b) paying for the mutually agreed-upon deposit amount (“Initial
          Payment”) to the Vendor for the Vendor Services. As used herein, “Due Date” means the date
          specified in the Project Contract by which a Deliverable must be submitted to the
          Customer; “Quality” means the extent to which Vendor Services or a Deliverable delivered
          under a Project Contract meet the requirements specified in a Project’s Scope; and “Scope”
          means the defined features and requirements of a Project and any Deliverables, including
          the features and specifications the Deliverables must meet to comply with a Customer’s
          requirements.
        </p>
        <p>
          Once a Project Contract is created, the Vendor and Customer will have entered into a
          legally binding contract under which the Customer agrees to purchase, and the Vendor
          agrees to deliver, the Vendor Services and any deliverables specified in the Project
          Contract for the agreed-upon total Project Price (the “Project Price”). You agree not to
          enter into any contractual provisions in conflict with your obligations under a Project
          Contract.
        </p>
        <p>
          You acknowledge and agree that a Project Contract is a contract directly between a
          Customer and Vendor, and the Customer and Vendor are solely responsible for determining
          the terms of a Project Contract. Kuprik is not a party to any Project Contract, and Kuprik
          does not determine the terms of any Project Contract and, notwithstanding anything to the
          contrary herein, Kuprik has no obligation to enforce any Project Contract. Nothing in
          these Terms of Service or any Project Contract will create or be deemed to create an
          employment, agency, joint venture, or partnership relationship between Kuprik and any
          User.
        </p>

        <h4>3.1.1. Confidentiality</h4>
        <p>
          For some Projects, a Vendor and Customer may need to share Confidential Information with
          each other. Unless a Vendor and Customer expressly agree to different terms regarding
          Confidential Information in a Project Contract, they each agree to: (a) maintain all such
          Confidential Information in strict confidence and protect such Confidential Information
          from unauthorized use and disclosure; (b) not disclose the disclosing User’s Confidential
          Information to any third parties without the disclosing User’s prior written consent; (c)
          use the Confidential Information only for the purposes of delivering or receiving the
          Vendor Services and/or Project Deliverables; (d) not copy or reproduce any of the
          Confidential Information without the disclosing User’s permission; and (e) immediately
          notify the disclosing User in the event the receiving User becomes aware of any loss or
          unauthorized disclosure of the Confidential Information. If a disclosing User requests
          return or destruction of its Confidential Information, the receiving User will promptly
          comply. To the extent it is not overridden by an express term in a Project Contract, a
          User’s confidentiality obligation as described herein will be a material term of a Project
          Contract. “Confidential Information” means any content, data, files, designs, plans, or
          other information provided to, or created by, a User in connection with performing or
          receiving Vendor Services under a Project Contract, whether the information is in
          tangible, electronic, verbal, graphic, visual, or other form, and which the disclosing
          User has designated as “confidential,” or which the receiving User should reasonably know
          is confidential based on its context or nature or the circumstances of disclosure.
          Confidential Information does not include material or information that: (a) was already
          known to the receiving User without restriction on use or disclosure prior to receipt of
          such Confidential Information; (b) was or is independently developed by the receiving User
          without use of any of the disclosing User’s Confidential Information; (c) was or becomes
          generally known by the public other than by disclosure of the receiving User; or (d) was
          received by the receiving User from a third party who was not, at the time of such
          disclosure, under any obligation to the disclosing User or any other person to maintain
          the confidentiality of such information.
        </p>

        <h4>3.1.2. Work Product Ownership</h4>
        <p>
          Unless a Customer and Vendor expressly agree to different terms governing the ownership of
          Deliverables in a Project Contract, this provision is incorporated into any Project
          Contract. When a Customer pays and a Vendor receives full payment of the Project Price
          from the Customer, the Customer will be considered the sole and exclusive author and owner
          of the Deliverables, including, but not limited to, all Intellectual Property Rights in
          the Deliverables. If a Vendor retains any Intellectual Property Rights in any Deliverables
          after receiving full payment from a Customer, the Vendor hereby irrevocably assigns to the
          Customer all rights, title, and interest, including Intellectual Property Rights, now or
          hereafter existing in the Deliverables, throughout the universe in perpetuity and in all
          media now known or hereafter developed. “Intellectual Property Rights” means patents,
          trademarks, service marks, trade dress, trade names, design rights, copyright (including
          moral rights and mask works), database rights, trade secrets and other know-how rights and
          rights in confidential or proprietary information, whether registered or unregistered,
          including applications for the grant of any of the foregoing, whether in existence now or
          hereafter in the future, and all rights or forms of protection having equivalent or
          similar effect to any of the foregoing which may subsist anywhere in the world.
        </p>
        <p>
          A Vendor will retain ownership of all Intellectual Property Rights to any invention, work
          product, or other material that has been or is created, conceived, or reduced to practice
          by the Vendor independently of the Project Contract (“Vendor IP”). A Vendor must disclose
          to the Customer any Vendor IP that it plans to incorporate into a Deliverable before
          beginning work on a Project Contract. If a Vendor does not disclose any Vendor IP to the
          Customer, then the Vendor agrees not to assert any right, title, or interest in or to any
          Deliverable or part thereof after receiving full payment for the Deliverable from the
          Customer.
        </p>
        <p>
          Vendor represents and warrants that the Vendor Services, including any Deliverables, and
          the use of the Vendor Services by the Customer, do not and will not misappropriate,
          infringe, or violate any rights of any third party. After receiving full payment for
          Vendor Services, including any Deliverables, Vendor further agrees not sell, use, publish,
          display, distribute, reproduce, or otherwise exploit the Deliverables (excluding Vendor
          IP) in any way, or claim any ownership of or involved in the creation of the Deliverables.
        </p>

        <h4>3.2 Project Contract Extensions </h4>
        <p>
          Customer and Vendor have the option of agreeing to extend a Project Contract up to 3
          times, not to exceed 6 months in total, under a single Project Contract. If Customer and
          Vendor anticipate that a Project Contract will last longer than 6 months, you may break
          the Project into multiple shorter projects. By agreeing to extend any Project Contract,
          Vendor and Customer agree that the extension will be a modification of the Project
          Contract.
        </p>

        <h4>3.3 Cancellations, Refunds and Payments</h4>
        <table className="terms_and_police_section__table">
          <thead>
            <tr>
              <th></th>
              <th>Cancellation by Customer</th>
              <th>Cancellation by Vendor</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td className="terms_and_police_section__table_align_center_padding_medium text_bold">
                Before acceptance of the Deliverables
              </td>
              <td className="terms_and_police_section__table_align_start">
                Before accepting Deliverables from a Vendor, a Customer may cancel a Project
                Contract at any time. When a Customer initiates cancellation of a Project, the
                Vendor receives a notification and the option to confirm cancellation of the
                Project. When both Customer and Vendor accept the Project cancellation, Kuprik will
                review the Project cancellation and process a refund of the Initial Payment, if
                applicable, based on Kuprik’s Cancellation, Refund and Payment Policy. If you are a
                Customer, and a Vendor does not reply to your progress inquiries or your
                cancellation request after the Initial Payment has been made, please contact Kuprik
                at{' '}
                <span className="terms_and_police_section__content_color_blue">
                  support@kuprik.com
                </span>
                .
              </td>
              <td className="terms_and_police_section__table_align_start">
                Before a Customer accepts the Deliverables, a Vendor may cancel a Project Contract
                at any time by initiating the cancellation process. When a cancellation of a Project
                is started, a Customer receives a notification and the option to confirm
                cancellation of the Project. When both Customer and Vendor accept the Project
                cancellation, Kuprik will review the Project cancellation and process a refund of
                the Initial Payment, if applicable, based on Kuprik’s Cancellation, Refund and
                Payment Policy. If a Vendor fails to deliver any Deliverables or Vendor Services
                when due, or otherwise breaches a Project Contract, Kuprik may, at its option, take
                any or all of the following actions: (a) send a reminder to the Vendor to deliver
                the Deliverables and Vendor Services within a specified time period; or (b) suspend,
                terminate, or restrict the Vendor’s Account; or (c) take any other action that
                Kuprik deems appropriate in its sole discretion.
              </td>
            </tr>

            <tr>
              <td className="terms_and_police_section__table_align_center_padding_medium text_bold">
                After acceptance of the Deliverables
              </td>
              <td className="terms_and_police_section__table_align_start">
                A Customer may not cancel a Project after accepting the Deliverables submitted by a
                Vendor and must make the Final Payment as requested by the Vendor. If a Customer
                fails to take any action within the three (3) day period after the Final Payment
                request is submitted, the Vendor may submit a request for investigation to Kuprik at{' '}
                <span className="terms_and_police_section__content_color_blue">
                  support@kuprik.com
                </span>
                , including an explanation of the circumstances and documentation demonstrating the
                Vendor’s completion of Vendor Services in accordance with the Project Contract.
                Kuprik will investigate the Vendor’s request and attempt to resolve the dispute with
                the Customer and may, at its option, take any or all of the following actions: (a)
                send a reminder to the Customer to make a payment within a specified time period;
                (b) suspend, terminate, or restrict the Customer’s Account; or (c) take any other
                action that Kuprik deems appropriate in its sole discretion.
              </td>
              <td className="terms_and_police_section__table_align_start">
                If a Customer does not make a Final Payment after accepting Deliverables, please
                contact Kuprik at{' '}
                <span className="terms_and_police_section__content_color_blue">
                  support@kuprik.com
                </span>
                .
              </td>
            </tr>

            <tr>
              <td className="terms_and_police_section__table_align_center_padding_medium text_bold">
                Non-payment / Non-performance
              </td>
              <td className="terms_and_police_section__table_align_start">
                If Kuprik determines that the Vendor should receive payment for the Vendor Services
                and a Customer has refused to pay, Kuprik may, in its sole discretion, offer to
                compensate the Vendor on terms mutually agreed upon by Kuprik and the Vendor (which
                may include, but not be limited to, payment of the full Project Price in exchange
                for ownership of the Deliverables). Customer understands and agrees that Kuprik has
                the right to and may seek reimbursement for any Vendor fees paid on Customer’s
                behalf in accordance with Section 4.5 below.
              </td>
              <td className="terms_and_police_section__table_align_start">
                If Kuprik, in its sole discretion, determines that the Customer has materially
                complied with all of the requirements of a Project Contract and that the Vendor has
                failed to materially comply with the Project Contract, including failing to deliver
                the contracted-for Deliverables and/or Vendor Services or satisfy the Due Date,
                Scope, or Quality requirements, Kuprik may issue the Customer a refund in an amount
                equal to some or all of fees actually paid by the Customer under the Project
                Contract, such as the Initial Payment and/or the Project Price. You understand and
                agree that Kuprik will have the right to collect, withhold, reverse, or offset any
                fees received by a Vendor in connection with a cancelled Project Contract or any
                other Project Contract in accordance with Section 4.5 below.
              </td>
            </tr>
          </tbody>
        </table>

        <br />
        <p>
          In the event Kuprik issues a User a refund of any amounts paid under these Terms of
          Service or a Project Contract, you agree and authorize Kuprik to deduct any fees
          associated with processing the refund, including but not limited to Stripe processing fees
          and Service Fees, if applicable, from the amount refunded.
        </p>

        <h4>3.4 Worker Classification</h4>
        <p>
          Nothing in these Terms creates a partnership, joint venture, agency, or employment
          relationship between Users. You acknowledge and agree that Customer is solely responsible
          and assumes all liability for: (a) classifying Vendor as an employee or independent
          contractor; and (b) engaging and paying Vendor in accordance with applicable laws, rules,
          and regulations for Vendor Services.
        </p>
        <p>
          Nothing in these Terms prohibits Vendors from using subcontractors or employees to perform
          Vendor Services. However, if a Vendor uses subcontractors or employees, Vendor is solely
          responsible for the actions and omissions of those subcontractors and/or employees and
          their compliance with these Terms, which will apply to Kuprik’s relationship with such
          subcontractors and/or employees, as well as the terms and conditions in an applicable
          Project Contract.
        </p>

        <h4>3.5 Kuprik’s Role and Rights</h4>
        <p>
          Nothing in these Terms will create an employment, agency, or joint venture relationship
          between Kuprik and any User of the Services, and Kuprik does not employ, supervise,
          direct, control, or monitor Customers or Vendors in the performance of their obligations
          under a Project Contract or use of the Platform or Kuprik’s Services. Users are solely
          responsible for entering into, negotiating, performing obligations in accordance with, and
          making payments in connection with a Project Contract. Kuprik does not endorse any
          particular Vendor’s services, nor make any representations or guarantees about any Vendor
          Services. Notwithstanding anything to the contrary in any Project Contract or other
          agreement between a Customer and Vendor, nothing will modify or waive any of Kuprik’s
          rights or obligations under these Terms without Kuprik’s express written consent.
        </p>
        <br />

        <h3>4. Payments</h3>
        <h4>4.1 Payment Method</h4>
        <p>
          Before entering into a Project Contract, a User must provide a valid payment method,
          including but not limited to a credit card, debit card, bank account, or other payment
          method acceptable to Kuprik (“Payment Method”). You authorize Kuprik to use your Payment
          Method information and charge your Payment Method as outlined in these Terms. If your
          Payment Method’s account information changes (e.g., card number, account number, routing
          number, expiration date) for any reason, you must update your Payment Method. You
          understand and agree that we may share your Payment Method information with third-party
          payment processors and other service providers who provide services to us or on our
          behalf. You are solely responsible for the accuracy and completeness of your Payment
          Method information. Kuprik is not responsible for any loss suffered by you as a result of
          incorrect Payment Method information provided by you. By providing Payment Method
          information to Kuprik, you represent and warrant that you are legally authorized to
          provide such information and use the Payment Method(s), and that your actions do not
          violate applicable law or any other terms, conditions, or policies applicable to your use
          of the Payment Method(s).
        </p>

        <h4>4.2 Payments by Customers on Project Contracts</h4>
        <p>
          When Customer authorizes any payment toward a Project Contract on the Platform, Customer
          automatically and irrevocably authorizes and instructs Kuprik to charge Customer’s Payment
          Method for the specified amount. After Kuprik charges or debits Customer’s Payment Method
          for a deposit amount of all or part of the Project Price, the charge or debit is
          non-refundable, except as otherwise provided by Kuprik’s Cancellation, Refund and Payment
          Policy (Section 3.3) or as required by applicable law. To the extent permitted by
          applicable law, Customer agrees not to request a chargeback of any Project Price or any
          other amounts charged by Kuprik in accordance with these Terms. A chargeback in breach of
          this Section 4.2 is a material breach of these Terms.
        </p>

        <h4>4.3 Disbursements to Vendors on Project Contracts</h4>
        <p>
          Generally, payments to Vendors on Project Contracts are held by Kuprik on Stripe for 7
          days before being released to the Vendor. This is to protect against fraud on the Platform
          or other violations of these Terms of Use or Kuprik’s Platform policies. If a project
          deadline is 7 days or less from the Project start date, Kuprik will release the Initial
          Payment to the Vendor immediately, but the Final Payment will still be subject to the
          standard 7-day hold period.
        </p>
        <p>
          Subject to Kuprik’s right to withhold, chargeback, retain, or recoup any amounts under
          these Terms, after a Customer makes a payment, the Vendor will receive the payment less
          any applicable Service Fees retained by Kuprik. Vendor hereby irrevocably authorizes and
          instructs Kuprik to deduct applicable Service Fees from the Project Price that Vendor
          receives. The balance, after the hold-period when applicable, will be released to Vendor
          immediately.
        </p>

        <h4>4.4 Stripe Payment Services</h4>
        <p>
          The Platform uses Stripe to make payments to or receive payments from other Users. Your
          use of Stripe is subject to the Stripe Full Service Agreement (<a href="https://stripe.com/connect-account/legal" className="terms_and_police_section__content_link">
            https://stripe.com/connect-account/legal</a>) 
          and Recipient Service Agreement (<a href="https://stripe.com/connect-account/legal/recipient" className="terms_and_police_section__content_link">
            https://stripe.com/connect-account/legal/recipient</a>), 
          whichever is applicable. You will comply with all terms and
          conditions of those agreements. As a condition of your use of the Services,
          you must provide Kuprik with accurate and complete information about you and your
          business, and you authorize Kuprik to share such information and transaction information
          related to your payments with Stripe.
        </p>
        <p>
          Stripe may suspend or terminate the provision of its services in accordance with its terms
          of service, in which case neither Stripe nor Kuprik will be liable for any loss, costs,
          expense, or damage relating to your use, or inability to use, the payment processing
          services offered by the Platform.
        </p>
        <p>
          You agree, to the fullest extent permitted by applicable law, to accept electronic
          delivery of any communications, including but not limited to tax forms, tax notices, and
          other tax documents, that Kuprik is required by applicable law to send to you. Electronic
          delivery will be by e-mail or other electronic format.
        </p>

        <h4>4.5 Withholding, Reversals, Offsets</h4>
        <p>
          Kuprik reserves the right to withhold funds from you prior to making the funds available
          to you to review for suspicious or fraudulent activity; if we suspect your User Account
          may be engaged in activity that violates these Terms; if we believe there is or may be a
          risk of claims, disputes, or other risks to Kuprik or third parties; or to comply with an
          investigation, legal request, or process. You agree that Kuprik may suspend payouts during
          the review period or for as long as we believe any related risks to Kuprik or third
          parties persist, whichever is longer, and that Kuprik reserves the right to refund,
          reverse, or cancel transactions that have been classified as fraudulent or a violation of
          these Terms after investigation, or as required by our Cancellation, Refund and Payment
          Policy.
        </p>
        <p>
          In addition to the foregoing, Kuprik reserves the right to take any other action with
          respect to a User’s payments as we deem appropriate, in our sole discretion, if we suspect
          the User’s activity on or use of the Platform or the Services violates applicable laws,
          rules, and regulations, these Terms of Service, or any of our Platform policies.
        </p>
        <p>
          You authorize us to collect from you any amounts you owe us (“Owed Amounts”) for the
          following: (a) payment of Platform fees, including, without limitation, Service Fees or
          the Project Price; (b) correcting errors in payment processing, settlements, or the like;
          (c) reimbursement or recoupment of fees or amounts we pay to Vendors or third parties on
          your behalf; (d) applicable taxes; or (e) unexpected or unusual expenses, costs, or other
          amounts we incur due to your use of the Services.
        </p>
        <p>
          You authorize us to use any lawful means to collect the Owed Amounts, including, without
          limitation: retaining or offsetting such amounts from your current or future payouts;
          recovering from your payments or charging your Payment Method; invoicing you; or using
          collections agencies or other collections methods, subject to applicable laws. If we are
          unable recover an Owed Amount from a Payment Method you have authorized us to use, you
          agree to pay Kuprik upon demand for any amounts owed, plus interest on the outstanding
          amount at the lesser of 1.5% per month or the maximum interest allowed by applicable law,
          plus attorneys’ fees and other costs of collection to the extent permitted by applicable
          law. If we are unable to recover Owed Amounts, we may, in addition to any other remedies
          available to us under applicable law, temporarily or permanently suspend your access to
          the Platform and Services and/or terminate your User Account.
        </p>

        <h4>4.6 Chargebacks </h4>
        <p>
          In the event of a chargeback on any amounts paid by you to the Platform, you acknowledge
          and agree that Kuprik will be entitled to recoup or recover, or chargeback from you, any
          fees imposed on Kuprik by a payment processor in connection with such chargeback or
          reversal. Kuprik reserves the right to suspend or terminate your User Account immediately
          and without notice if you have excessive chargebacks.
        </p>

        <h4>4.7 Currency Conversion</h4>
        <p>
          All payments made on the Platform must be in U.S. Dollars. If you need to convert foreign
          currency into U.S. Dollars in order to transact on the Platform, you are solely
          responsible for any conversion fees and for ascertaining the applicable foreign currency
          conversion rate. Kuprik is not responsible for currency fluctuations that occur when
          billing or crediting a Payment Method denominated in a currency other than U.S. Dollars.
        </p>
        <br />

        <h3>5. Ratings and Reviews</h3>
        <p>
          Upon completion of a Project, a User must provide feedback about the other User on the
          Project Contract (i.e., Customers must provide feedback about Vendors, and Vendors must
          provide feedback about Customers). Project feedback will consist of: (1) a Rating; and (2)
          a Review. “Rating” means a User’s rating of another User’s business which is posted
          publicly to the Platform and uses a scale from 1 to 5 where 5 is the most positive.
          “Review” means a User’s opinion of another User’s business which is posted publicly to the
          Platform and consists of free text.
        </p>
        <p>
          Ratings and Reviews reflect the opinions of individual Users and do not reflect the
          opinion, endorsement, or recommendation of Kuprik. Kuprik does not monitor, provide, or
          influence Ratings and Reviews. Kuprik reserves the right (but not the obligation) to
          remove Ratings and Reviews or other User Content from the Platform, for any reason or no
          reason and without notice to any User.
        </p>
        <p>
          Specific Ratings and Reviews, as well as aggregated statistics based on individual Ratings
          and Reviews, are publicly visible on the Platform. You are solely responsible for your
          Ratings and Reviews, and once posted to the Platform, you may not be able to remove them.
          You assume all risks associated with your Ratings and Reviews, including anyone’s reliance
          on its quality, accuracy, or truthfulness, and any risks associated with private or
          personal information you disclose. Kuprik takes no responsibility and assumes no liability
          for any User Content, including Ratings and Reviews, posted by you or any third party.
        </p>
        <br />

        <h3>6. Disputes Between Users</h3>
        <p>
          You acknowledge and agree that if a dispute arises between you and another User relating
          to any Project Contract, you will first attempt to resolve your dispute directly with that
          other User.
        </p>
        <p>
          If you are unable to resolve your dispute directly with the other User, the parties may
          submit a Dispute Resolution Request to Kuprik at{' '}
          <span className="terms_and_police_section__content_color_blue">support@kuprik.com</span>.
          Kuprik will attempt to resolve the dispute based on the terms of the Project Contract,
          including the Project’s Scope and Due Date and the Quality of any Vendor Services or
          Deliverables, the communications between the parties on the Platform, and any additional
          information provided by the parties to Kuprik. You agree to promptly comply with Kuprik’s
          request for any additional information or documentation in order to resolve the dispute,
          and you authorize Kuprik to use any information or content you submit to the Platform,
          including your communications with any other User, to understand and resolve your dispute.
          You further authorize Kuprik to take any actions with respect to your payments, including
          issuing a credit, refund, or reversal, or assessing any payment processing fees,
          consistent with Kuprik’s determination.
        </p>
        <p>
          You agree to indemnify, defend, and hold harmless Kuprik from and against any and all
          claims, demands, damages, or liability, known or unknown, actual or consequential, of
          every kind and nature, related to the dispute, Kuprik’s determination, or any of the
          information, documentation, or content relied on by Kuprik in resolving your dispute.
        </p>
        <br />

        <h3>7. Intellectual Property</h3>
        <h4>7.1 User Content</h4>
        <p>
          You retain ownership of your materials, information, text, data, audio, video, pictures,
          graphics, software, messages, comments, suggestions, ideas, feedback, and other content or
          information which is created, transmitted, posted, or uploaded by you to the Platform,
          including, without limitation, Ratings, Reviews, Profile information, and Project
          descriptions (collectively, “User Content”), but excluding Deliverables under a Project
          Contract. You irrevocably grant Kuprik a worldwide, perpetual, non-exclusive,
          royalty-free, fully paid up, assignable, sublicensable, transferable right to use, copy,
          publicly perform and display, reproduce, distribute, modify, translate, remove, analyze,
          commercialize, and prepare derivative works of your User Content for any purpose.
        </p>
        <p>
          You represent and warrant that you own or otherwise control all of the rights to any User
          Content you make available on the Platform or to Kuprik; that your User Content is true
          and accurate; and that use of your User Content will not cause injury to any person or
          entity or violate any third party’s intellectual property, privacy, or other proprietary
          rights. You agree to indemnify Kuprik for all damages, liabilities, fees, fines, losses,
          claims, expenses (including but not limited to reasonable attorneys’ fees and related
          costs and expenses) and any other costs we may incur resulting from User Content provided
          by you to the Platform or the Services.
        </p>
        <p>
          You are solely responsible for maintaining backup copies of your User Content. If we
          terminate your User Account for any reason, we will have no obligation to retain or store
          any of your User Content on the Platform. You may lose access to data or any other content
          you made available on the Platform. However, we may, but have no obligation to you to,
          retain some or all of your User Account information in accordance with our Privacy Policy,
          and as permitted by applicable law.
        </p>

        <h4>7.2 Kuprik Intellectual Property</h4>
        <p>
          Kuprik (and its licensors, where applicable) owns all right, title and interest, including
          all related Intellectual Property Rights embodied by or contained in the Platform, the
          Services and any features, functions, or content provided by the Platform or the Services
          (collectively, “Kuprik IP”). Kuprik reserves all rights in the Kuprik IP not expressly
          granted to you under these Terms.
        </p>
        <p>
          If you provide Kuprik with any ideas, comments, suggestions, or other feedback regarding
          the Services, the Platform, or any other Kuprik products or services (“Feedback”), you
          grant Kuprik an exclusive, royalty-free, fully paid up, perpetual, irrevocable,
          assignable, sublicensable worldwide license to use and exploit any Feedback, and all
          related Intellectual Property Rights for any purpose whatsoever, without restriction and
          without compensation or attribution to you. Kuprik may but has no obligation to use or
          exploit any Feedback it may receive from Users.
        </p>
        <br />

        <h3>8. Non-Circumvention</h3>
        <p>
          Requesting or offering to make or receive payment for Vendor Services outside of the
          Platform is not allowed during the first 24 months (the “Exclusivity Period”) of your
          relationship with another User. The Exclusivity Period begins when a User connects with,
          communicates to, or discovers the other User on the Platform, whichever is earliest. If
          you and another User had a pre-existing relationship prior to connecting on the Platform,
          then the Exclusivity Period will not apply.
        </p>
        <p>
          We encourage you to use the Platform for all of your communications with other Users. This
          is for your safety, and so that in the event you have a dispute with another User, Kuprik
          will be able to review and use your communications with the other User to resolve your
          dispute. In any event, you agree that prior to entering into a Project Contract with
          another User, you will not contact, or try to contact, that other User outside of the
          Platform (such as via phone call, email, or social media platform, including but not
          limited to Facebook or Twitter) for purposes of transacting off of the Platform.
        </p>
        <p>
          You agree to notify Kuprik immediately if you become aware of or suspect another person’s
          violation of this Section. You should send notifications by email to Kuprik at{' '}
          <span className="terms_and_police_section__content_color_blue">support@kuprik.com</span>.
        </p>
        <p>
          Any violation of any provision in this Section is a material breach of these Terms and
          could result in a range of actions, including but not limited to permanent suspension of
          your User Account, or charging or invoicing you a reasonable fee to take the relationship
          outside of the Platform.
        </p>
        <p>
          This Section will survive termination of these Terms, so if you terminate your use of the
          Platform and these Terms for any reason, you remain bound by this Non-Circumvention
          provision for any remaining term of the Exclusivity Period.
        </p>
        <br />

        <h3>9. Taxes and Compliance</h3>
        <p>
          Vendors are solely responsible for all federal, state, and local taxes in connection with
          any payments received via the Services. You agree that Kuprik has no obligation to
          withhold or pay any income, payroll, Social Security, or other federal, state, or local
          taxes, make any insurance contributions (including for unemployment or disability), or
          obtain workers’ compensation insurance on your behalf.
        </p>
        <p>
          Depending on your location or residency, you may be subject to certain other taxes,
          including local sales taxes (such as VAT, GST, or similar taxes), ad valorem, or value
          added taxes (“Taxes”). You are solely responsible for paying any and all applicable Taxes.
          If we are required by applicable law to withhold any amounts on your behalf, it is your
          obligation to notify Kuprik, and you will indemnify Kuprik for any obligation to pay
          withheld amounts to relevant agencies. To the extent required by applicable law, you
          irrevocably authorize and instruct Kuprik to collect or withhold applicable Taxes, in
          addition to any other fees (such as the Service Fees) owed to Kuprik under these Terms.
        </p>
        <p>
          Kuprik has no obligation to monitor or ensure Users’ compliance with Tax laws, these
          Terms, the terms of a Project Contract, or any other applicable laws, rules, or
          regulations. Although Kuprik may make certain transaction information and records
          available to you on the Platform, nothing in these Terms or the Services will be deemed to
          create an obligation for Kuprik to create, maintain, or backup any such records or
          information.
        </p>
        <br />

        <h3>10. Disclaimer of Warranties</h3>
        <p>
          KUPRIK PROVIDES THE SERVICES FOR USE ON AN “AS IS” AND “AS AVAILABLE” BASIS. WE DISCLAIM
          ALL WARRANTIES AND REPRESENTATIONS, EITHER EXPRESS OR IMPLIED, WITH RESPECT TO THE
          SERVICES, THE PLATFORM, USER CONTENT, AND ANY OTHER CONTENT OR INFORMATION RELATED TO THE
          FOREGOING, INCLUDING, WITHOUT LIMITATION, ANY WARRANTIES OF MERCHANTABILITY, AND FITNESS
          FOR A PARTICULAR PURPOSE, FEATURES, QUALITY, NON-INFRINGEMENT, TITLE, COMPATIBILITY,
          PERFORMANCE, SECURITY OR ACCURACY. YOU BEAR THE ENTIRE RISK OF USING THE SERVICES.
        </p>
        <p>
          Kuprik makes no warranty or representation and disclaims all responsibility and liability
          for: (a) the completeness, accuracy, availability, timeliness, security, or reliability of
          the Services and any materials or information available on the Services; (b) any harm to
          your computer system, loss of data, or other harm that results from your access to or use
          of the Services or any materials and information available on the Services; and (c)
          whether the Services will meet your requirements or be available on an uninterrupted,
          secure, or error-free basis. No advice or information, whether written or oral, obtained
          by you from Kuprik, its employees, or its representatives will create any warranty not
          expressly stated herein. Some states or jurisdictions do not allow the types of
          disclaimers in this section, so they may not apply to you.
        </p>
        <br />

        <h3>11. Limitation of Liability</h3>
        <p>
          KUPRIK, INCLUDING ITS OFFICERS, DIRECTORS, SHAREHOLDERS, EMPLOYEES, SUB-CONTRACTORS, AND
          AGENTS (THE “KUPRIK PARTIES”), WILL NOT BE LIABLE FOR ANY DIRECT, INDIRECT, SPECIAL,
          INCIDENTAL OR CONSEQUENTIAL DAMAGE, OR ANY OTHER DAMAGE, LOSS (INCLUDING LOSS OF PROFIT
          AND LOSS OF DATA), COSTS, EXPENSES, OR PAYMENTS ARISING FROM OR IN CONNECTION WITH (A)
          YOUR USE OF OR INABILITY TO USE THE PLATFORM OR THE SERVICES; (B) ANY FAILURE, ERROR, OR
          BREAKDOWN IN THE FUNCTION OF THE SERVICES; (C) ANY FAULT OR ERROR MADE BY KUPRIK OR ANYONE
          ACTING ON ITS BEHALF (INCLUDING THIRD PARTY SERVICE PROVIDERS); (D) YOUR RELIANCE ON THE
          CONTENT OR INFORMATION MADE AVAILABLE ON THE SERVICES; (E) ANY DENIAL, SUSPENSION OR
          TERMINATION OF YOUR ACCOUNT; (F) RETENTION, DELETION, DISCLOSURE AND ANY OTHER USE OR LOSS
          OF YOUR CONTENT ON THE SERVICES; OR (G) YOUR INTERACTIONS WITH OR RELATIONSHIPS WITH OR
          CONTENT PROVIDED BY OTHER USERS. IN ANY EVENT, YOU AGREE THAT IF YOU HAVE ANY BASIS FOR
          RECOVERING DAMAGES FROM THE KUPRIK PARTIES, YOUR SOLE REMEDY WILL BE TO RECOVER DIRECT
          DAMAGES EQUAL TO THE LESSER OF: (A) $1,000; OR (B) ANY FEES RETAINED BY KUPRIK IN
          CONNECTION WITH PROJECT CONTRACTS TO WHICH YOU WERE A PARTY AS Customer OR Vendor DURING
          THE SIX-MONTH PERIOD PRECEDING THE DATE OF THE CLAIM. This limitation applies (a) to a
          claim based on any legal theory, including WITHOUT LIMITATION breach of contract,
          warranty, guarantee, or condition, strict liability, negligence, or other tort; (b) even
          if we knew or should have known about the possibility of the damages; AND (C) EVEN IF
          CIRCUMSTANCES CAUSE AVAILABLE REMEDIES TO FAIL. We will have no liability for any failure
          or delay due to matters beyond our reasonable control.
        </p>
        <br />

        <h3>12. Release</h3>
        <p>
          You hereby release and discharge Kuprik, its officers, directors, shareholders, agents,
          employees, affiliates, partners, and service providers from any and all Claims, at law or
          in equity, whether known or unknown, arising out of or connected in any way to any
          transaction, interaction, relationship, or dispute you have with another User. You hereby
          waive all rights under section 1542 of the California Civil Code, and any similar law of
          any state or territory of the United States, as to Claims which you do not know or suspect
          to exist at the time you agree to these Terms of Service. Section 1542 reads as follows:
          “A general release does not extend to the claims which the creditor does not know or
          suspect to exist in his favor at the time of executing the release, which if known by him
          must have materially affected his settlement with the debtor.”
        </p>
        <br />

        <h3>13. Indemnification</h3>
        <p>
          You will indemnify, defend, and hold Kuprik, its officers, directors, employees, agents
          and representatives (the “Kuprik Indemnified Parties”) harmless from any and all charges,
          complaints, costs, claims, liabilities, obligations, promises, agreements, covenants,
          damages, lawsuits, actions, causes of action, suits, demands, debts, losses, judgments,
          liens, matters, expenses, and issues of any nature whatsoever (”Claims”) brought by you, a
          third party, or another User against the Kuprik Indemnified Parties, relating to, arising
          out of, or connected with: (a) your breach or violation of any of these Terms of Service;
          (b) your User Content; (b) any Project Contract entered into by you; (c) your use of the
          Platform and the Services; (d) your violation of applicable law or the rights of any third
          party, including but not limited to infringement of any Intellectual Property Rights or
          right of privacy; and (e) your negligence, willful misconduct, or fraud.
        </p>
        <br />

        <h3>14. Termination</h3>
        <p>
          You may terminate these Terms at any time by providing written notice to Kuprik at{' '}
          <span className="terms_and_police_section__content_color_blue">support@kuprik.com</span>,
          and immediately ceasing all use of the Platform and the Services. You will no longer be
          able to negotiate, accept, or agree to any new Project Contracts. Kuprik may close your
          User Account and has no obligation to provide access to, store, or backup any data or
          information in your User Account, including your User Content, unless required by
          applicable law; except that, Kuprik will continue to provide the Platform Services to you
          in connection with any unfinished Project Contracts you may have as of the date of
          termination. If you begin using the Platform or the Services again, you must agree to
          these Terms. Kuprik may immediately terminate these Terms and revoke your access to the
          Services or the Platform for any reason upon written notice to you.
        </p>
        <p>
          You understand, acknowledge, and agree that your termination of these Terms does not
          modify, terminate, or affect your obligations under any Project Contract with another
          User. If you terminate these Terms, you must still comply with these Terms until you close
          all Project Contracts; and termination will not affect any unpaid payment obligations to
          another User, or your obligation to pay any amounts or fees in connection with your
          receipt of any Services, whether before or after termination.
        </p>
        <p>
          Kuprik reserves the right to inform other Users that your User Account has been terminated
          and the reasons for such termination. Kuprik will have no liability arising out of or
          relating to any notice that we provide to another User regarding the status of your User
          Account and/or the reason(s) for its closure.
        </p>
        <br />

        <h3>15. Dispute Resolution</h3>
        <p>
          You agree to attempt to resolve any claim, dispute, or controversy arising out of or
          relating to these Terms, your relationship with Kuprik, or your use of the Platform or the
          Services (each, a “Dispute”) in accordance with this Section 15.
        </p>

        <h4>15.1 Informal Resolution</h4>
        <p>
          If a Dispute arises between you and Kuprik, you agree to attempt, promptly and in good
          faith, to resolve any such Dispute voluntarily and informally before pursuing any other
          dispute resolution options. If we are unable to informally resolve any such Dispute within
          a reasonable time (not to exceed 45 days), then you and Kuprik agree to resolve the
          Dispute through final and binding arbitration in accordance with Section 15.2.
        </p>

        <h4>15.2 Binding Arbitration </h4>
        <p>
          Any Dispute submitted to final and binding arbitration will be determined by arbitration
          in Contra Costa County, California, before a single arbitrator. The arbitration will be
          administered by JAMS pursuant to its Comprehensive Arbitration Rules and Procedures and in
          accordance with the Expedited Procedures in those Rules. Judgment on any award may be
          entered in any court having jurisdiction. This clause will not preclude parties from
          seeking provisional remedies, such as an injunction, in aid of arbitration from a court of
          appropriate jurisdiction.
        </p>

        <h4>15.3 Jury Trial and Class Action Waiver</h4>
        <p>
          You and Kuprik acknowledge and agree that we are each waiving the right to a trial by jury
          as to all arbitrable Disputes.
        </p>
        <p>
          You and Kuprik acknowledge and agree that, to the fullest extent permitted by applicable
          law, we are each waiving the right to participate as a plaintiff or class member in any
          purported class action lawsuit, class-wide arbitration, private attorney general action,
          or any other representative proceeding as to all Disputes. Further, unless you and Kuprik
          both otherwise agree in writing, the arbitrator may not consolidate more than one party’s
          claims and may not otherwise preside over any form of any class or representative
          proceeding.
        </p>

        <h4>15.4 Choice of Law</h4>
        <p>
          All matters relating to your access to or use of the Services, including all Disputes,
          will be governed by the laws of the State of California, United States, without regard to
          its conflict of law provisions. You agree to the personal jurisdiction by and venue in the
          state and federal courts in Contra Costa County, California, and waive any objection to
          such jurisdiction or venue. Any claim under these Terms of Service must be brought within
          1 year after the cause of action arises, or such claim or cause of action is
          barred. Notwithstanding the foregoing, this Section 15 is governed by the Federal
          Arbitration Act.
        </p>
        <br />

        <h3>16. General</h3>

        <h4>16.1 Severability</h4>
        <p>
          If any provision or part of a provision of these Terms of Service is found unlawful, void,
          or unenforceable, that provision or part of the provision is deemed severable from these
          Terms of Service and will be modified to the extent necessary to give effect to the
          parties’ intent, and enforced to the maximum extent permissible, and all other provisions
          of these Terms of Service will remain in full force and effect.
        </p>

        <h4>16.2 Modification; Waiver</h4>
        <p>
          No modification of or amendment to these Terms, nor any waiver of any rights under these
          Terms, will be binding on Kuprik unless in a writing signed by an authorized
          representative of Kuprik. Waiver by Kuprik of a breach of any provision of these Terms
          will not operate as a waiver of any other or subsequent breach.
        </p>

        <h4>16.3 Assignment</h4>
        <p>
          We may assign these Terms, in whole or in part, at any time without your consent. You may
          not assign any of your rights, interests, or obligations under these Terms without our
          prior written consent, and any attempted assignment or transfer in violation of this
          subsection will be null and void.
        </p>

        <h4>16.4 Force Majeure </h4>
        <p>
          Neither party will be liable for any delays or failures in performance resulting from acts
          beyond its reasonable control including, without limitation, acts of God, acts of war or
          terrorism, interruptions or malfunction of computer facilities or telecommunications
          systems, or loss of data due to power failures or mechanical difficulties with information
          storage or retrieval systems, labor difficulties or civil unrest. Notwithstanding the
          foregoing, in the event of such an occurrence, each party agrees to make a good faith
          effort to perform its obligations hereunder and will promptly resume performance as soon
          as reasonably practicable.
        </p>

        <h4>16.5 Entire Agreement</h4>
        <p>
          These Terms of Service represent the complete and entire agreement between you and Kuprik
          with regard to your use of the Services, and any and all other written or oral agreements
          or understandings previously existing between you and Kuprik with respect to such use are
          hereby superseded and cancelled. The section headings in the Terms of Service are included
          for ease of reference only and have no binding effect. As used herein,{' '}
          <span className="text_bold">“including”</span> or{' '}
          <span className="text_bold">“includes”</span> means including without limitation.
        </p>

        <h4>16.6 Export Restrictions</h4>
        <p>
          You agree that you will not knowingly: (a) export or re-export, directly or indirectly,
          any technical data (as defined by the U.S. Export Administration Regulations) provided by
          Kuprik, or (b) disclose such technical data for use in, or export or re-export directly or
          indirectly, any direct product of such technical data, including software, to any
          destination to which such export or re-export is restricted or prohibited by United States
          or another jurisdiction’s law, unless you have obtained prior authorization from the
          relevant governmental entity. You further represent that you are not on any U.S.
          government denied- or blocked-party list, and that you will not, and you will not permit
          any other User, to access or use any of the Services in a U.S.-embargoed or in violation
          of any U.S. export law or regulation.
        </p>

        <h4>16.7 Consent to Electronic Records</h4>
        <p>
          In lieu of receiving documents in paper format, you hereby consent, to the fullest extent
          permitted by law, to accept electronic delivery of any documents, notices, statements,
          disclosures, and other records. Electronic delivery may be via email or other electronic
          communication, or by posting a link where the document may be retrieved.
        </p>

        <h4>16.8 Survival</h4>
        <p>
          The terms of these Terms that expressly or by their nature contemplate performance after
          termination or expiration will survive and continue in full force and effect, including
          but not limited to Non-Circumvention, Intellectual Property, Disclaimer of Warranties,
          Limitation of Liability, Indemnification, and Dispute Resolution, and any obligations that
          were incurred prior to termination or may accrue arising out of any act or omission prior
          to termination.
        </p>
        <br />

        <h3>17. Contact Us</h3>
        <p class="terms_and_police_section__info_footer">
          Kuprik LLC
          <br />
          The best way to contact us is through email.
          <br />
          Company contacts:{' '}
          <span className="terms_and_police_section__content_color_blue">
            admin@kuprik.com
          </span> or{' '}
          <span className="terms_and_police_section__content_color_blue">support@kuprik.com</span>.
          <br />
          Founder and CEO contact: Ugulay Sloan at{' '}
          <span className="terms_and_police_section__content_color_blue">
            ugulaysloan@kuprik.com
          </span>
          .<br />
        </p>
      </div>
    </div>
  );
};
