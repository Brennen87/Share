import React from 'react';
import * as classnames from 'classnames';
import DocumentTitle from '../../components/DocumentTitle';
import DetailSection from '../../containers/ProjectDetail/Detail';
import DeliverySection from '../../containers/ProjectDetail/Delivery';
import ExtraPaymentSection from '../../containers/ProjectDetail/ExtraPayment';
import { setChatID } from '../../store/actions/inboxActions';
import Button from '../../components/UI/Button';
import { connect } from 'react-redux';
import Avatar from '../../components/Avatar';
import { PROJECT_STATUSES, ROLES } from '../../common/constants';
import './index.scss';
import Notify from '../../components/Notification';
import Modal from '../../components/UI/Modal';
import CancelProjectForm from '../../containers/CancelProjectModal';
import CancelProjectSuccessModal from '../../containers/CancelProjectSuccessModal';
import { cancelProject, fetchProject } from '../../store/actions/projectsActions';

const TABS = { details: 'details', review: 'review', payments: 'payments' };

const CustomerTabs = [
  {
    name: 'Project Details',
    id: TABS.details
  },
  {
    name: 'Accept and review',
    id: TABS.review
  },
  {
    name: 'Final Payment',
    id: TABS.payments
  }
];

const VendorTabs = [
  {
    name: 'Project Details',
    id: TABS.details
  },
  {
    name: 'Deliver and Review',
    id: TABS.review
  },
  {
    name: 'Final Payment',
    id: TABS.payments
  }
];

class ProjectDetailPage extends React.Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    Number.isNaN(id) && this.props.history.push('/notfound');
  }

  state = {
    tabId: TABS.details,
    showCancel: false,
    showSuccess: false,
    justReviewedCustomer: false
  };

  toggleCancelModal = bool => {
    bool === undefined
      ? this.setState({ showCancel: !this.state.showCancel })
      : this.setState({ showCancel: bool });
  };

  onCancelProject = async values => {
    const { vendor_review, customer_review, id: projectId } = this.props.projectData;
    const isCustomer = this.props.user.role === ROLES.customer;
    const review = isCustomer ? vendor_review : customer_review;

    const payload = {
      project: projectId,
      wipeData: values.wipeData,
      more_details: values.more_details
    };

    if (values.reason) {
      payload.reason = values.reason;
    }

    if (!review) {
      payload.review = {
        rating: values.rate,
        comment: values.comment
      };
    }

    const res = await this.props.cancelProject(payload);
    if (res && res.status === 200) {
      this.props.fetchProject(projectId);
      this.setState({ showSuccess: true });
    } else if (res && res.status === 400) {
      Notify.info({
        text:
          (res && res.data.non_field_errors && res.data.non_field_errors[0]) ||
          'Could not cancel project. Try again later'
      });
    }

    this.toggleCancelModal(false);
  };

  setTab = tabId => this.setState({ tabId });

  goToProjectChat(chatId) {
    if (chatId) {
      const isClosed = ['CANCELLED', 'COMPLETED'].includes(this.props.projectData?.status);
      this.props.setChatID(chatId, isClosed);
    }
    this.props.history.push('/inbox');
  }

  redirectToProfile = (username, role = ROLES.customer, scrollToID) => {
    username &&
      this.props.history.push(`/${role}/${username}${scrollToID ? `?to=${scrollToID}` : ''}`);
  };

  render() {
    const { route, match, history, projectData, user } = this.props;
    const isCustomer = user && user.role === ROLES.customer;
    const partner = isCustomer ? projectData?.vendor : projectData?.customer;

    return (
      <DocumentTitle title={route.pageTitle}>
        <div className="container">
          <div className="project_detail">
            <div className="project_detail__inner">
              <div className="project_detail__menu">
                <div className="project_detail__menu__left">
                  <div className="project_detail__vendor">
                    <div className="project_detail__vendor__left">
                      <Avatar
                        online={partner?.online}
                        image={partner?.avatar}
                        alt={partner?.full_name}
                      />
                    </div>
                    <div className="project_detail__vendor__right">
                      <div
                        className="project_detail__vendor__fullname"
                        onClick={() =>
                          this.redirectToProfile(
                            partner && partner.username,
                            isCustomer ? ROLES.vendor : ROLES.customer,
                            'review'
                          )
                        }
                      >
                        {partner?.full_name}
                      </div>
                      <div className="project_detail__vendor__status">
                        {`${isCustomer ? 'Vendor' : 'Customer'}`}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="project_detail__menu__right">
                  {(isCustomer ? CustomerTabs : VendorTabs).map(tab => (
                    <div
                      key={tab.id}
                      className={classnames(
                        'project_detail__menu_item',
                        this.state.tabId === tab.id && 'project_detail__menu_item_active'
                      )}
                      onClick={() => this.setTab(tab.id)}
                    >
                      {tab.name}
                    </div>
                  ))}
                </div>
              </div>

              <div className="project_detail__content">
                {this.state.tabId === TABS.details && (
                  <DetailSection
                    projectId={match.params.id}
                    history={history}
                    toggleCancelModal={this.toggleCancelModal}
                  />
                )}
                {this.state.tabId === TABS.payments && (
                  <ExtraPaymentSection
                    projectId={match.params.id}
                    history={history}
                    toggleCancelModal={this.toggleCancelModal}
                    justReviewedCustomer={this.state.justReviewedCustomer}
                    isCustomer={isCustomer}
                  />
                )}
                {this.state.tabId === TABS.review && (
                  <DeliverySection
                    projectId={match.params.id}
                    history={history}
                    toggleCancelModal={this.toggleCancelModal}
                    onCustomerReview={() => {
                      this.setState({ justReviewedCustomer: true });
                    }}
                  />
                )}

                <div className="project_detail__buttons">
                  <Button
                    label="Go to Projects"
                    onClick={() => this.props.history.push('/projects')}
                  />
                  {projectData?.chat_room_id && (
                    <Button
                      label="Go to Inbox"
                      onClick={() => this.goToProjectChat(projectData.chat_room_id)}
                    />
                  )}
                </div>
              </div>
            </div>

            {projectData ? (
              <>
                {this.state.showCancel &&
                  projectData.status !== PROJECT_STATUSES.CANCELLED.toUpperCase() && (
                    <Modal onClose={() => this.toggleCancelModal(false)}>
                      <CancelProjectForm
                        close={this.toggleCancelModal}
                        onSubmit={this.onCancelProject}
                        isCustomer={isCustomer}
                        review={projectData.review}
                        cancellation={projectData.cancellation}
                        status={projectData.status}
                      />
                    </Modal>
                  )}
                {this.state.showSuccess && (
                  <Modal onClose={() => this.setState({ showSuccess: false })}>
                    {projectData.status === 'CANCELLED' ? (
                      <CancelProjectSuccessModal
                        title="Cancellation Confirmed"
                        description="You confirmed the project cancellation request. The project has been successfully cancelled. Kuprik will notify you of refund/payment if applicable on this project once the cancellation is processed by our team."
                        handleClick={() => this.props.history.push('/projects')}
                      />
                    ) : (
                      <CancelProjectSuccessModal
                        title="Pending Cancellation"
                        description={`Your request has been sent to the ${
                          isCustomer ? 'vendor' : 'customer'
                        } and is pending cancellation.`}
                        handleClick={() => this.props.history.push('/projects')}
                      />
                    )}
                  </Modal>
                )}
              </>
            ) : null}
          </div>
        </div>
      </DocumentTitle>
    );
  }
}

const mapStateToProps = state => ({
  projectData: state.projectStore.project.data,
  user: state.userStore.user
});

const mapDispatchToProps = dispatch => ({
  setChatID: (id, chatIsClosed) => dispatch(setChatID(id, chatIsClosed)),
  cancelProject: data => dispatch(cancelProject(data)),
  fetchProject: id => dispatch(fetchProject(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetailPage);
