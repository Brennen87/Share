import _ from 'lodash';
import {
  formatDateToUsFormat,
  parseIsoFormatDateToUsFormat,
  getFileNameFromUrl,
  generateNameFromAPIName,
  generateLast4VisibleOnly,
} from '../../../helpers';
import { INDIVIDUAL_TYPES, BUSINESS_TYPES } from '../../../common/constants';

export const businessParser = (data, apiData, countriesList) => {
  const values = {
    type: '',
    companyName: '',
    description: '',
    website: '',
    companyTax: '',
    accNumber: '',
    routeNumber: '',
    accountNumberLast4Digits: '',

    companyAddress: '',
    companyCity: '',
    companyZipCode: '',
    companyState: '',
    companyCountry: '',
    companyPhone: '',
    // companyAccNumber: '',
    // companyBankRoutingNumber: '',
    representativeFirstName: '',
    representativeLastName: '',
    representativeDateOfBirth: formatDateToUsFormat(
      new Date(new Date().setFullYear(new Date().getFullYear() - 14))
    ),
    representativeSSN: '',
    representativeSSNLast4Digits: '',
    representativeAddress: '',
    representativeCity: '',
    representativeZipCode: '',
    representativeState: '',
    representativeCountry: '',
    representativeEmail: '',
    representativePhone: '',
    // representativeRelationship: '',
    /* ownerFirstName: '',
    ownerLastName: '',
    ownerEmail: '',
    ownerRelationship: '', */

    representativeDocumentFront: '',
    representativeDocumentBack: '',
    bankAccountDocument: '',

    acceptStripeTos: false
  };

  if (data) {
    const { metadata, company, business_profile } = data;
    const companyName = company && company.name;
    const apiAccountDetail = apiData?.account_detail;

    if (company?.structure) {
      values.type = { value: company.structure };
      values.type.label = BUSINESS_TYPES.find(type => type.value === values.type.value)?.label;
    }

    companyName && (values.companyName = companyName);

    if (_.has(business_profile, 'product_description')) {
      values.description = business_profile.product_description;
    } else if (_.has(metadata, 'business_description')) {
      values.description = metadata.business_description;
    }

    if (_.has(business_profile, 'url')) {
      values.website = business_profile.url;
    } else if (_.has(metadata, 'website')) {
      values.website = metadata.website || '';
    }

    if (company?.address) {
      const address = company.address;
      const country = countriesList?.data?.find(
        country => country.code.toLowerCase() === address.country.toLowerCase()
      );

      // TEMPORARY HARD CODED COUNTRY VALUE:
      values.companyCountry = {
        value: 'United States of America',
        label: 'United States of America'
      };

      /* values.companyCountry = country && {
        value: country.name,
        label: country.name,
      }; */
      values.companyState = address.state || '';
      values.companyCity = address.city || '';
      values.companyZipCode = address.postal_code || '';
      values.companyAddress = address.line1 || '';
    }

    if (company?.phone) {
      values.companyPhone = company.phone;
    }

    if (data?.id) {
      const externalAccountData = (data?.external_accounts?.data || []).find(
        accountData => data.id === accountData.account
      );
      values.accountNumberLast4Digits = externalAccountData?.last4 || '****';
      values.routeNumber = externalAccountData?.routing_number || '*********';
    }

    // TEMPORARY HARD CODED COUNTRY VALUE:
    values.representativeCountry = {
      value: 'United States of America',
      label: 'United States of America'
    };

    // Representative
    if (apiAccountDetail) {
      values.representativeFirstName = apiAccountDetail.representative_first_name || "";
      values.representativeLastName = apiAccountDetail.representative_last_name || "";
      values.representativeDateOfBirth = parseIsoFormatDateToUsFormat(
        apiAccountDetail.representative_date_of_birth
      );
      if (apiAccountDetail.representative_ssn) {
        values.representativeSSNLast4Digits = generateLast4VisibleOnly(apiAccountDetail.representative_ssn.split(""));
      } else {
        values.representativeSSNLast4Digits = '';
      }
      // values.representativeCountry =
      values.representativeState = apiAccountDetail.representative_state || "";
      values.representativeCity = apiAccountDetail.representative_city || "";
      values.representativeAddress = apiAccountDetail.representative_line || "";
      values.representativeZipCode = apiAccountDetail.representative_zip_code || "";

      values.representativeEmail = apiAccountDetail.representative_email || "";
      values.representativePhone = apiAccountDetail.representative_phone_number || "";

      if (apiAccountDetail.representative_document_front?.url) {
        values.representativeDocumentFront = {
          name: generateNameFromAPIName(getFileNameFromUrl(apiAccountDetail.representative_document_front.url)) || 'Front'
        };
      }
      if (apiAccountDetail.representative_document_back?.url) {
        values.representativeDocumentBack = {
          name: generateNameFromAPIName(getFileNameFromUrl(apiAccountDetail.representative_document_back.url)) || 'Back'
        };
      }
      if (apiAccountDetail.bank_account_document?.url) {
        values.bankAccountDocument = {
          name: generateNameFromAPIName(getFileNameFromUrl(apiAccountDetail.bank_account_document.url)) || 'Account'
        };
      }
    }
  }
  return values;
};

export const individualParser = (data, apiData, countriesList) => {
  const values = {
    type: '',
    productDescription: '',
    firstName: '',
    lastName: '',
    dateOfBirth: formatDateToUsFormat(
      new Date(new Date().setFullYear(new Date().getFullYear() - 14))
    ),
    ssn: '',
    ssnLast4Digits: '',
    occupation: '',
    website: '',
    accNumber: '',
    routeNumber: '',
    accountNumberLast4Digits: '',
    address: '',
    city: '',
    zipCode: '',
    state: '',
    country: '',
    phone: '',
    acceptStripeTos: false
  };

  if (data) {
    const { individual, metadata, company } = data;
    const apiAccountDetail = apiData?.account_detail;

    if (metadata?.business_type) {
      values.type = { value: metadata.business_type };
      values.type.label = INDIVIDUAL_TYPES.find(type => type.value === values.type.value)?.label;
    }

    if (individual && (individual.first_name || individual.last_name)) {
      values.firstName = individual.first_name;
      values.lastName = individual.last_name;
    }
    if (_.has(data, 'business_profile.product_description')) {
      values.productDescription = _.get(data, 'business_profile.product_description') || '';
    }

    if (individual && individual.dob.year) {
      values.dateOfBirth = formatDateToUsFormat(
        new Date(
          Date.parse(
            `${individual.dob.year}-${individual.dob.month
              .toString()
              .padStart(2, '0')}-${individual.dob.day.toString().padStart(2, '0')}`
          )
        )
      );
    }
    metadata && metadata.occupation && (values.occupation = metadata.occupation);
    values.website = data.business_profile?.url || '';

    if (data?.id) {
      const externalAccountData = (data?.external_accounts?.data || []).find(
        accountData => data.id === accountData.account
      );
      values.accountNumberLast4Digits = externalAccountData?.last4 || '****';
      values.routeNumber = externalAccountData?.routing_number || '*********';
    }

    if (individual?.address) {
      const country = countriesList?.data?.find(
        country => country.code.toLowerCase() === individual.address.country.toLowerCase()
      );

      values.country = country && {
        value: country.name,
        label: country.name
      };
      values.state = individual.address.state || '';
      values.city = individual.address.city || '';
      values.zipCode = individual.address.postal_code || '';
      values.address = individual.address.line1 || '';
    }

    values.phone = individual?.phone || '';

    // Info taken from Kuprik API
    if (apiAccountDetail) {
      if (apiAccountDetail.SSN) {
        values.ssnLast4Digits = generateLast4VisibleOnly(apiAccountDetail.SSN.split(""));
      } else {
        values.ssnLast4Digits = '';
      }
    }
  }
  return values;
};
