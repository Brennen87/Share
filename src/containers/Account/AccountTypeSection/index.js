import * as React from 'react';
import * as classnames from 'classnames';
import CheckboxWhiteBigger from '../../../components/UI/CheckboxWhiteBigger';
import { ACC_TYPES, SSN_REQUIRING_COUNTRIES } from '../../../common/constants';
import AccountBusinessForm from '../../../components/Form/AccountBusinessForm';
import AccountIndividualForm from '../../../components/Form/AccountIndividualForm';
import { connect } from 'react-redux';
import _ from 'lodash';
import { businessParser, individualParser } from './parser';
import SmallButton from '../../../components/UI/SmallButton';
import Preloader from '../../../components/Preloader';
import {
  fetchAccountType,
  fetchAccPersonalInformation,
  postAccountType,
  updateAccountType,
  clearAccountType as clearAccountTypeAction
} from '../../../store/actions/accountActions';
import { fetchCountries } from '../../../store/actions/externalActions';
import { uploadFile } from '../../../store/actions/fileActions';
import { fetchUserStatus } from '../../../store/actions/authActions';
import { parseUsFormatDateToIsoFormat } from '../../../helpers';

class AccountTypeSection extends React.Component {
  componentDidMount() {
    this.props.fetchAccountType();
    this.props.fetchAccPersonalInformation();
    this.props.fetchCountries();
  }

  componentDidUpdate(prevProps) {
    const { data } = this.props.accountType;

    if (data && prevProps.accountType.data !== data) {
      if (this.state.type !== data.account_data.business_type) {
        this.setState({ type: data.account_data.business_type, isEditable: false });
      }
    }
  }

  componentWillUnmount() {
    this.props.clearAccountType();
  }

  state = {
    type: null,
    isEditable: true
  };

  setAccountType = e => {
    const { loading, exist } = this.props.accountType;
    const { isEditable, type } = this.state;
    if (!loading && !(isEditable && type && exist && e.target.value !== type)) {
      if (exist) {
        this.setState({
          isEditable: false
        });
      } else {
        this.setState({
          type: !e.target.checked ? null : e.target.value
        });
      }
    }
  };

  setEditableForm = isEditable => {
    this.setState({ isEditable });
  };

  onSubmit = async (data, { setSubmitting }) => {
    if (this.state.type === 'individual') {
      // Individual data:
      const { exist } = this.props.accountType;
      if (this.state.type) {
        const accountInfo = {
          account_type: this.state.type
        };

        const isSsnRequired = SSN_REQUIRING_COUNTRIES.includes(data.country.value.toLowerCase());

        accountInfo.data = {
          business_type: data.type.value,
          business_description: _.has(data, 'business_description')
            ? data.business_description
            : data.description,
          ...(data.website && data.website.trim().length ? { website: data.website } : {}),
          account_number: data.accNumber === '123456789' ? `000${data.accNumber}` : data.accNumber,
          bank_routing_number: data.routeNumber,
          company_name: data.companyName,
          company_tax_id: data.companyTax || '**********',

          accept_stripe_tos: data.acceptStripeTos,
          city: data.city,
          country:
            this.props.countries?.data?.find(
              country => country.name.toLowerCase() === data.country.value.toLowerCase()
            )?.code || '',
          line: data.address,
          phone_number: data.phone,
          product_description: data.productDescription,
          state: data.state,
          zip_code: data.zipCode,
          date_of_birth: parseUsFormatDateToIsoFormat(data.dateOfBirth),
          first_name: data.firstName,
          last_name: data.lastName,
          ...(isSsnRequired ? { ssn: data.ssn } : {}),
          occupation: data.occupation
        };

        if (exist) {
          Object.keys(accountInfo.data).forEach(key => {
            if (accountInfo.data[key] === '') {
              delete accountInfo.data[key];
            }
          });
          accountInfo.data.company_name = data.companyName;

          await this.props.updateAccountType(accountInfo);
          await this.props.fetchAccPersonalInformation();
          try {
            await this.props.fetchUserStatus(this.props.user);
          } catch (e) {
            console.error("Error loading user status");
            console.error(e);
          }
        } else {
          await this.props.postAccountType(accountInfo);
          await this.props.fetchAccPersonalInformation();
          try {
            await this.props.fetchUserStatus(this.props.user);
          } catch (e) {
            console.error("Error loading user status");
            console.error(e);
          }
        }
        setSubmitting(false);

        if (this.props.accountType.data && !this.props.accountType.error) {
          this.setState({
            isEditable: false
          });
        }
      }
    } else {
      // Company data:
      const { exist } = this.props.accountType;
      if (this.state.type) {
        const accountInfo = {
          account_type: this.state.type
        };

        accountInfo.data = {
          business_type: data.type.value,
          business_description: _.has(data, 'business_description')
            ? data.business_description
            : data.description,
          company_tax_id: data.companyTax || '**********',
          ...(data.website && data.website.trim().length ? { company_website: data.website } : {}),
          account_number: data.accNumber === '123456789' ? `000${data.accNumber}` : data.accNumber,
          bank_routing_number: data.routeNumber,
          company_name: data.companyName,
          company_email: this.props.user.email,
          company_phone_number: data.companyPhone,
          product_description: data.description,

          company_country:
            this.props.countries?.data?.find(
              country => country.name.toLowerCase() === data.companyCountry.value.toLowerCase()
            )?.code || '',
          company_state: data.companyState,
          company_city: data.companyCity,
          company_line: data.companyAddress,
          company_zip_code: data.companyZipCode,

          representative_first_name: data.representativeFirstName,
          representative_last_name: data.representativeLastName,
          representative_country:
            this.props.countries?.data?.find(
              country =>
                country.name.toLowerCase() === data.representativeCountry.value.toLowerCase()
            )?.code || '',
          representative_state: data.representativeState,
          representative_city: data.representativeCity,
          representative_line: data.representativeAddress,
          representative_zip_code: data.representativeZipCode,
          representative_phone_number: data.representativePhone,
          representative_email: data.representativeEmail,
          representative_date_of_birth: parseUsFormatDateToIsoFormat(
            data.representativeDateOfBirth
          ),
          representative_ssn: data.representativeSSN,

          representative_document_front: data.representativeDocumentFront?.id,
          representative_document_back: data.representativeDocumentBack?.id,
          bank_account_document: data.bankAccountDocument?.id,

          accept_stripe_tos: data.acceptStripeTos
        };

        if (exist) {
          Object.keys(accountInfo.data).forEach(key => {
            if (accountInfo.data[key] === '') {
              delete accountInfo.data[key];
            }
          });
          accountInfo.data.company_name = data.companyName;

          await this.props.updateAccountType(accountInfo);
          await this.props.fetchAccPersonalInformation();
          try {
            await this.props.fetchUserStatus(this.props.user);
          } catch (e) {
            console.error("Error loading user status");
            console.error(e);
          }
        } else {
          await this.props.postAccountType(accountInfo);
          await this.props.fetchAccPersonalInformation();
          try {
            await this.props.fetchUserStatus(this.props.user);
          } catch (e) {
            console.error("Error loading user status");
            console.error(e);
          }
        }
        setSubmitting(false);

        if (this.props.accountType.data && !this.props.accountType.error) {
          this.setState({
            isEditable: false
          });
        }
      }
    }
  };

  render() {
    const { data, exist, loading } = this.props.accountType;

    return (
      <div className="account_type_section">
        <div className="title_uppercase">Account Type</div>
        <div className="k-block account_type_section__content">
          {loading && <Preloader className="account_type_section__preloader" />}
          {exist && !this.state.isEditable
            ? !loading && (
                <div className="account_type_section__exist">
                  <div>
                    <div className="account_type_section__exist_title">
                      {this.state.type === ACC_TYPES.individual ? 'Individual' : 'Business'}
                    </div>
                    <div className="account_type_section__exist_desc">
                      Your information is saved with Stripe. To update, click the Edit button.
                    </div>
                  </div>
                  <div className="account_type_section__exist_buttons">
                    <SmallButton label="Edit" onClick={() => this.setEditableForm(true)} />
                  </div>
                </div>
              )
            : !loading && (
                <>
                  <div className="account_type_section__inner">
                    <div className="account_type_section__top">
                      <div className="account_type_section__block">
                        <CheckboxWhiteBigger
                          label="Individual"
                          name="individual_type"
                          value={ACC_TYPES.individual}
                          onChange={this.setAccountType}
                          checked={this.state.type === ACC_TYPES.individual}
                        />
                        <p>Person, not a business structure.</p>
                      </div>
                      <div className="account_type_section__block">
                        <CheckboxWhiteBigger
                          label="Business"
                          name="business_type"
                          value={ACC_TYPES.business}
                          onChange={this.setAccountType}
                          checked={this.state.type === ACC_TYPES.business}
                        />
                        <p>All types of business structure.</p>
                      </div>
                    </div>
                    <div className="account_type_section__bottom">
                      <p>Please note you cannot change Account Type once saved.</p>
                    </div>
                  </div>
                </>
              )}

          <div
            className={classnames(
              'account_type_section__form',
              this.state.type && this.state.isEditable && 'account_type_section__form_active'
            )}
          >
            {this.state.type === ACC_TYPES.business && this.state.isEditable && (
              <AccountBusinessForm
                accountInfo={businessParser(
                  data?.account_data,
                  this.props.information.data,
                  this.props.countries
                )}
                exist={exist}
                onSubmit={this.onSubmit}
                countries={this.props.countries}
                uploadFile={this.props.uploadFile}
              />
            )}
            {this.state.type === ACC_TYPES.individual && this.state.isEditable && (
              <AccountIndividualForm
                accountInfo={individualParser(
                  data?.account_data,
                  this.props.information.data,
                  this.props.countries
                )}
                exist={exist}
                onSubmit={this.onSubmit}
                countries={this.props.countries}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  accountType: state.accountStore.accountType,
  information: state.accountStore.information,
  countries: state.commonStore.countriesList,
  user: state.userStore.user,
});

const mapDispatchToProps = dispatch => ({
  fetchAccountType: () => dispatch(fetchAccountType()),
  fetchAccPersonalInformation: () => dispatch(fetchAccPersonalInformation()),
  clearAccountType: () => dispatch(clearAccountTypeAction()),
  postAccountType: data => dispatch(postAccountType(data)),
  updateAccountType: data => dispatch(updateAccountType(data)),
  fetchCountries: () => dispatch(fetchCountries()),
  uploadFile: file => dispatch(uploadFile(file)),
  fetchUserStatus: user => dispatch(fetchUserStatus(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountTypeSection);
