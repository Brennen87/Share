import * as React from 'react';
import * as classnames from 'classnames';
import moment from 'moment';
import { connect } from 'react-redux';
import { ProjectCreateSummary } from './summary';
import ProjectCreatePayment from './payment';
import { ProjectCreateReview } from './review';
import { createProjectIntent } from '../../../store/actions/projectsActions';
import { ProjectCreateStatus } from './info';
import { fetchCountries } from '../../../store/actions/externalActions';
import { Stepper } from '../../UI/Stepper';
import { NEW_PROJECT_WARNING_TEXT, REQUEST_DATE_FORMAT } from '../../../common/constants';
import { uploadFile } from '../../../store/actions/fileActions';
import Notify from '../../Notification';
import { StepperMobile } from '../../UI/StepperMobile';
import ScreenResolver from '../../ScreenResolver';
import { converseToNumber, usdToCent } from '../../../helpers';
import { trim } from 'lodash';
import { InfoBlock } from '../../UI/InfoBlock';
import { InfoTooltip } from '../../UI/InfoTooltip';
import './index.scss';

const STEPS = ['Summary', 'Payment', 'Review', 'Success'];

const FORM_STEP = {
  FIRST: 0,
  SECOND: 1,
  THIRD: 2,
  FOURTH: 3
};

const SET_STEPS = {
  ZERO: 0,
  ONE: 1
};

class ProjectCreateForm extends React.Component {
  constructor(props) {
    super(props);
    this.stripe = null;
  }

  state = {
    step: FORM_STEP.FIRST,
    success: false,
    project: {
      vendor: null,
      title: '',
      description: '',
      startDate: new Date(),
      dueDate: new Date(),
      attachments: [],
      rate: '',
      cost: '',
      initialPayment: ''
    },
    payment: {
      country: null,
      city: '',
      address: '',
      zip: '',
      name: ''
    },
    intent: null,
    payMethod: null,
    saveCard: false,
    loading: false
  };

  componentDidMount() {
    this.props.fetchCountries();
  }

  onSaveSummaryData = data => {
    this.setState({
      ...this.state,
      project: data,
      step: this.state.step + SET_STEPS.ONE,
    });
  }

  onProjectSubmit = async () => {
    const payload = {
      vendor: this.state.project.vendor.value,
      title: this.state.project.title,
      description: this.state.project.description,
      start_date: moment(this.state.project.startDate).format(REQUEST_DATE_FORMAT),
      end_date: moment(this.state.project.dueDate).format(REQUEST_DATE_FORMAT),
      attachments: this.state.project.attachments.map(file => ({ file: file.id })),
      status: 'IN_PROGRESS',
      rate: this.state.project.rate,
      cost: usdToCent(converseToNumber(this.state.project.cost)),
      initial_payment: usdToCent(converseToNumber(this.state.project.initialPayment))
    };
    this.setState({ ...this.state, loading: true });

    try {
      const response = await this.props.createProjectIntent(payload);
      if (response) {
        this.setState({
          ...this.state,
          intent: response,
        });

        try {
          await this.confirmPayment();
        } catch (e) {
          console.error(e);
        }
      }
    } catch (e) {
      Notify.info({ text: 'Could not connect payment services' });
    } finally {
      this.setState({ ...this.state, loading: false });
    }
  };

  onPaymentSubmit = data => {
    this.setState({
      ...this.state,
      payment: data,
      step: this.state.step + SET_STEPS.ONE,
    });
  };

  confirmPayment = async () => {
    const { payMethod, intent } = this.state;
    this.setState({ ...this.state, loading: true });
    const { paymentIntent, error } = await this.stripe.confirmCardPayment(intent.client_secret, {
      payment_method: payMethod.id,
      save_payment_method: this.state.saveCard,
      setup_future_usage: 'off_session'
    });

    if (paymentIntent && paymentIntent.status === 'succeeded') {
      this.setState({ ...this.state, success: true, loading: false });
      return this.nextStep();
    }

    if (error && error.message) {
      this.setState({ ...this.state, loading: false });
      this.nextStep();
      Notify.info({ text: error.message });
    }
  };

  setPayMethod = (payMethod, saveCard) => {
    const newState = { ...this.state, payMethod, saveCard: !!saveCard };
    const { payment, payMethod: previousPayMethod } = this.state;

    if (
      !payment?.country &&
      !payment?.city &&
      !payment?.address &&
      !payment?.zip &&
      !payment?.name &&
      previousPayMethod &&
      !payMethod
    ) {
      newState.payment = {
        ...payment,
        country: this.getCountry(previousPayMethod.billing_details?.address?.country),
        city: previousPayMethod.billing_details?.address?.city,
        address: previousPayMethod.billing_details?.address?.line1
          ? trim(
              `${previousPayMethod.billing_details?.address?.line1} ${previousPayMethod
                .billing_details?.address?.line2 ?? ''}`
            )
          : '',
        zip: previousPayMethod.billing_details?.address?.postal_code,
        name: previousPayMethod.billing_details?.name
      };
    }

    this.setState(newState);
  };

  getCountry = code => {
    const { data } = this.props.countriesList;
    if (data) {
      const country = data.find(countryElement => countryElement.code === code);
      if (country) {
        return {
          value: country.code,
          label: country.name
        };
      }
    }
    return { value: code, label: code };
  };

  setStripe = (stripe, payment) => {
    this.stripe = stripe;
    if (payment) {
      this.setState({ ...this.state, payment: { ...this.state.payment, ...payment } });
    }
  };

  removeAttachment = id => {
    const attachments = this.state.project.attachments.filter(file => file.id !== id);
    this.setState({
      ...this.state,
      project: {
        ...this.state.project,
        attachments
      }
    });
  };

  nextStep = () => {
    this.setState({ ...this.state, step: this.state.step + SET_STEPS.ONE });
  };

  prevStep = () => {
    this.state.step > SET_STEPS.ZERO &&
      this.setState({ ...this.state, step: this.state.step - SET_STEPS.ONE });
  };

  handleCancel = () => {
    return this.props.history.push('/projects');
  };

  renderContent = () => {
    switch (this.state.step) {
      case FORM_STEP.FIRST:
        return (
          <ProjectCreateSummary
            handleCancel={this.handleCancel}
            summaryState={this.state.project}
            uploadFile={this.props.uploadFile}
            onSubmit={this.onSaveSummaryData}
          />
        );
      case FORM_STEP.SECOND:
        return (
          <ProjectCreatePayment
            paymentState={this.state.payment}
            intent={this.state.intent}
            payMethod={this.state.payMethod}
            setPayMethod={this.setPayMethod}
            setStripe={this.setStripe}
            onSubmit={this.onPaymentSubmit}
            back={this.prevStep}
            next={this.nextStep}
          />
        );
      case FORM_STEP.THIRD:
        return (
          <ProjectCreateReview
            project={this.state.project}
            payment={this.state.payment}
            payMethod={this.state.payMethod}
            back={this.prevStep}
            loading={this.state.loading}
            removeAttachment={this.removeAttachment}
            onSubmit={this.onProjectSubmit}
          />
        );
      case FORM_STEP.FOURTH:
        return <ProjectCreateStatus status={this.state.success} />;
      default:
        return null;
    }
  };
  render() {
    return (
      <div
        className={classnames(
          'project_create_form',
          this.state.step === FORM_STEP.FOURTH && 'mt-30'
        )}
      >
        {this.state.step !== FORM_STEP.FOURTH && (
          <ScreenResolver
            large={576}
            desktop={
              <InfoBlock
                text={
                  this.state.step === FORM_STEP.FIRST || this.state.step === FORM_STEP.THIRD ? (
                    <>
                      Please clearly indicate the project's scope, and specify all the deliverable's
                      requirements to be met to be considered "successfully completed." Include as
                      many details as possible to help the vendor provide their best service. Also,
                      ensure that you have discussed the project's scope with the vendor{' '}
                      <span className="project_create__warning_weight_bold">before</span> creating
                      the new project. To start the project, make the agreed-upon initial payment
                      for the vendor.
                    </>
                  ) : (
                    <>
                      We use Stripe to process payments on the Kuprik platform. Stripe processes
                      charges on a Kuprik user's behalf. Although Kuprik initiates and manages the
                      transactions, funds do not flow through the Kuprik platform but through Stripe
                      instead. As a user of Kuprik, you do not need to have a separate account with
                      Stripe. However, to avoid possible delays in processing transactions, you will
                      still need to fill out the KYC (Know Your Customer) required information under
                      your <span className="project_create__warning_font_italic">Account</span> if
                      you haven't done so yet. Stripe has a legal obligation to know who the Kuprik
                      users are.
                    </>
                  )
                }
                className="project_create__warning"
              />
            }
            mobile={
              <InfoTooltip
                text={
                  this.state.step === FORM_STEP.FIRST || this.state.step === FORM_STEP.THIRD ? (
                    <>
                      Please clearly indicate the project's scope, and specify all the deliverable's
                      requirements to be met to be considered "successfully completed." Include as
                      many details as possible to help the vendor provide their best service. Also,
                      ensure that you have discussed the project's scope with the vendor{' '}
                      <span className="project_create__warning_weight_bold">before</span> creating
                      the new project. To start the project, make the agreed-upon initial payment
                      for the vendor.
                    </>
                  ) : (
                    <>
                      We use Stripe to process payments on the Kuprik platform. Stripe processes
                      charges on a Kuprik user's behalf. Although Kuprik initiates and manages the
                      transactions, funds do not flow through the Kuprik platform but through Stripe
                      instead. As a user of Kuprik, you do not need to have a separate account with
                      Stripe. However, to avoid possible delays in processing transactions, you will
                      still need to fill out the KYC (Know Your Customer) required information under
                      your <span className="project_create__warning_font_italic">Account</span> if
                      you haven't done so yet. Stripe has a legal obligation to know who the Kuprik
                      users are.
                    </>
                  )
                }
                className="project_create__warning"
              />
            }
          />
        )}
        <div className="project_create_form__content">
          <ScreenResolver
            large={1180}
            desktop={
              <Stepper active={this.state.step} steps={STEPS} complete_green={this.state.success} />
            }
            mobile={
              <StepperMobile
                active={this.state.step}
                steps={STEPS}
                complete_green={this.state.success}
              />
            }
          />
          {this.renderContent()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  countriesList: state.commonStore.countriesList
});

const mapDispatchToProps = dispatch => ({
  fetchCountries: () => dispatch(fetchCountries()),
  createProjectIntent: project => dispatch(createProjectIntent(project)),
  uploadFile: file => dispatch(uploadFile(file))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectCreateForm);
