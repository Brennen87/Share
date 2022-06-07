import * as React from 'react';
import { connect } from 'react-redux';
import Notify from '../../Notification';
import SmallButton from '../../UI/SmallButton';
import { Formik } from 'formik';
import { Elements, injectStripe } from 'react-stripe-elements';
import PaymentForm from '../PaymentForm';
import * as Yup from 'yup';
import { compareBilling } from '../../../helpers';
import { updateBilling } from '../../../store/actions/commonActions';
import { FILL_IN_ALL_REQUIRED_FIELDS } from '../../../common/constants';
import { SELECT_PAYMENT } from '../../../common/constants';

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

class ProjectCreatePaymentForm extends React.Component {
  state = {
    showNewCard: true,
    cardNumberHasError: true,
    cardExpiryDateHasError: true,
    cardCvcHasError: true
  };

  handleSubmit = async data => {
    if (this.props.stripe) {
      const { payMethod } = this.props;
      if (payMethod && payMethod.id) {
        this.props.setStripe(this.props.stripe, {
          country: data.country,
          city: data.city,
          address: data.address,
          zip: data.zip,
          name: data.name
        });

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
            return Notify.info({
              text: 'Could not update billing information'
            });
          }
        }

        return this.props.next();
      }

      const { paymentMethod } = await this.props.stripe.createPaymentMethod({
        type: 'card',
        card: this.props.elements.getElement('cardNumber'),
        billing_details: {
          address: {
            city: data.city,
            country: data.country.value,
            line1: data.address,
            postal_code: data.zip
          },
          name: data.name,
          email: this.props.user.email || null
        }
      });

      if (paymentMethod && paymentMethod.id) {
        this.props.setStripe(this.props.stripe, {
          country: data.country,
          city: data.city,
          address: data.address,
          zip: data.zip,
          name: data.name
        });
        this.props.setPayMethod(paymentMethod, true);
        return this.props.next();
      }
    } else {
      Notify.info({ text: 'Payment gateway not ready. Please try again later.' });
    }
  };

  getInitialValues = () => {
    const { paymentState, payMethod } = this.props;
    if (payMethod) {
      const { city, country, line1, postal_code } = payMethod.billing_details.address;
      return {
        country: (country && this.getCountry(country)) || paymentState.country,
        city: city || paymentState.city,
        address: line1 || paymentState.address,
        zip: postal_code || paymentState.zip,
        name: payMethod.billing_details.name || paymentState.name
      };
    }
    return paymentState;
  };

  getCountry = code => {
    const { data } = this.props.countriesList;
    if (data) {
      const country = data.find(country => country.code === code);
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
    const { countriesList, payMethod, setPayMethod, updateBilling } = this.props;

    return (
      <Formik
        enableReinitialize
        initialValues={this.getInitialValues()}
        validationSchema={VALIDATION_SCHEMA}
        onSubmit={(values, formikBag) => this.handleSubmit(values, formikBag)}
      >
        {({
          values,
          errors,
          handleChange,
          handleSubmit,
          isSubmitting,
          setFieldValue,
          validateForm
        }) => (
          <form className="project_create_payment_form__wrapper" onSubmit={handleSubmit}>
            <div className="k-block">
              <PaymentForm
                billingInfo={values}
                handleChange={handleChange}
                setFieldValue={setFieldValue}
                setFieldError={(fieldName, hasError) => {
                  this.setState({ [fieldName]: hasError });
                }}
                payMethod={payMethod}
                setPayMethod={setPayMethod}
                updateBilling={updateBilling}
                countriesList={countriesList}
                errors={errors}
                showNewCard={this.state.showNewCard}
                setShowNewCard={showNewCard => this.setState({ showNewCard })}
              />
            </div>
            <div className="project_create_payment_form__buttons">
              <SmallButton
                type="button"
                onClick={this.props.back}
                label="Back"
                className="project_create_payment_form__button_back"
              />
              <SmallButton
                type="submit"
                onSubmit={handleSubmit}
                onClick={() => {
                  validateForm().then(formErrors => {
                    const hasPaymentFieldErrors =
                      this.state.showNewCard &&
                      (this.state.cardNumberHasError ||
                        this.state.cardExpiryDateHasError ||
                        this.state.cardCvcHasError);
                    if (Object.keys(formErrors).length || hasPaymentFieldErrors) {
                      Notify.info({ text: FILL_IN_ALL_REQUIRED_FIELDS });
                    }
                    if (!this.state.showNewCard && !this.props.payMethod) {
                      Notify.info({ text: SELECT_PAYMENT });
                    }
                  });
                }}
                disabled={isSubmitting}
                label="Next"
                className="project_create_payment_form__button_submit"
              />
            </div>
          </form>
        )}
      </Formik>
    );
  }
}

const InjectedForm = injectStripe(ProjectCreatePaymentForm);

class ProjectCreatePayment extends React.Component {
  render() {
    return (
      <Elements>
        <InjectedForm {...this.props} />
      </Elements>
    );
  }
}

const mapStateToProps = state => ({
  user: state.userStore.user,
  countriesList: state.commonStore.countriesList
});

export default connect(mapStateToProps)(ProjectCreatePayment);
