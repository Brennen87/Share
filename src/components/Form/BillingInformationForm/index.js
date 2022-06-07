import * as React from 'react';
import SelectField from '../../UI/SelectField';
import InputTextFieldSmall from '../../UI/InputTextFieldSmall';
import { connect } from 'react-redux';
import { fetchCountries } from '../../../store/actions/externalActions';
import { updateBillingInfo } from '../../../store/actions/projectsActions';
import './index.scss';

const COUNTRY_CONFIGS = {
  isSearchable: true,
  isClearable: true
};

class BillingInformationForm extends React.Component {
  componentDidMount() {
    this.props.fetchCountries();
  }

  onUpdate = () => {
    this.props.updateBillingInfo();
  };

  render() {
    const { loading, data } = this.props.countriesList;
    return (
      <div className="billing_info_form">
        <div className="billing_info_form__title">Billing Information</div>
        <SelectField
          label="Country"
          isLoading={loading}
          isClearable={COUNTRY_CONFIGS.isClearable}
          isSearchable={COUNTRY_CONFIGS.isSearchable}
          onChange={() => null}
          name="billCountry"
          menuPosition="fixed"
          options={data.map(country => ({
            value: country.name,
            label: country.name
          }))}
        />
        <InputTextFieldSmall
          label="Address"
          onChange={() => null}
          value=""
          name="billAddress"
          className="billing_info_form__input"
          row
        />
        <InputTextFieldSmall
          label="City"
          onChange={() => null}
          value=""
          name="billCity"
          className="billing_info_form__input"
          row
        />
        <InputTextFieldSmall
          label="ZIP Code"
          onChange={() => null}
          value=""
          name="billZipCode"
          className="billing_info_form__input"
          row
        />
        <button type="button" className="billing_info_form__update" onClick={this.onUpdate}>
          Update
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  countriesList: state.commonStore.countriesList
});

const mapDispatchToProps = dispatch => ({
  fetchCountries: () => dispatch(fetchCountries()),
  updateBillingInfo: data => dispatch(updateBillingInfo(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(BillingInformationForm);
