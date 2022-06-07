import * as React from 'react';
import { Attachment } from '../../UI/Attachment';
import { ATTACHMENTS_LIMIT_TEXT, MMM_DD_YYYY_FORMAT } from '../../../common/constants';
import SmallButton from '../../UI/SmallButton';
import moment from 'moment';
import Preloader from '../../Preloader';
import Modal from '../../UI/Modal';

export const ProjectCreateReview = ({
  project,
  payment,
  back,
  onSubmit,
  payMethod,
  removeAttachment,
  loading
}) => {
  const getCorrectDate = date => {
    const month = date.exp_month < 10 ? `0${date.exp_month}` : date.exp_month;
    return `${month}/${date.exp_year.toString().slice(2)}`;
  };

  return (
    <div className="project_create_review__wrapper">
      <div className="project_create_review">
        <div className="project_create_review__part1">
          <div className="project_create_review__summary">
            <div className="project_create_review__title">Summary</div>
            <div className="project_create_review__row">
              <div className="project_create_review__label">Vendor Name</div>
              <div>{(project.vendor && project.vendor.label) || ''}</div>
            </div>

            <div className="project_create_review__row">
              <div className="project_create_review__label">Project Title</div>
              <div>{project.title}</div>
            </div>

            <div className="project_create_review__row project_create_review__summary_desc">
              <div className="project_create_review__label">Project Requirements and Details</div>
              <p>{project.description}</p>
            </div>

            <div className="project_create_review__row">
              <div className="project_create_review__label project_create_review__summary_attachment_label">
                Attachments <span>({ATTACHMENTS_LIMIT_TEXT})</span>
              </div>
              <div className="project_create_review__attachments">
                {project.attachments.map(file => (
                  <Attachment
                    key={file.id}
                    title={file.name}
                    onRemove={() => removeAttachment(file.id)}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="project_create_review__terms">
            <div className="project_create_review__title">Terms</div>
            <div className="project_create_review__row project_create_review__terms_duedate">
              <div className="project_create_review__label">Due Date</div>
              <div className="project_create_review__value">
                {moment(project.dueDate).format(MMM_DD_YYYY_FORMAT)}
              </div>
            </div>

            <div className="project_create_review__row project_create_review__terms_payment">
              <div className="project_create_review__label project_create_review__label-agreed-terms">
                Payment Terms{' '}
                <span className="project_create_review__label--info">(For information only)</span>
              </div>
              <div className="project_create_review__terms_rate">
                <div className="project_create_review__row">
                  <div className="project_create_review__terms_rate__label">Agreed Rate</div>
                  <div className="project_create_review__terms_rate__value">${project.rate}</div>
                </div>

                <div className="project_create_review__row">
                  <div className="project_create_review__terms_rate__label">Agreed Total</div>
                  <div className="project_create_review__terms_rate__value">${project.cost}</div>
                </div>
              </div>
            </div>

            <div className="project_create_review__row project_create_review__terms_payment">
              <div className="project_create_review__label">
                Initial Payment{' '}
                <span className="project_create_review__label--info">
                  (The amount that you pay now to start the project)
                </span>
              </div>
              <div className="project_create_review__terms_rate project_create_review__terms_rate--initial">
                <div className="project_create_review__row">
                  <div className="project_create_review__terms_rate__value project_create_review__terms_rate__value--initial">
                    ${project.initialPayment}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="project_create_review__part2">
          <div className="project_create_review__billing">
            <div className="project_create_review__title">Billing Information</div>
            <div className="project_create_review__row">
              <div className="project_create_review__label">Address</div>
              <div className="project_create_review__value">{payment.address}</div>
            </div>
            <div className="project_create_review__row">
              <div className="project_create_review__label">City</div>
              <div className="project_create_review__value">{payment.city}</div>
            </div>
            <div className="project_create_review__row">
              <div className="project_create_review__label">Zip Code</div>
              <div className="project_create_review__value">{payment.zip}</div>
            </div>
            <div className="project_create_review__row">
              <div className="project_create_review__label">Country</div>
              <div className="project_create_review__value">
                {(payment.country && payment.country.label) || ''}
              </div>
            </div>
          </div>
          <div className="project_create_review__card">
            <div className="project_create_review__title">Credit / Debit Card</div>
            <div className="project_create_review__row">
              <div className="project_create_review__label">Name on Card</div>
              <div className="project_create_review__value">{payment.name}</div>
            </div>

            <div className="project_create_review__row">
              <div className="project_create_review__label">Card Number</div>
              <div className="project_create_review__value">
                {payMethod && payMethod.card && `**** **** **** ${payMethod.card.last4}`}
              </div>
            </div>

            <div className="project_create_review__row">
              <div className="project_create_review__label">Expiration Date</div>
              <div className="project_create_review__value">
                {payMethod && payMethod.card && getCorrectDate(payMethod.card)}
              </div>
            </div>
          </div>
        </div>

        {/* <div className="project_create_review__part3"> */}
        {/*  <div className="project_create_review__termsandservice">Terms of Service</div> */}
        {/* </div> */}
      </div>

      <div className="project_create_review__buttons">
        <SmallButton
          type="button"
          onClick={back}
          label="Back"
          className="project_create_review__button_back"
        />
        <SmallButton
          type="button"
          onClick={onSubmit}
          disabled={loading}
          label="Pay and Create"
          className="project_create_review__button_submit"
        />
      </div>

      {loading && (
        <Modal onClose={() => null}>
          <div className="processing">
            <div className="processing__inner">
              <p className="processing__title">Processing Payment</p>
              <Preloader />
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
