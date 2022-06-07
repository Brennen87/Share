import { FETCH_COUNTRIES } from './actionTypes';
import Pathes from '../../common/pathes';
import axios from 'axios';

const fetchCountriesRequest = () => ({ type: FETCH_COUNTRIES.REQUEST });
const fetchCountriesSuccess = countries => ({ type: FETCH_COUNTRIES.SUCCESS, countries });
const fetchCountriesFailure = error => ({ type: FETCH_COUNTRIES.FAILURE, error });

export const fetchCountries = () => {
  return dispatch => {
    dispatch(fetchCountriesRequest());
    axios.get(Pathes.External.country).then(
      response => {
        const countries = response.data.map(country => ({
          name: country.name,
          code: country.alpha2Code,
          flag: country.flag || null
        }));
        dispatch(fetchCountriesSuccess(countries));
      },
      error => dispatch(fetchCountriesFailure(error))
    );
  };
};
