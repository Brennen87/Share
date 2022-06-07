import * as React from 'react';
import * as classnames from 'classnames';
import { connect } from 'react-redux';
import Preloader from '../../../components/Preloader';
import {
  createPaymentIntent,
  acceptPaymentIntent,
  fetchExtraPayments,
  fetchProject as fetchProjectAction
} from '../../../store/actions/projectsActions';
import { fetchCountries } from '../../../store/actions/externalActions';
import ExtraPayment from './form';
import { centToUSD, converseToNumber, accountingFormat } from '../../../helpers';
import { ProjectStatus } from '../../../components/ProjectStatus';
import UrgentNotificationIcon from '../../../components/UI/Icons/NotificationIcons/UrgentNotificationIcon';
import './index.scss';
import { ROLES } from '../../../common/constants';
import InputTextFieldSmall from '../../../components/UI/InputTextFieldSmall/index';
import Button from '../../../components/UI/Button/index';
import Notify from '../../../components/Notification/index';

class ExtraPaymentSection extends React.Component {
  state = {
    requestedFinalPayment: '',
    editingRequestedFinalPayment: false,
    paymentJustFinished: false,
    waitingForStatusChange: false
  };

  componentDidMount() {
    this.props.fetchCountries();
    this.props.fetchExtraPayments(this.props.projectId);
  }

  componentDidUpdate(previousProps, previousState) {
    const { data: currentExtraPayments } = this.props.extraPayments;
    const { data: previousExtraPayments } = previousProps.extraPayments;

    if (currentExtraPayments && currentExtraPayments.list.length) {
      const { cost } = currentExtraPayments.list[0];
      const freshRequestedPayment = accountingFormat(cost / 100).toString();
      const oldRequestedPayment = accountingFormat(previousState.requestedFinalPayment);

      if (
        freshRequestedPayment !== oldRequestedPayment &&
        previousExtraPayments !== currentExtraPayments
      ) {
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({ requestedFinalPayment: freshRequestedPayment });
      }
    }
  }

  render() {
    const { loading, data } = this.props.extraPayments;
    const { data: project, loading: projectLoading } = this.props.project;
    const { data: delivery, loading: deliveryLoading } = this.props.delivery;

    if (loading || projectLoading || deliveryLoading || this.state.waitingForStatusChange) {
      return <Preloader className="k-block project_detail__ext_payment__preloader" />;
    }

    if (!data) {
      return null;
    }

    const {
      status,
      cancellation,
      rate,
      cost,
      grand_total,
      initial_payment,
      final_payment_status,
      final_payment,
      customer_review
    } = project;
    const cancelledByMe = cancellation && cancellation.cancelled_by.id === this.props.user.id;

    return (
      <div className="project_detail__ext_payment k-block">
        <div className="project_detail_summary__header">
          <h3 className="project_detail__ext_payment__title">{this.props.isCustomer ? "Make final payment" : "Request Final Payment"}</h3>
          <div
            className={classnames(
              'project_detail__status_container',
              status === 'PENDING_CANCELLATION' && !cancelledByMe && 'notification'
            )}
          >
            <ProjectStatus
              realValue
              status={status}
              mustIndent={status === 'PENDING_CANCELLATION' && !cancelledByMe}
              className="project_detail__status"
            />
            {status === 'PENDING_CANCELLATION' && !cancelledByMe ? (
              <UrgentNotificationIcon
                style={{ position: 'absolute', top: '-6px', right: 0, cursor: 'pointer' }}
                onClick={() => {
                  this.props.toggleCancelModal(true);
                }}
              />
            ) : null}
          </div>
        </div>
        <div className="project_detail__describe_wrap">
          <span className="project_delivery__rules_icon" />
          <p className="project_detail__describe">
            {
              this.props.isCustomer
              ? "Once you review and accept the deliverable from the vendor, you will make the final payment unless the project is cancelled. When you accept the deliverable, the vendor needs to send the final payment request for your review. The vendor ensures that all the changes to the scope are reflected in the final payment request. You are then to make the final payment."
              : "Final payment is made to you once the customer accepts the deliverable unless the project is cancelled. When the customer accepts the deliverable, you will need to rate and submit the review for the customer before you can request the final payment. Please ensure that all the changes to the scope are reflected in this request. The customer will then be required to make the final payment."
            }
          </p>
        </div>

        <div className="payment_details">
          {final_payment_status !== 'PAID' && !this.state.paymentJustFinished ? (
            <>
              <div className="project-cost">
                <h4 className="project-cost__title">Project cost</h4>

                <div className="project-cost__content">
                  <div className="project-cost__col">
                    <div className="project-cost__col1">Agreed Rate</div>
                    <div className="project-cost__col2">
                      <span className="detail_subtitle">{`$${rate}`}</span>
                    </div>
                  </div>
                  <div className="project-cost__col">
                    <div className="project-cost__col1">Agreed Total</div>
                    <div className="project-cost__col2">
                      <span className="detail_subtitle">{`$${centToUSD(
                        cost || grand_total
                      )}`}</span>
                    </div>
                  </div>
                  <div className="project-cost__col">
                    <div className="project-cost__col1">Initial Payment</div>
                    <div className="project-cost__col2">
                      <span className="detail_subtitle">{`$${centToUSD(initial_payment)}`}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="final-payment">
                <div className="final-payment__title">Final payment</div>

                <div className="final-payment__content">
                  <div className="final-payment__col">
                    {this.props.user.role === ROLES.customer ? (
                      <div className="final-payment__col2">
                        {final_payment_status === 'UNREQUESTED' ||
                        ['CANCELLED', 'PENDING_CANCELLATION'].includes(status) ? (
                          <span className="detail_subtitle tbd">TBD</span>
                        ) : (
                          <span className="detail_subtitle">{`$${centToUSD(
                            converseToNumber(this.state.requestedFinalPayment) * 100
                          )}`}</span>
                        )}
                      </div>
                    ) : (
                      <>
                        {this.state.editingRequestedFinalPayment ||
                        !this.state.requestedFinalPayment ? (
                          <div className="final-payment__col2 final-payment__col2--vendor">
                            <div className="final-payment__label">$</div>
                            <InputTextFieldSmall
                              onChange={e => {
                                this.setState({
                                  editingRequestedFinalPayment: true,
                                  requestedFinalPayment: e.target.value
                                });
                              }}
                              onBlur={e => {
                                this.setState({
                                  requestedFinalPayment: e.target.value.replace(
                                    /(\d.*\d)/g,
                                    match => accountingFormat(match, null)
                                  )
                                });
                              }}
                              value={this.state.requestedFinalPayment}
                              name="final_payment"
                              className="final-payment__input"
                              disabled={
                                !this.props.justReviewedCustomer &&
                                (['CANCELLED', 'PENDING_CANCELLATION'].includes(status) ||
                                  !customer_review)
                              }
                              row
                            />

                            <Button
                              label="Request"
                              className="final-payment__button"
                              onClick={() => {
                                const requestedValue = converseToNumber(
                                  this.state.requestedFinalPayment
                                );
                                if (
                                  !requestedValue ||
                                  Number.isNaN(requestedValue) ||
                                  requestedValue < 1
                                ) {
                                  return Notify.info({
                                    text: 'Please provide a valid number as the final payment.'
                                  });
                                }

                                this.props.createPaymentIntent({
                                  cost: Math.trunc(requestedValue * 100),
                                  project: project.id
                                });
                                this.setState({ editingRequestedFinalPayment: false });
                              }}
                              disabled={
                                !this.props.justReviewedCustomer &&
                                (['CANCELLED', 'PENDING_CANCELLATION'].includes(status) ||
                                  !customer_review)
                              }
                            />
                          </div>
                        ) : (
                          <div className="final-payment__col2 final-payment__col2--vendor">
                            <span className="detail_subtitle sent-in-requested-final-payment">{`$${centToUSD(
                              converseToNumber(this.state.requestedFinalPayment) * 100
                            )}`}</span>

                            <Button
                              label="Edit"
                              className="final-payment__button"
                              onClick={() => {
                                this.setState({ editingRequestedFinalPayment: true });
                              }}
                            />
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="project-cost--complete">
              <h4 className="project-cost__title">Project cost</h4>

              <div className="project-cost__content--complete">
                <div className="project-cost__col">
                  <div className="project-cost__col1">Agreed Rate</div>
                  <div className="project-cost__col2">
                    <span className="detail_subtitle">{`$${rate}`}</span>
                  </div>
                </div>
                <div className="project-cost__col">
                  <div className="project-cost__col1">Agreed Total</div>
                  <div className="project-cost__col2">
                    <span className="detail_subtitle">{`$${centToUSD(cost || grand_total)}`}</span>
                  </div>
                </div>
                <div className="project-cost__col">
                  <div className="project-cost__col1">Initial Payment</div>
                  <div className="project-cost__col2">
                    <span className="detail_subtitle">{`$${centToUSD(initial_payment)}`}</span>
                  </div>
                </div>
                <div className="project-cost__col">
                  <div className="project-cost__col1">Final Payment</div>
                  <div className="project-cost__col2">
                    <span className="detail_subtitle">{`$${centToUSD(final_payment)}`}</span>
                  </div>
                </div>
                <div className="project-cost__col">
                  <div className="project-cost__col1">Actual Total</div>
                  <div className="project-cost__col2">
                    <span className="detail_subtitle">{`$${centToUSD(
                      initial_payment + final_payment
                    )}`}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {project.final_payment_status !== 'PAID' && !this.state.paymentJustFinished ? (
          <ExtraPayment
            user={this.props.user}
            projectId={this.props.projectId}
            requestedFinalPayment={data.list.length ? data.list[0].cost : 0}
            countriesList={this.props.countriesList}
            createPaymentIntent={this.props.createPaymentIntent}
            acceptPaymentIntent={this.props.acceptPaymentIntent}
            onPaymentFinished={() => {
              this.setState({ waitingForStatusChange: true }, () => {
                setTimeout(() => {
                  this.props.fetchProject(this.props.projectId);
                  this.setState({ paymentJustFinished: true, waitingForStatusChange: false });
                }, 3000);
              });
            }}
            additionalPayments={data.list}
            cancellation={cancellation}
          />
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.userStore.user,
  project: state.projectStore.project,
  extraPayments: state.projectStore.extraPayments,
  countriesList: state.commonStore.countriesList,
  delivery: state.projectStore.delivery
});

const mapDispatchToProps = dispatch => ({
  fetchProject: id => dispatch(fetchProjectAction(id)),
  fetchExtraPayments: id => dispatch(fetchExtraPayments(id)),
  fetchCountries: () => dispatch(fetchCountries()),
  createPaymentIntent: data => dispatch(createPaymentIntent(data)),
  acceptPaymentIntent: data => dispatch(acceptPaymentIntent(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(ExtraPaymentSection);
