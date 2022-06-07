import * as React from 'react';
import * as moment from 'moment';
import Button from '../../../components/UI/Button';
import { ProjectStatus } from '../../../components/ProjectStatus';
import { connect } from 'react-redux';
import { extendProject, fetchProject } from '../../../store/actions/projectsActions';
import Preloader from '../../../components/Preloader';
import { MMM_DD_YYYY_FORMAT, ROLES } from '../../../common/constants';
import ExtendProjectForm from '../../../components/Form/ExtendProjectForm';
import Notify from '../../../components/Notification';
import { centToUSD, forceDownloadFileFromUrl } from '../../../helpers';
import { MAX_EXTEND_NUMBER } from '../../../common/dicts';
import UrgentNotificationIcon from '../../../components/UI/Icons/NotificationIcons/UrgentNotificationIcon';
import _ from 'lodash';
import * as classnames from 'classnames';
import './index.scss';

class DetailSection extends React.Component {
  
  onExtendProject = async date => {
    try {
      const result = await this.props.extendProject({
        project: this.props.projectId,
        end_date: date
      });

      if (result && result.status === 201) {
        return this.props.fetchProject(this.props.projectId);
      }
      throw new Error(result?.data?.non_field_errors[0] || '');
    } catch (e) {
      Notify.info({ text: `Could not extend date. ${e.message}` });
      return Promise.reject();
    }
  };

  componentDidMount() {
    this.props.fetchProject(this.props.projectId);
  }

  getCorrectOrderNumber = (idx, max) => {
    return Math.abs(idx - max);
  };

  render() {
    const { loading, data } = this.props.project;
    const isCustomer = this.props.user.role === ROLES.customer;

    if (loading) {
      return <Preloader className="k-block project_detail_summary__preloader" />;
    }

    if (!data) {
      return null;
    }

    const {
      id,
      status,
      title,
      description,
      attachments,
      created_at,
      end_date,
      rate,
      cost,
      grand_total,
      extensions,
      cancellation,
      original_due_date,
      vendor_review,
      initial_payment,
      final_payment,
      final_payment_status
    } = data;

    const alreadyCancelled = status === 'CANCELLED';
    const cancelledByMe = cancellation && cancellation.cancelled_by.id === this.props.user.id;

    return (
      <div className="project_detail_summary__wrapper">
        <div className="k-block project_detail_summary">
          <div className="project_detail_summary__header">
            <div className="project_detail__subtitle">Summary</div>
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
                    this.props.toggleCancelModal(true);
                  }}
                />
              ) : null}
            </div>
          </div>

          <div className="project_detail_summary__part1">
            <div className="project_detail_summary__row">
              <div className="project_detail_summary__col1">Project Number</div>
              <div className="project_detail_summary__col2">{id}</div>
            </div>

            <div className="project_detail_summary__row">
              <div className="project_detail_summary__col1">Project Title</div>
              <div className="project_detail_summary__col2">{title}</div>
            </div>

            <div className="project_detail_summary__row">
              <div className="project_detail_summary__col1">Project requirements and details</div>
              <div className="project_detail_summary__col2">{description}</div>
            </div>

            <div className="project_detail_summary__row">
              <div className="project_detail_summary__col1 center">Attachments</div>
              <div className="project_detail_summary__col2">
                <div className="project_detail_summary__attachments">
                  {attachments &&
                    attachments.map(file => (
                      <a
                        key={file.id}
                        download={file.file}
                        target="_blank"
                        href={file.file}
                        className="chat_message__attachment"
                        rel="noopener noreferrer"
                        title={file.name}
                        onClick={async event => {
                          event.preventDefault();
                          event.nativeEvent.stopImmediatePropagation();
                          await forceDownloadFileFromUrl(file.file, file.name);
                        }}
                      >
                        <span>{file.name}</span>
                        <svg
                          width="12"
                          height="13"
                          viewBox="0 0 12 13"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clipPath="url(#clip0)">
                            <path
                              d="M6.10547 7.48047C6.36436 7.48047 6.57422 7.27061 6.57422 7.01172V1.26953C6.57422 1.01064 6.36436 0.800781 6.10547 0.800781C5.84658 0.800781 5.63672 1.01064 5.63672 1.26953V7.01172C5.63672 7.27061 5.84658 7.48047 6.10547 7.48047Z"
                              fill="#044C5A"
                            />
                            <path
                              d="M1.60234 11.6012C1.60234 11.8221 1.87882 12.0012 2.21989 12.0012L9.7848 12.0012C10.1259 12.0012 10.4023 11.8221 10.4023 11.6012C10.4023 11.3803 10.1259 11.2012 9.7848 11.2012L2.21989 11.2012C1.87882 11.2012 1.60234 11.3803 1.60234 11.6012Z"
                              fill="#044C5A"
                            />
                            <path
                              d="M5.08529 9.40996C5.08609 9.41075 5.08686 9.41155 5.08766 9.41235C5.3619 9.68659 5.72209 9.82365 6.08228 9.82365C6.44218 9.82365 6.80204 9.68673 7.07575 9.413L9.67065 6.82822C9.85407 6.64553 9.85466 6.34874 9.67197 6.16532C9.48927 5.98192 9.19248 5.98131 9.00906 6.16401L6.4135 8.74944C6.32495 8.83797 6.20725 8.88674 6.08204 8.88674C5.95729 8.88674 5.83996 8.83834 5.75153 8.7504L3.20493 6.16703C3.02319 5.98265 2.72638 5.98054 2.54202 6.16227C2.35766 6.34401 2.35553 6.64079 2.53726 6.82518L5.08529 9.40996Z"
                              fill="#044C5A"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0">
                              <rect width="12" height="12.8" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      </a>
                    ))}
                </div>
              </div>
            </div>
          </div>

          <div className="project_detail_summary__part2">
            <div className="project_detail__subtitle">Terms</div>
            <div className="project_detail_summary__item">
              <div className="project_detail_summary__item_title">Project Due Date</div>
              <div className="project_detail_summary__item_content">
                <div className="project_detail_summary__col">
                  <div className="project_detail_summary__col1">Start Date</div>
                  <div className="project_detail_summary__col2">
                    <span className="detail_subtitle">
                      {moment(created_at).format(MMM_DD_YYYY_FORMAT)}
                    </span>
                  </div>
                </div>

                <div className="project_detail_summary__col">
                  <div className="project_detail_summary__col1">Original Due Date</div>
                  <div className="project_detail_summary__col2">
                    <span className="detail_subtitle">
                      {moment(original_due_date || end_date).format(MMM_DD_YYYY_FORMAT)}
                    </span>
                  </div>
                </div>

                <div className="project_detail_summary__col">
                  <div className="project_detail_summary__col1">End Date</div>
                  <div className="project_detail_summary__col2">
                    <span className="detail_subtitle">
                      {moment(end_date).format(MMM_DD_YYYY_FORMAT)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="project_detail_summary__item">
              <div className="project_detail_summary__item_title">Project Cost</div>
              <div className="project_detail_summary__item_content">
                <div className="project_detail_summary__col">
                  <div className="project_detail_summary__col1">Agreed Rate</div>
                  <div className="project_detail_summary__col2">
                    <span className="detail_subtitle">{`$${rate}`}</span>
                  </div>
                </div>
                <div className="project_detail_summary__col">
                  <div className="project_detail_summary__col1">Agreed Total</div>
                  <div className="project_detail_summary__col2">
                    <span className="detail_subtitle">{`$${centToUSD(cost || grand_total)}`}</span>
                  </div>
                </div>
                <div className="project_detail_summary__col">
                  <div className="project_detail_summary__col1">Initial Payment</div>
                  <div className="project_detail_summary__col2">
                    <span className="detail_subtitle">{`$${centToUSD(initial_payment)}`}</span>
                  </div>
                </div>
                <div className="project_detail_summary__col">
                  <div className="project_detail_summary__col1">Final Payment</div>
                  <div className="project_detail_summary__col2">
                    {final_payment_status === 'PAID' ? (
                      <span className="detail_subtitle">{`$${centToUSD(final_payment)}`}</span>
                    ) : (
                      <span className="detail_subtitle tbd">TBD</span>
                    )}
                  </div>
                </div>
                <div className="project_detail_summary__col">
                  <div className="project_detail_summary__col1">Actual Total</div>
                  <div className="project_detail_summary__col2">
                    {final_payment_status === 'PAID' ? (
                      <span className="detail_subtitle">{`$${centToUSD(
                        initial_payment + final_payment
                      )}`}</span>
                    ) : (
                      <span className="detail_subtitle tbd">TBD</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="project_detail_summary__cancel">
            <Button
              label="Cancel Project"
              disabled={!_.isNil(cancellation) || Boolean(vendor_review) || status === 'COMPLETED'}
              onClick={() => {
                this.props.toggleCancelModal(true);
              }}
            />
          </div>
        </div>

        {!alreadyCancelled ? (
          <div className="k-block project_detail_ext_date">
            <div className="project_detail__subtitle">
              {this.props.user.role !== ROLES.vendor ? 'Extend' : 'Extended'} due date
            </div>
            <p className="project_detail__icon project_detail__icon_white" />
            <p className="project_detail__describe">
              Due date of a project can be extended up to three (3) times not to exceed six (6)
              months in total. If the project is anticipated to last longer than six (6) months, we
              recommend to break it down into multiple projects. If a due date is missed, both
              customer and vendor will be notified. The system will keep the project open until an
              action from either party is taken.
            </p>
            {extensions &&
              extensions.length < MAX_EXTEND_NUMBER &&
              this.props.user.role !== ROLES.vendor &&
              status === 'IN_PROGRESS' &&
              !vendor_review && (
                <ExtendProjectForm
                  extensions={extensions}
                  onSubmit={this.onExtendProject}
                  cancellation={cancellation}
                />
              )}

            {this.props.user &&
              (this.props.user.role === ROLES.vendor ||
                (this.props.user.role === ROLES.customer &&
                  (status !== 'IN_PROGRESS' || vendor_review))) &&
              !extensions?.length && (
                <div className="project_detail_ext_date__nodate">
                  Due date has not been extended
                </div>
              )}

            {extensions && extensions.length > 0 && (
              <div className="project_detail_ext_date__history">
                {extensions
                  .map((extension, idx) => {
                    return (
                      <div className="project_detail_summary__col" key={idx}>
                        <div className="project_detail_summary__col1">
                          Extended Date {this.getCorrectOrderNumber(idx, extensions.length)}
                        </div>
                        <div className="project_detail_summary__col2">
                          <span className="detail_subtitle">
                            {moment(extension.end_date).format(MMM_DD_YYYY_FORMAT)}
                          </span>
                        </div>
                      </div>
                    );
                  })
                  .reverse()}
              </div>
            )}
          </div>
        ) : (
          <div className="project_detail_cancel k-block">
            <div className="project_detail_cancel__cancellation">
              <div className="project_detail__subtitle">Cancellation</div>

              <div className="project_detail_cancel__row">
                <div className="project_detail_summary__col1">Cancelled by</div>
                <div className="project_detail_summary__col2">
                  {cancellation.cancelled_by.full_name}{' '}
                  <span className="k-capitalize">({cancellation.cancelled_by.role})</span>
                </div>
              </div>

              <div className="project_detail_cancel__row">
                <div className="project_detail_summary__col1">Reason for Cancellation</div>
                <div className="project_detail_summary__col2">{cancellation.reason}</div>
              </div>
              <div className="project_detail_cancel__row">
                <div className="project_detail_summary__col1">Message</div>
                <div className="project_detail_summary__col2">
                  <p className="project_detail__describe project_detail__message">
                    {cancellation.more_details}
                  </p>
                </div>
              </div>
            </div>

            <div className="project_detail_cancel__refund">
              <div className="project_detail__subtitle">{isCustomer ? "Refund" : "Payment"}</div>
              <p className="project_detail_summary__col3">
                {
                  isCustomer
                  ? `Kuprik team reviews cancelled projects manually. You will be assigned a team member
                  to work with you and will be contacted via email. It takes no longer than 14 days to
                  process cancellations and issue refunds and/or payments, when appropriate.`
                  : `Kuprik team reviews cancelled projects manually. You will be assigned a team member
                  to work with you and will be contacted via email. It takes no longer than 14 days to
                  process cancellations and issue payments and/or refunds, when appropriate.`
                }
              </p>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.userStore.user,
  project: state.projectStore.project
});

const mapDispatchToProps = dispatch => ({
  fetchProject: id => dispatch(fetchProject(id)),
  extendProject: data => dispatch(extendProject(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(DetailSection);
