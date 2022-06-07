import * as React from 'react';
import { Elements, injectStripe } from 'react-stripe-elements';
import PaymentForm from '../../../components/Form/PaymentForm';
import { Formik } from 'formik';
import SmallButton from '../../../components/UI/SmallButton';
import Notify from '../../../components/Notification';
import { compareBilling, usdToCent } from '../../../helpers';
import * as Yup from 'yup';
import Modal from '../../../components/UI/Modal';
import Preloader from '../../../components/Preloader';
import { updateBilling } from '../../../store/actions/commonActions';
import { FILL_IN_ALL_REQUIRED_FIELDS, ROLES } from '../../../common/constants';
import { connect } from 'react-redux';

const VALIDATION_SCHEMA = Yup.object().shape({
  country: Yup.object()
    .shape({
      label: Yup.string().required(),
      value: Yup.string().required()
    })
    .required(),
  city: Yup.string().required(),
  address: Yup.string().required(),
  zip: Yup.string().required(),
  name: Yup.string().required()
});

class ExtraPaymentForm extends React.Component {
  total;
  defaultValues = {
    address: '',
    city: '',
    zip: '',
    country: null,
    name: '',
    payMethod: null,
    loading: false
  };

  state = {
    showNewCard: true,
    cardNumberHasError: true,
    cardExpiryDateHasError: true,
    cardCvcHasError: true
  };

  onSubmit = async (data, { setFieldValue }) => {
    const {
      projectId,
      stripe,
      elements,
      acceptPaymentIntent,
      onPaymentFinished,
      user,
      requestedFinalPayment
    } = this.props;
    if (!requestedFinalPayment) {
      return Notify.info({
        text: 'An error occured: please make sure that a valid final payment amount is requested.'
      });
    }

    const totalCost = usdToCent(requestedFinalPayment);
    if (!stripe) {
      return Notify.info({ text: 'Payment service temporary down, please try later' });
    }

    setFieldValue('loading', true);
    const { payMethod } = data;

    try {
      const intent = await acceptPaymentIntent({
        project: Number.parseInt(projectId)
      });

      if (intent) {
        if (payMethod && payMethod.id && intent) {
          // Update billing if changed
          const { city, country, line1, postal_code } = payMethod.billing_details.address;
          const { isSame, payload } = compareBilling(
            {
              country,
              zip: postal_code,
              city,
              address: line1
            },
            {
              country: data.country.value,
              zip: data.zip,
              city: data.city,
              address: data.address
            }
          );

          if (!isSame) {
            const response = await updateBilling({
              payment_method_id: payMethod.id,
              ...payload
            });

            if (!response || (response && response.status !== 201)) {
              setFieldValue('loading', false);
              return Notify.info({
                text: 'Could not update billing information. Payment declined'
              });
            }
          }

          // Processing payment with saved card
          const { paymentIntent, error } = await stripe.confirmCardPayment(intent.client_secret, {
            payment_method: payMethod.id,
            save_payment_method: false,
            setup_future_usage: 'off_session'
          });

          if (paymentIntent && paymentIntent.status === 'succeeded') {
            setFieldValue('cost', this.defaultValues.cost);
            setFieldValue('rate', this.defaultValues.rate);
            this.total = totalCost;
            Notify.info({ text: 'Payment has been successfully processed' });
            onPaymentFinished();
          }

          if (error && error.message) {
            Notify.info({ text: error.message });
          }
          return setFieldValue('loading', false);
        }

        // Processing payment with new card
        const { paymentMethod } = await stripe.createPaymentMethod({
          type: 'card',
          card: elements.getElement('cardNumber'),
          billing_details: {
            address: {
              city: data.city,
              country: data.country.value,
              line1: data.address,
              postal_code: data.zip
            },
            name: data.name,
            email: (user && user.email) || null
          }
        });

        if (paymentMethod && paymentMethod.id) {
          const { paymentIntent, error } = await stripe.confirmCardPayment(intent.client_secret, {
            payment_method: paymentMethod.id,
            save_payment_method: true,
            setup_future_usage: 'off_session'
          });

          if (paymentIntent && paymentIntent.status === 'succeeded') {
            setFieldValue('cost', this.defaultValues.cost);
            setFieldValue('rate', this.defaultValues.rate);
            onPaymentFinished();
            this.total = totalCost;
            Notify.info({ text: 'Payment has been successfully processed' });
          }

          if (error && error.message) {
            Notify.info({ text: error.message });
          }
        }

        return setFieldValue('loading', false);
      }
    } catch (e) {
      console.error(e);
    }
    setFieldValue('loading', false);
    Notify.info({ text: 'Payment gateway not ready. Please try again later.' });
  };

  onSetPayMethod = (payMethod, setFieldValue) => {
    if (payMethod) {
      const { city, country, line1, postal_code } = payMethod.billing_details.address;
      setFieldValue('country', (country && this.getCountry(country)) || this.defaultValues.country);
      setFieldValue('city', city || this.defaultValues.city);
      setFieldValue('address', line1 || this.defaultValues.address);
      setFieldValue('zip', postal_code || this.defaultValues.zip);
      setFieldValue('name', payMethod.billing_details.name || this.defaultValues.name);
    }

    setFieldValue('payMethod', payMethod);
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

  render() {
    const { countriesList } = this.props;

    return (
      <Formik
        validationSchema={VALIDATION_SCHEMA}
        onSubmit={(values, formikBag) => this.onSubmit(values, formikBag)}
        initialValues={this.defaultValues}
      >
        {({ values, errors, setFieldValue, handleChange, handleSubmit, validateForm }) => (
          <form className="project_detail_pay_form" onSubmit={handleSubmit}>
            {this.props.project.data?.status &&
            this.props.project.data?.status !== 'COMPLETED' &&
            !this.props.cancellation &&
            this.props.user.role === ROLES.customer ? (
              <>
                <PaymentForm
                  billingInfo={values}
                  handleChange={handleChange}
                  setFieldValue={setFieldValue}
                  payMethod={values.payMethod}
                  setPayMethod={value => this.onSetPayMethod(value, setFieldValue)}
                  updateBilling={() => null}
                  projectId={this.props.projectId}
                  countriesList={countriesList}
                  showNewCard={this.state.showNewCard}
                  setShowNewCard={showNewCard => this.setState({ showNewCard })}
                  setFieldError={(fieldName, hasError) => {
                    this.setState({ [fieldName]: hasError });
                  }}
                />
                <div className="project_detail_pay_form__buttons">
                  <SmallButton
                    type="submit"
                    label="Pay"
                    onSubmit={handleSubmit}
                    disabled={!this.props.requestedFinalPayment}
                    onClick={async () => {
                      validateForm(values).then(formErrors => {
                        const hasPaymentFieldErrors =
                          this.state.showNewCard &&
                          (this.state.cardNumberHasError ||
                            this.state.cardExpiryDateHasError ||
                            this.state.cardCvcHasError);
                        if (Object.keys(formErrors).length || hasPaymentFieldErrors) {
                          Notify.info({ text: FILL_IN_ALL_REQUIRED_FIELDS });
                        }
                      });
                    }}
                  />
                </div>

                {values.loading && (
                  <Modal onClose={() => null}>
                    <div className="processing">
                      <div className="processing__inner">
                        <p className="processing__title">Processing Payment</p>
                        <Preloader />
                      </div>
                    </div>
                  </Modal>
                )}
              </>
            ) : null}
          </form>
        )}
      </Formik>
    );
  }
}

const InjectedForm = injectStripe(ExtraPaymentForm);

class ExtraPayment extends React.Component {
  render() {
    return (
      <Elements>
        <InjectedForm {...this.props} />
      </Elements>
    );
  }
}

const mapStateToProps = state => ({
  project: state.projectStore.project
});

export default connect(mapStateToProps)(ExtraPayment);
