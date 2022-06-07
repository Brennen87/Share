import React from 'react';
import { DeliveryCard } from '../../../components/Cards/DeliveryCard';
import ReviewForm from '../../../components/Form/ReviewForm';
import { connect } from 'react-redux';
import {
  fetchDelivery,
  postDelivery,
  postProjectReview
} from '../../../store/actions/projectsActions';
import Preloader from '../../../components/Preloader';
import { MM__DD_YYYY_HH_MM_A, PROJECT_STATUSES, ROLES } from '../../../common/constants';
import Avatar from '../../../components/Avatar';
import { getFullName } from '../../../helpers';
import StarRating from 'react-svg-star-rating';
import { RATING_STARS_COUNT, RATING_STARS_SIZE } from '../../../common/dicts';
import DeliveryForm from '../../../components/Form/DeliveryForm';
import { uploadFile } from '../../../store/actions/fileActions';
import { ProjectStatus } from '../../../components/ProjectStatus';
import UrgentNotificationIcon from '../../../components/UI/Icons/NotificationIcons/UrgentNotificationIcon';
import moment from 'moment';
import * as classnames from 'classnames';
import './index.scss';

class DeliverySection extends React.Component {
  componentDidMount() {
    this.props.fetchDelivery(this.props.projectId);
  }

  onDeliver = async (data, { setSubmitting }) => {
    await this.props.postDelivery({
      project: this.props.projectId,
      attachments: data.attachments.map(item => ({ file: item.id })),
      text: data.message
    });

    setSubmitting(false);
  };

  reviewSubmit = async ({ rate, message }) => {
    const isCustomer = this.props.user.role === ROLES.customer;
    await this.props.postProjectReview(isCustomer, {
      rating: rate,
      comment: message,
      project: this.props.projectId
    });
    if (!isCustomer) {
      this.props.onCustomerReview();
    }
  };

  render() {
    const { loading, data } = this.props.delivery;
    const { data: projectData } = this.props.project;

    if (loading) {
      return <Preloader className="k-block project_delivery__preloader" />;
    }

    if (!data) {
      return null;
    }

    const { delivery } = data;

    const isCustomer = this.props.user.role === ROLES.customer;
    if (delivery?.length) {
      delivery.sort((a, b) => (a.created_at < b.created_at ? -1 : 1));
    }

    return isCustomer ? (
      <CustomerDeliveryBlock
        reviewSubmit={this.reviewSubmit}
        project={projectData}
        toggleCancelModal={this.props.toggleCancelModal}
        user={this.props.user}
        {...data}
      />
    ) : (
      <VendorDeliveryBlock
        reviewSubmit={this.reviewSubmit}
        dispatchUploadFile={this.props.dispatchUploadFile}
        onDeliver={this.onDeliver}
        project={projectData}
        toggleCancelModal={this.props.toggleCancelModal}
        user={this.props.user}
        {...data}
      />
    );
  }
}

function CustomerDeliveryBlock({
  delivery,
  vendor_review,
  reviewSubmit,
  project,
  toggleCancelModal,
  user
}) {
  const isEmpty = delivery && !delivery.length;
  const { status, cancellation } = project;
  const cancelledByMe = cancellation && cancellation.cancelled_by.id === user.id;

  return (
    <div className="project_delivery k-block">
      <div className="project_detail_summary__header">
        <h3 className="project_delivery__title">Accept and review</h3>
        <div className="project_detail__status_container">
          <ProjectStatus
            realValue
            status={status}
            mustIndent={status === 'PENDING_CANCELLATION' && !cancelledByMe}
            className={classnames(
              'project_detail__status',
              status === 'PENDING_CANCELLATION' && !cancelledByMe && 'indent'
            )}
          />
          {status === 'PENDING_CANCELLATION' && !cancelledByMe ? (
            <UrgentNotificationIcon
              style={{ position: 'absolute', top: '-6px', right: 0, cursor: 'pointer' }}
              onClick={() => {
                toggleCancelModal(true);
              }}
            />
          ) : null}
        </div>
      </div>

      <div className="project_delivery__rules">
        <span className="project_delivery__rules_icon" />
        <p className="project_delivery__rules_text">
          Here you can see all the deliverables submitted by the vendor. If you are satisfied with
          the deliverable, you need to click on the{' '}
          <span className="project_delivery__rules_text_font_italic">Accept and Review</span> button
          to start the final payment process. If you are not satisfied with your deliverable, you
          can ask for revisions. Kuprik does not limit how many times a deliverable can be revised
          and resubmitted. However, your vendor might have a limit on the number of revisions. In
          the case you want revisions, please click on the{' '}
          <span className="project_delivery__rules_text_font_italic">Go to Inbox</span> button to
          communicate your wishes to the vendor.
        </p>
      </div>

      {isEmpty && (
        <div className="project_delivery__empty">
          <p className="project_delivery__empty_text">No deliverables were submitted</p>
        </div>
      )}

      {!isEmpty && (
        <div className="project_delivery__deliveries">
          {delivery.map(({ id, vendor, text, attachments, created_at }) => {
            return (
              <DeliveryCard
                key={id}
                className="project_delivery__card"
                vendor={vendor}
                message={text}
                datetime={created_at}
                attachments={attachments}
              />
            );
          })}
        </div>
      )}

      {!project.cancellation ? (
        <>
          {!isEmpty && !vendor_review && (
            <ReviewForm isCustomer onSubmit={reviewSubmit} className="project_delivery__review" />
          )}
        </>
      ) : null}

      {vendor_review && (
        <div className="project_delivery__author_review">
          <div className="project_delivery__author_review__title">Your Review</div>
          <div className="project_delivery__reviewer">
            <div className="project_delivery__reviewer__inner">
              <Avatar
                image={vendor_review.created_by.avatar}
                alt={getFullName(
                  vendor_review.created_by.first_name,
                  vendor_review.created_by.last_name
                )}
              />
              <div className="project_delivery__reviewer__content">
                <div className="project_delivery__reviewer__fullname">
                  {getFullName(
                    vendor_review.created_by.first_name,
                    vendor_review.created_by.last_name
                  )}
                  <span>{moment(vendor_review.created_at).format(MM__DD_YYYY_HH_MM_A)}</span>
                </div>
                <div
                  className="project_delivery__reviewer__rate"
                  title={
                    vendor_review.rating
                      ? Number(vendor_review.rating).toFixed(1)
                      : vendor_review.rating
                  }
                >
                  <StarRating
                    initialRating={Math.round(vendor_review.rating * 2) / 2}
                    size={RATING_STARS_SIZE}
                    count={RATING_STARS_COUNT}
                    activeColor="#FF8C00"
                    isHalfRating
                    isReadOnly
                  />
                </div>
                <div className="project_delivery__reviewer__text">
                  {vendor_review.comment || ''}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function VendorDeliveryBlock({
  delivery,
  customer_review,
  vendor_review,
  project_status,
  reviewSubmit,
  dispatchUploadFile,
  onDeliver,
  project,
  user,
  toggleCancelModal
}) {
  const scrollAreaRef = React.useRef();
  const isEmpty = delivery && !delivery.length;
  const isClosed =
    project_status === PROJECT_STATUSES.COMPLETED.toUpperCase() ||
    project_status === PROJECT_STATUSES.CANCELLED.toUpperCase() ||
    project_status === 'PENDING_CANCELLATION';

  React.useEffect(() => {
    if (!isEmpty) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [isEmpty, delivery]);
  const { status, cancellation } = project;
  const cancelledByMe = cancellation && cancellation.cancelled_by.id === user.id;

  return (
    <div className="project_delivery k-block">
      <div className="project_detail_summary__header">
        <h3 className="project_delivery__title">Deliver and review</h3>
        <div
          className={classnames(
            'project_detail__status_container',
            status === 'PENDING_CANCELLATION' && !cancelledByMe && 'notification'
          )}
        >
          <ProjectStatus 
            className="project_detail__status" 
            status={status} 
            mustIndent={status === 'PENDING_CANCELLATION' && !cancelledByMe}
            realValue
          />
          {status === 'PENDING_CANCELLATION' && !cancelledByMe ? (
            <UrgentNotificationIcon
              style={{ position: 'absolute', top: '-6px', right: 0, cursor: 'pointer' }}
              onClick={() => {
                toggleCancelModal(true);
              }}
            />
          ) : null}
        </div>
      </div>
      <div className="project_delivery__rules">
        <span className="project_delivery__rules_icon" />
        <p className="project_delivery__rules_text">
          This is where you submit the deliverables to the customer. If the customer is satisfied,
          the deliverable is accepted, and the final payment process is started. If the customer is
          not satisfied with the deliverable, they can ask for revisions. Kuprik does not limit how
          many times a deliverable can be revised and resubmitted. In the case the customer wants
          revisions, they need to communicate that to you via{' '}
          <span className="project_delivery__rules_text_font_italic">Inbox-Projects</span>.
        </p>
      </div>

      {!isEmpty && (
        <>
          <div className="project_delivery__deliveries" ref={scrollAreaRef}>
            {delivery.map(({ id, vendor, text, attachments, created_at }) => {
              return (
                <DeliveryCard
                  key={id}
                  className="project_delivery__card"
                  vendor={vendor}
                  message={text}
                  datetime={created_at}
                  attachments={attachments}
                />
              );
            })}
          </div>
        </>
      )}
      {isEmpty && status !== 'IN_PROGRESS' && (
        <div className="project_delivery__empty">
          <p className="project_delivery__empty_text">No deliverables were submitted</p>
        </div>
      )}
      {!project.cancellation ? (
        <>
          {!isClosed && !vendor_review && (
            <DeliveryForm
              className={isEmpty && 'project_delivery__form'}
              uploadFile={dispatchUploadFile}
              onSubmit={onDeliver}
              deliveries={delivery}
            />
          )}

          {!customer_review && vendor_review && (
            <ReviewForm
              isCustomer={false}
              onSubmit={reviewSubmit}
              className="project_delivery__review"
            />
          )}
        </>
      ) : null}

      {customer_review && (
        <div className="project_delivery__author_review">
          <div className="project_delivery__author_review__title">Your Review</div>
          <div className="project_delivery__reviewer">
            <div className="project_delivery__reviewer__inner">
              <Avatar
                image={customer_review.created_by.avatar}
                alt={getFullName(
                  customer_review.created_by.first_name,
                  customer_review.created_by.last_name
                )}
              />
              <div className="project_delivery__reviewer__content">
                <div className="project_delivery__reviewer__fullname">
                  {getFullName(
                    customer_review.created_by.first_name,
                    customer_review.created_by.last_name
                  )}
                  <span>{moment(customer_review.created_at).format(MM__DD_YYYY_HH_MM_A)}</span>
                </div>
                <div
                  className="project_delivery__reviewer__rate"
                  title={
                    customer_review.rating
                      ? Number(customer_review.rating).toFixed(1)
                      : customer_review.rating
                  }
                >
                  <StarRating
                    initialRating={Math.round(customer_review.rating * 2) / 2}
                    size={RATING_STARS_SIZE}
                    count={RATING_STARS_COUNT}
                    activeColor="#FF8C00"
                    isHalfRating
                    isReadOnly
                  />
                </div>
                <div className="project_delivery__reviewer__text">
                  {customer_review.comment || ''}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = state => ({
  user: state.userStore.user,
  delivery: state.projectStore.delivery,
  project: state.projectStore.project
});

const mapDispatchToProps = dispatch => ({
  fetchDelivery: id => dispatch(fetchDelivery(id)),
  postDelivery: delivery => dispatch(postDelivery(delivery)),
  postProjectReview: (isCustomer, review) => dispatch(postProjectReview(isCustomer, review)),
  dispatchUploadFile: file => dispatch(uploadFile(file))
});

export default connect(mapStateToProps, mapDispatchToProps)(DeliverySection);
