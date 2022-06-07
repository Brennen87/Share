import React from 'react';
import { useHistory } from 'react-router-dom';
import img from '../../assets/images/simple_img.png';
import DocumentTitle from '../../components/DocumentTitle';
import './index.scss';

const AboutPage = ({ route }) => {
  const history = useHistory();

  return (
    <DocumentTitle title={route.pageTitle}>
      <div className='about_page'>
        <div className='container'>
          <div className='about'>

            <h3 className="about_page__title_customers">CUSTOMERS FAQ</h3>

            <h4>How does Kuprik vet vendors?</h4>
            <p>
              Each vendor must submit their professional resume, a sample of their work, and any additional information to help us assess their skill level. If applicable, we may send a selection of our own to test a potential vendor's work. We assess hard and soft skills before onboarding vendors and may schedule an interview if deemed necessary. 
            </p>

            <h4>How do I hire a vendor on Kuprik?</h4>
            <p>
              To hire someone, contact vendors you want to work with and share the project's details, inquire about their availability and your project's cost. Once you agree on the terms such as time, payment, and deliverable, create a <span className="about__text_font_italic">New Project</span> to hire the vendor you decided to work with.
            </p>

            <h4>How do I pay?</h4>
            <p>
              You pay in two installments: the initial payment when creating a <span className="about__text_font_italic">New Project</span> and the final payment when closing the project. You and the vendor agree on these payments. Changes made to the scope/requirements while working on the project will be reflected in the final payment. You can pay by debit/credit card.
            </p>

            <h4>Are there fees that apply to me as a customer?</h4>
            <p>
              No, as a customer, you do not pay any fees to Kuprik. You only pay the amount you need to pay to a vendor for a project.
            </p>

            <h4>Can I make changes to the scope/requirements?</h4>
            <p>
              Absolutely. You will need to agree on that with the vendor you are working with and add any monetary adjustments to the final payment. 
            </p>

            <h4>What happens once the project is started?</h4>
            <p>
              After you create a <span className="about__text_font_italic">New Project</span> and pay the initial payment, the vendor starts working on your project. A separate conversation is created for your project in the Inbox under the <span className="about__text_font_italic">Projects</span> section. This is a space for your vendor and you to communicate about the project and the revisions needed.
            </p>
            <p>
              Once the deliverable is ready, the vendor submits it for you to review. If you are satisfied, you accept and leave a review for the vendor. If you are not satisfied, do not accept and go back to the <span className="about__text_font_italic">Inbox-Projects</span> conversation to ask for revisions. 
            </p>

            <h4>Can I ask for revisions, and how will that work?</h4>
            <p>
              Yes, you can ask for revisions. Kuprik does not limit how many times a deliverable can be revised and resubmitted. However, your vendor might have a limit on the number of revisions, so we encourage you to agree directly with your vendor on what is acceptable for the two of you.
            </p>

            <h4>Can I extend the deadline for a project?</h4>
            <p>
              Yes, the project's due date can be extended up to three (3) times, not to exceed six (6) months in total. If the project is anticipated to last longer than six (6) months, we recommend breaking it down into multiple projects. If a due date is missed, both customer and vendor will be notified. The system will keep the project open until action is taken from either party.
            </p>

            <h4>Can I cancel a project?</h4>
            <p>
              Yes. Our team will process the refund based on our Cancellations and Refunds Policy. We take 14 days to review and make a decision on cancelled projects. Please note that depending on how far you are in the project and circumstances of the cancellation, a vendor might be entitled to a payment for the work done.
            </p>

            <h4>Is it essential to communicate to vendors only through Kuprik?</h4>
            <p>
              Yes, it is. If there is a dispute between a customer and a vendor, <span className="about__text_font_italic">Inbox-Projects</span> communications will be used to resolve the dispute. Therefore, it is in the best interest of all users to only use <span className="about__text_font_italic">Inbox-Projects</span> for communication on active projects.
            </p>

            <h4>What if I am not satisfied with the deliverable?</h4>
            <p>
              We encourage you to resolve the issue with the vendor. If you are unable to resolve the issue after reaching out to the vendor and are still not satisfied, or your plans have changed, you can cancel the project at any time. Our team will process the refund based on our Cancellation, Refund and Payment Policy. We take 14 days to review and make a decision on cancelled projects.
            </p>

            <h4>Can my account be closed by Kuprik?</h4>
            <p>
              Yes, your account can be closed by Kuprik for certain instances.
            </p>
            <p>
              First, if, as a customer, you receive the final deliverable that met your requirements, but you do not make the final payment, Kuprik will terminate your account. You will not be allowed to do business on our platform, neither as a customer nor as a vendor. In addition, the IP for the project that you did not make the final payment on might be transferred to Kuprik.
            </p>
            <p>
              Second, if our team notices any inappropriate behavior on your end, such as threatening, bullying, swearing, or any other conduct, reasonably interpreted to be demeaning or offensive, your account will be closed.
            </p>
            <p>
              Finally, we do regular monitoring of inactive accounts. If your account has been inactive for more than twelve (12) months, it may be deleted from our system. Rest assured that we will contact you before it is deleted to confirm. 
            </p>

            <h4>How do I submit feedback to Kuprik?</h4>
            <p>
              We always welcome feedback and suggestions. We want to know what's working and what's not working for you on Kuprik. You can share your thoughts with us <span className="about__link" onClick={() => history.push("/feedback")}>here</span>. When submitting the form, please select <span className="about__text_font_italic">Feedback</span>.
            </p>

            <h3 className="about_page__title_vendors">VENDORS FAQ</h3>

            <h4>How do I get verified with Kuprik?</h4>
            <p>
              Please go to the <span className="about__text_font_italic">Profile</span> section to be verified once you sign up to submit all the required documents. We ask that you submit your professional resume, a sample of your work, and any additional information that can help us assess your skill level. If applicable, we will send a selection of our own to test your work. We assess hard and soft skills before onboarding vendors, and we may schedule an interview if needed. 
            </p>


            <h4>How long does the verification process take?</h4>
            <p>
              The verification process could take anywhere from three (3) to seven (7) days. If an interview is needed, it could take up to an additional seven (7) days or more, depending on your and our team's availability.
            </p>

            <h4>What happens if I am not accepted to Kuprik?</h4>
            <p>
              If Kuprik does not accept you as a vendor, you will be notified via email. We will do our best to provide feedback on this decision. We always encourage you to improve on your skills and resubmit your application. 
            </p>

            <h4>What does a Kuprik profile include? </h4>
            <p>
              A vendor profile includes your name, profile photo, services you provide, areas of expertise, rates, professional summary, and a portfolio, if applicable.
            </p>

            <h4>How do I find projects?</h4>
            <p>
              At present, the only way is for you to put an outstanding profile and await for indie authors to contact you. In the future, we plan to enable vendors to find opportunities on our platform on their own. If you have suggestions on what you would like us to do for that, do contact us <span className="about__link" onClick={() => history.push("/feedback")}>here</span>. We value your opinion.
            </p>

            <h4>How do I get paid?</h4>
            <p>
              You will get paid at the beginning of the project and the end of the project. You agree with the customer on what the initial and final payments are. Please note, there is a built-in delay of up to seven (7) days to release payment to your bank account.
            </p>
            <p>
              The initial payment is required to start the project. Once the customer is satisfied with and accepts your deliverable, you will receive a notification of acceptance and be asked to submit a review for the customer. Reviews are required from both sides. Customers must provide a review for you when accepting your deliverable. After you submit a review for the customer, you can request the final payment. To do this, enter the amount the customer owes you under the <span className="about__text_font_italic">Final Payment</span> tab. Then, the customer is to make the final payment. After the final payment is processed, the project is marked as completed in our system.
            </p>

            <h4>Are there fees that apply to me as a vendor?</h4>
            <p>
              Yes, we charge vendors a fee per transaction based on their total Kuprik earnings.
            </p>
            <table className="about__table">
              <tr>
                <th>Earnings</th>
                <th>Fees</th>
              </tr>
              <tr>
                <td>$0 to $1,000</td>
                <td>19%</td>
              </tr>
              <tr>
                <td>$1,001 to $10,000</td>
                <td>17%</td>
              </tr>
              <tr>
                <td>$10,001 +</td>
                <td>15%</td>
              </tr>
            </table>

            <h4>What if a customer changes the scope/requirements of a project? </h4>
            <p>
              If the scope/requirements of a project are changed, and you anticipate spending more effort on the project, please communicate to the customer and agree on the expected changes to the final payment. 
            </p>

            <h4>Can I cancel a project?</h4>
            <p>
              Yes. We understand that life happens, and you might need to cancel a project. If the reason has to do with the customer, we encourage you to try your best to resolve the issue directly with the customer. That said, you can cancel the project at any time. According to our Cancellation, Refund and Payment Policy, vendors do not get paid for the projects they cancel. 
            </p>

            <h4>Is it essential to communicate to customers only through Kuprik?</h4>
            <p>
              Yes, it is. If there is a dispute between a customer and a vendor, <span className="about__text_font_italic">Inbox-Projects</span> communications will be used to resolve the dispute. Therefore, it is in the best interest of all users to only use <span className="about__text_font_italic">Inbox-Projects</span> for communication on active projects.
            </p>

            <h4>What happens if a customer cancels a project that I already put a lot of effort into?</h4>
            <p>
              Rest assured that we have thought of that. Our team will process the payment based on our Cancellation, Refund and Payment Policy. We take 14 days to review and make a decision on cancelled projects. Depending on how far you are in the project and circumstances of the cancellation, you might be entitled to a payment for the work done.
            </p>

            <h4>Can my account be closed by Kuprik?</h4>
            <p>
              Yes, your account can be closed by Kuprik for certain instances.
            </p>
            <p>
              First, if, as a vendor, you receive the initial payment and then ghost the customer, your account will be terminated by Kuprik. You will not be allowed to do business on our platform, neither as a vendor nor as a customer. 
            </p>
            <p>
              Second, if our team notices any inappropriate behavior on your end, such as threatening, bullying, swearing, or any other conduct, reasonably interpreted to be demeaning or offensive, your account will be closed.
            </p>
            <p>
              Finally, we do regular monitoring of inactive accounts. If your account has been inactive for more than twelve (12) months, it may be deleted from our system. Rest assured that we will contact you before it is deleted to confirm. 
            </p>

            <h4>How do I submit feedback to Kuprik?</h4>
            <p>
              We always welcome feedback and suggestions. We want to know what's working and what's not working for you on Kuprik. You can share your thoughts with us <span className="about__link" onClick={() => history.push("/feedback")}>here</span>. When submitting the form, please select <span className="about__text_font_italic">Feedback</span>.
            </p>

          </div>
        </div>
      </div>
    </DocumentTitle>
  );
};

export default AboutPage;
