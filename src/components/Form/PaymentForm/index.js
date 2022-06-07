import * as React from 'react';
import * as classnames from 'classnames';
import SelectField from '../../UI/SelectField';
import SavedCardList from './cards';
import { CardCVCElement, CardExpiryElement, CardNumberElement } from 'react-stripe-elements';
import PropTypes from 'prop-types';
import CheckboxWhite from '../../UI/CheckboxWhite';
import InputTextFieldSmall from '../../UI/InputTextFieldSmall';
import Preloader from '../../Preloader';
import { connect } from 'react-redux';
import { singleValueSelect } from '../../../common/selectFieldStyles/singleValueSelect';
import './index.scss';

const COUNTRY_CONFIGS = {
  isSearchable: true,
  isClearable: true
};

const ElStyle = {
  base: {
    textAlign: 'center',
    fontSize: '14px',
    color: '#000',
    backgroundColor: 'transparent',
    fontSmoothing: 'antialiased',
    '::placeholder': {
      color: '#a3a3a3',
      fontSize: '12px'
    },
    ':focus::placeholder': {
      color: 'transparent'
    }
  },
  invalid: {
    color: 'red'
  }
};

class PaymentForm extends React.Component {
  state = {
    showEditBilling: false,
    savedCardsCount: 0,
    cardNumberHasError: false,
    cardExpiryDateHasError: false,
    cardCvcHasError: false
  };

  componentDidMount() {
    if (!this.props.projectId) {
      this.setState({ ...this.state, showEditBilling: !this.isBillExist() });
    }
  }

  componentDidUpdate(prevProps) {
    const { address, city, zip, country } = prevProps.billingInfo;
    const didBillExist = !!(address && city && zip && country);
    if (didBillExist !== this.isBillExist()) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ ...this.state, showEditBilling: !this.isBillExist() });
    }
  }

  setCardsCount = count => {
    if (count !== this.state.savedCardsCount) {
      this.setState({ ...this.state, savedCardsCount: count });
      this.props.setShowNewCard(false);
    }
  };

  toggleCard = () => {
    if (!this.props.showNewCard) {
      this.props.setPayMethod(null);
    }

    this.props.setShowNewCard(!this.props.showNewCard);
  };

  toggleBilling = () => {
    this.setState({ ...this.state, showEditBilling: !this.state.showEditBilling });
  };

  isBillExist = () => {
    const { address, city, zip, country } = this.props.billingInfo;
    return !!(address && city && zip && country);
  };

  switchToNewCard = () => {
    this.props.setShowNewCard(!this.props.showNewCard);
  };

  render() {
    const {
      billingInfo,
      countriesList,
      handleChange,
      setFieldValue,
      payMethod,
      setPayMethod,
      updateBilling,
      savedCards,
      children
    } = this.props;
    const { address, city, zip, country, name } = billingInfo;

    const { loading: loadingSavedCards } = savedCards;

    const resortedCountries = () => {
      if (!countriesList || !countriesList.data) {
        return [];
      }
      const countryToTop = 'United States of America';
      const topCountry = countriesList.data.filter(
        countryElement => countryElement.name === countryToTop
      )[0];
      return [
        ...(topCountry ? [topCountry] : []),
        ...countriesList.data.filter(countryElement => countryElement.name !== countryToTop)
      ].map(countryElement => ({
        value: countryElement.code,
        label: countryElement.name
      }));
    };

    return (
      <div className="payment_form__wrapper">
        {children}
        <div className="payment_form">
          <div className="payment_form__left">
            {loadingSavedCards && <Preloader className="saved_card__preloader" />}
            {!loadingSavedCards && (
              <>
                <div className="payment_form__top">
                  <div className="payment_form__title">Billing Information</div>
                  {country && address && city && zip && !this.state.showEditBilling && (
                    <div className="payment_form__address">
                      <p>{`${address}` || ''}</p>
                      <p>{`${city} ${zip}` || ''}</p>
                      <p>{`${(country && country.label) || ''}`}</p>
                    </div>
                  )}
                  <div
                    className={classnames(
                      this.state.showEditBilling && 'payment_form__billing__control'
                    )}
                  >
                    <CheckboxWhite
                      label="Edit billing information"
                      labelColor="#868686"
                      onChange={this.toggleBilling}
                      checked={this.state.showEditBilling}
                      className="payment_form__billing_checkbox"
                    />
                    <button type="button" onClick={updateBilling} style={{ display: 'none' }}>
                      Update
                    </button>
                  </div>
                </div>

                <div className="payment_form__billing">
                  {this.state.showEditBilling && (
                    <div className="payment_form__billing_form">
                      <div className="payment_form__billing_form__left">
                        <InputTextFieldSmall
                          label="Address*"
                          name="address"
                          value={address}
                          onChange={handleChange}
                          row
                        />
                        <InputTextFieldSmall
                          label="City*"
                          name="city"
                          value={city}
                          onChange={handleChange}
                          row
                        />
                      </div>
                      <div className="payment_form__billing_form__right">
                        <InputTextFieldSmall
                          label="ZIP Code*"
                          name="zip"
                          value={zip}
                          onChange={handleChange}
                          row
                        />
                        <SelectField
                          label="Country*"
                          className="select__input"
                          classNamePrefix="select"
                          isLoading={countriesList.loading}
                          isClearable={COUNTRY_CONFIGS.isClearable}
                          isSearchable={COUNTRY_CONFIGS.isSearchable}
                          onChange={selection => setFieldValue('country', selection)}
                          name="country"
                          value={country}
                          styles={singleValueSelect}
                          isDisabled={this.isBillExist() && !this.state.showEditBilling}
                          options={resortedCountries()}
                          placeholder=""
                        />
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
          <div className="payment_form__right">
            <div className="payment_form__top">
              <div className="payment_form__cards">
                <div className="payment_form__title">Credit / Debit Card</div>
                <SavedCardList
                  className="payment_form__cards_saved"
                  payMethod={payMethod}
                  setPayMethod={paymentMethod => {
                    if (this.props.showNewCard) {
                      this.props.setShowNewCard(false);
                    }
                    setPayMethod(paymentMethod);
                  }}
                  isNewCardSelected={this.props.showNewCard}
                  setShowNewCard={this.props.setShowNewCard}
                  setCardsCount={this.setCardsCount}
                  switchToNewCard={this.switchToNewCard}
                />

                <CheckboxWhite
                  label="Use a different credit / debit card"
                  labelColor="#868686"
                  onChange={this.toggleCard}
                  checked={this.props.showNewCard}
                  className="payment_form__cards_checkbox"
                />
              </div>
            </div>
            <div
              className={classnames(
                'payment_form__new_card',
                !this.props.showNewCard && 'payment_form__new_card_hidden'
              )}
            >
              <div className="payment_form__new_card__left tt">
                <InputTextFieldSmall
                  label="Name on Card*"
                  name="name"
                  value={name}
                  onChange={handleChange}
                  row
                />

                <div className="payment_form__new_card__number payment_form__new_card__row">
                  <div className="payment_form__new_card__col1">Card Number*</div>
                  <div className="payment_form__new_card__col2 payment_form__new_card__number_element">
                    <CardNumberElement
                      style={ElStyle}
                      onChange={event => {
                        this.setState({ cardNumberHasError: Boolean(event.error) });
                        if (this.props.setFieldError) {
                          this.props.setFieldError('cardNumberHasError', Boolean(event.error));
                        }
                      }}
                      placeholder=""
                      className="payment_form__new_card__input"
                    />
                  </div>
                </div>
              </div>
              <div className="payment_form__new_card__right">
                <div className="payment_form__new_card__exp_date payment_form__new_card__row">
                  <div className="payment_form__new_card__col1">Expiration Date*</div>
                  <div className="payment_form__new_card__col2 payment_form__new_card__exp_element">
                    <CardExpiryElement
                      style={ElStyle}
                      onChange={event => {
                        this.setState({ cardExpiryDateHasError: Boolean(event.error) });
                        if (this.props.setFieldError) {
                          this.props.setFieldError('cardExpiryDateHasError', Boolean(event.error));
                        }
                      }}
                      className="payment_form__new_card__input"
                    />
                  </div>
                </div>

                <div className="payment_form__new_card__cvc payment_form__new_card__row">
                  <div className="payment_form__new_card__col1 cvc_title">CVC*</div>
                  <div className="payment_form__new_card__col2 payment_form__new_card__cvc_element">
                    <CardCVCElement
                      style={ElStyle}
                      placeholder="123"
                      onChange={event => {
                        this.setState({ cardCvcHasError: Boolean(event.error) });
                        if (this.props.setFieldError) {
                          this.props.setFieldError('cardCvcHasError', Boolean(event.error));
                        }
                      }}
                      className="payment_form__new_card__input"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

PaymentForm.propTypes = {
  billingInfo: PropTypes.shape({
    country: PropTypes.shape({ value: PropTypes.string, label: PropTypes.string }),
    city: PropTypes.string,
    address: PropTypes.string,
    zip: PropTypes.string,
    name: PropTypes.string
  }).isRequired,
  handleChange: PropTypes.func,
  showNewCard: PropTypes.bool,
  setShowNewCard: PropTypes.func,
  setFieldValue: PropTypes.func,
  setFieldError: PropTypes.func,
  setPayMethod: PropTypes.func,
  countriesList: PropTypes.object,
  payMethod: PropTypes.object,
  errors: PropTypes.object
};

const mapStateToProps = state => ({
  savedCards: state.projectStore.savedCards
});

export default connect(mapStateToProps)(PaymentForm);
