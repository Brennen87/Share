import * as React from 'react';
import * as classnames from 'classnames';
import Select, { components } from 'react-select';
import queryString from 'query-string';
import { connect } from 'react-redux';
import StarRating from 'react-svg-star-rating';
import { fetchAllGenres } from '../../store/actions/commonActions';
import { FilterArrow } from './filterArrow';
import { fetchCountries } from '../../store/actions/externalActions';
import Checkbox from '../../components/UI/Checkbox';
import InputTextFieldSmall from '../../components/UI/InputTextFieldSmall';
import { FILTER_RATING_STARS_SIZE, RATING_STARS_COUNT } from '../../common/dicts';
import { singleValueSelect } from '../../common/selectFieldStyles/singleValueSelect';
import './index.scss';

const COUNTRY_CONFIGS = {
  isSearchable: true,
  isClearable: true
};

const DropdownIndicator = props => {
  return (
    <components.DropdownIndicator {...props}>
      <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg">
        <g>
          <title>Layer 1</title>
          <path
            id="svg_1"
            fill="#324A5E"
            d="m15.94264,7.09647l-0.6012,-0.60112c-0.0801,-0.08027 -0.1723,-0.12028 -0.2767,-0.12028c-0.104,0 -0.1963,0.04001 -0.2764,0.12028l-4.72574,4.72552l-4.72555,-4.72539c-0.08015,-0.08027 -0.17238,-0.12028 -0.27658,-0.12028c-0.10423,0 -0.19647,0.04001 -0.27657,0.12028l-0.60108,0.60116c-0.08027,0.0801 -0.12028,0.17234 -0.12028,0.27657c0,0.10416 0.04014,0.19639 0.12028,0.27649l5.60321,5.60334c0.0801,0.08014 0.17238,0.12019 0.27657,0.12019c0.1042,0 0.19631,-0.04005 0.27637,-0.12019l5.60367,-5.60334c0.0801,-0.08014 0.1199,-0.17238 0.1199,-0.27649c0,-0.10423 -0.0398,-0.19647 -0.1199,-0.27674z"
          />
        </g>
      </svg>
    </components.DropdownIndicator>
  );
};

const ClearIndicator = props => {
  return (
    <components.DropdownIndicator {...props}>
      <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg">
        <g>
          <title>Layer 1</title>
          <path
            id="svg_1"
            fill="#324A5E"
            d="m15.99457,4.94001l-0.6012,-0.60112c-0.0801,-0.08027 -0.1723,-0.12028 -0.2767,-0.12028c-0.104,0 -0.1963,0.04001 -0.2764,0.12028l-4.72574,4.72552l-4.72555,-4.72539c-0.08015,-0.08027 -0.17238,-0.12028 -0.27658,-0.12028c-0.10423,0 -0.19647,0.04001 -0.27657,0.12028l-0.60108,0.60116c-0.08027,0.0801 -0.12028,0.17234 -0.12028,0.27657c0,0.10416 0.04014,0.19639 0.12028,0.27649l5.60321,5.60334c0.0801,0.08014 0.17238,0.12019 0.27657,0.12019c0.1042,0 0.19631,-0.04005 0.27637,-0.12019l5.60367,-5.60334c0.0801,-0.08014 0.1199,-0.17238 0.1199,-0.27649c0,-0.10423 -0.0398,-0.19647 -0.1199,-0.27674z"
          />
          <path
            id="svg_2"
            fill="#324A5E"
            d="m16.07768,9.79079l-0.6012,-0.60112c-0.0801,-0.08027 -0.1723,-0.12028 -0.2767,-0.12028c-0.104,0 -0.1963,0.04001 -0.2764,0.12028l-4.72574,4.72552l-4.72555,-4.72539c-0.08015,-0.08027 -0.17238,-0.12028 -0.27658,-0.12028c-0.10423,0 -0.19647,0.04001 -0.27657,0.12028l-0.60108,0.60116c-0.08027,0.0801 -0.12028,0.17234 -0.12028,0.27657c0,0.10416 0.04014,0.19639 0.12028,0.27649l5.60321,5.60334c0.0801,0.08014 0.17238,0.12019 0.27657,0.12019c0.1042,0 0.19631,-0.04005 0.27637,-0.12019l5.60367,-5.60334c0.0801,-0.08014 0.1199,-0.17238 0.1199,-0.27649c0,-0.10423 -0.0398,-0.19647 -0.1199,-0.27674z"
            transform="rotate(180, 10.1976, 12.5685)"
          />
          <rect
            transform="rotate(45, 15.0142, 5.39421)"
            id="svg_4"
            height="2.05795"
            width="6.4025"
            y="4.36524"
            x="11.81295"
            opacity="undefined"
            stroke-opacity="null"
            stroke-dasharray="null"
            stroke-width="null"
            stroke="null"
            fill="#ffffff"
          />
          <rect
            transform="rotate(45, 5.18179, 14.7693)"
            id="svg_5"
            height="2.05795"
            width="6.4025"
            y="13.74033"
            x="1.98054"
            opacity="undefined"
            stroke-opacity="null"
            stroke-dasharray="null"
            stroke-width="null"
            stroke="null"
            fill="#ffffff"
          />
          <rect
            transform="rotate(135, 15.0142, 14.9653)"
            id="svg_6"
            height="2.05795"
            width="6.4025"
            y="13.93632"
            x="11.81295"
            opacity="undefined"
            stroke-opacity="null"
            stroke-dasharray="null"
            stroke-width="null"
            stroke="null"
            fill="#ffffff"
          />
          <rect
            transform="rotate(135, 5.21445, 5.39419)"
            id="svg_7"
            height="2.05795"
            width="6.4025"
            y="4.36524"
            x="2.01321"
            opacity="undefined"
            stroke-opacity="null"
            stroke-dasharray="null"
            stroke-width="null"
            stroke="null"
            fill="#ffffff"
          />
        </g>
      </svg>
    </components.DropdownIndicator>
  );
};

class VendorFilter extends React.Component {
  componentDidMount() {
    this.props.fetchAllGenres();
    this.props.fetchCountries();
    this.syncFilters();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.query !== this.props.query) {
      this.syncFilters();
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      openFilters: [],
      expertises: [],
      services: [],
      genres: [],
      country: null,
      project_completed_min: null,
      project_completed_max: null,
      rate: null
    };
  }

  syncFilters = () => {
    const query = queryString.parse(this.props.query);

    const {
      expertises,
      services,
      genres,
      country,
      rate,
      project_completed_min,
      project_completed_max
    } = query;

    const filters = {
      expertises:
        (expertises &&
          (typeof expertises === 'string'
            ? [parseInt(expertises)]
            : expertises.map(item => parseInt(item)))) ||
        [],
      services:
        (services &&
          (typeof services === 'string'
            ? [parseInt(services)]
            : services.map(item => parseInt(item)))) ||
        [],
      genres:
        (genres &&
          (typeof genres === 'string' ? [parseInt(genres)] : genres.map(item => parseInt(item)))) ||
        [],
      country: (country && { value: country, label: country }) || null,
      rate: rate || null,
      project_completed_min: project_completed_min || null,
      project_completed_max: project_completed_max || null
    };

    this.setState({ ...this.state, ...filters });
  };

  toggleFilter = filterName => {
    let openFilters = [...this.state.openFilters];
    if (openFilters.includes(filterName)) {
      openFilters = openFilters.filter(filter => filter !== filterName);
    } else {
      openFilters.push(filterName);
    }
    this.setState({ ...this.state, openFilters });
  };

  setFilter = async (filter, value) => {
    let values = [...this.state[filter]];
    if (values && values.includes(value)) {
      values = values.filter(item => item !== value);
    } else {
      values.push(value);
    }
    await this.setState({ ...this.state, [filter]: values });
    this.updateParams();
  };

  onExpertiseClick = async id => {
    const { sortedGenres } = this.props;
    if (sortedGenres && sortedGenres.data) {
      const genres = sortedGenres.data[id].map(genre => genre.id);

      if (this.state.expertises.includes(id)) {
        await this.setState({
          expertises: this.state.expertises.filter(expertise => expertise !== id)
        });
      } else {
        await this.setState({
          expertises: [...this.state.expertises, id]
        });
      }

      this.updateParams();
    }
  };

  expertiseCheckInfo = id => {
    const { sortedGenres } = this.props;
    if (sortedGenres && sortedGenres.data) {
      const genres = sortedGenres.data[id].map(genre => genre.id);
      const checkedGenres = this.state.genres.filter(genre => genres.includes(genre)).length;
      return {
        checked: checkedGenres === genres.length || this.state.expertises.includes(id),
        count: genres.length,
        checkedSingle: checkedGenres > 0 && checkedGenres < genres.length
      };
    }

    return { checked: false, count: 0, checkedSingle: false };
  };

  onRateSelect = async value => {
    await this.setState({
      ...this.state,
      rate: Number(value) === Number(this.state.rate) ? null : value
    });
    this.updateParams();
  };

  onCountrySelect = async country => {
    if (country) {
      await this.setState({ ...this.state, country: country.value });
    } else {
      await this.setState({ ...this.state, country: null });
    }
    this.updateParams();
  };

  onInputChange = e => {
    const value = Math.floor(e.target.value);
    if (!Number.isNaN(value)) {
      this.setState({ ...this.state, [e.target.name]: value !== 0 ? value : null });
    }
  };

  onProjectCompleteApply = () => {
    this.updateParams();
  };

  updateParams = () => {
    const query = { ...this.props.extraParams, ...this.state, page: 1 };
    delete query.openFilters;
    const requestQuery = `?${queryString.stringify(query, { skipNull: true })}`;

    this.props.history.replace({
      pathname: '/vendors',
      search: requestQuery
    });
  };

  render() {
    const { categories, expertises, sortedGenres, countries, className } = this.props;

    const resortedCountries = () => {
      if (!countries || !countries.data) {
        return [];
      }
      const countryToTop = 'United States of America';
      return [
        { name: countryToTop },
        ...countries.data.filter(country => country.name !== countryToTop)
      ].map(country => ({
        value: country.name,
        label: country.name
      }));
    };

    return (
      <div className={classnames('vendor_filter', className)}>
        <div className="vendor_filter__services">
          <div
            className="vendor_filter__services_header"
            onClick={() => this.toggleFilter('services')}
          >
            <div className="vendor_filter__services_title">Services</div>
          </div>
          {categories && categories.data && (
            <div className="vendor_filter__services_menu">
              <div className="vendor_filter__services_menu__wrapper">
                {categories &&
                  categories.data &&
                  categories.data.list &&
                  categories.data.list.map(category => (
                    <Checkbox
                      key={category.id}
                      className="vendor_filter__services_item"
                      label={category.name}
                      name={`expertises${category.id}`}
                      value={category.id}
                      checked={this.state.services.includes(category.id)}
                      onChange={() => this.setFilter('services', category.id)}
                    />
                  ))}
              </div>
            </div>
          )}
        </div>

        <div className="vendor_filter__expertises">
          <div
            className="vendor_filter__expertises_header"
            onClick={() => this.toggleFilter('expertises')}
          >
            <div className="vendor_filter__expertises_title">Categories</div>
          </div>
          {expertises && expertises.data && (
            <div className="vendor_filter__expertises_menu">
              <div className="vendor_filter__expertises_menu__wrapper">
                {expertises.data.list.map(expertise => (
                  <React.Fragment key={expertise.id}>
                    <div className="vendor_filter__expertises_item">
                      <Checkbox
                        key={expertise.id}
                        className={classnames(
                          'vendor_filter__expertises_checkbox',
                          this.expertiseCheckInfo(expertise.id).checkedSingle &&
                            'vendor_filter__expertises_checkbox_offset'
                        )}
                        label={expertise.name}
                        name={`expertise${expertise.id}`}
                        value={expertise.id}
                        checked={this.expertiseCheckInfo(expertise.id).checked}
                        onChange={() => this.onExpertiseClick(expertise.id)}
                      />
                      <FilterArrow
                        className="vendor_filter__expertises_arrow"
                        active={this.state.openFilters.includes(`expertise-${expertise.id}`)}
                        onClick={() => this.toggleFilter(`expertise-${expertise.id}`)}
                      />
                    </div>
                    {sortedGenres && sortedGenres.data && (
                      <div
                        className={classnames(
                          'vendor_filter__genres_menu',
                          this.state.openFilters.includes(`expertise-${expertise.id}`) &&
                            'vendor_filter__genres_menu_open'
                        )}
                      >
                        <div className="vendor_filter__genres_menu__wrapper">
                          {sortedGenres.data[expertise.id].map(genre => (
                            <Checkbox
                              key={genre.id}
                              className="vendor_filter__genres_item"
                              label={genre.name}
                              name={`genre${genre.id}`}
                              value={genre.id}
                              checked={this.state.genres.includes(genre.id)}
                              onChange={() => this.setFilter('genres', genre.id)}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="vendor_filter__divider" />
        <div className="vendor_filter__rating">
          <StarRating
            initialRating={this.state.rate}
            size={FILTER_RATING_STARS_SIZE}
            count={RATING_STARS_COUNT}
            hoverColor="#FAC917"
            activeColor="#FAC917"
            handleOnClick={this.onRateSelect}
            isHalfRating
          />
        </div>
        <div className="vendor_filter__divider" />

        <div className="vendor_filter__projects">
          <div className="vendor_filter__projects_title">Projects Completed</div>
          <div className="vendor_filter__projects_inputs">
            <div className="vendor_filter__projects_inputs_content">
              <InputTextFieldSmall
                value={this.state.project_completed_min || ''}
                name='project_completed_min'
                onChange={this.onInputChange}
                className="vendor_filter__projects_inputs_content_input"
              />
              <span>to</span>
              <InputTextFieldSmall
                value={this.state.project_completed_max || ''}
                name='project_completed_max'
                onChange={this.onInputChange}
                className="vendor_filter__projects_inputs_content_input"
              />
            </div>
            <FilterArrow onClick={this.onProjectCompleteApply} />
          </div>
        </div>

        <div className="vendor_filter__divider" />
        {countries && countries.data && (
          <div className="vendor_filter__location">
            <label className="vendor_filter__location_title" htmlFor="location">
              Vendor Location
            </label>
            <Select
              components={{ ClearIndicator, DropdownIndicator }}
              className="select__input"
              classNamePrefix="select select_vendor"
              isLoading={countries.loading}
              isClearable={COUNTRY_CONFIGS.isClearable}
              isSearchable={COUNTRY_CONFIGS.isSearchable}
              onChange={this.onCountrySelect}
              name="location"
              styles={singleValueSelect}
              value={this.state.country}
              options={resortedCountries()}
              maxMenuHeight={170}
              placeholder=""
              filterOption={(option, input) =>
                option.value.toLowerCase().startsWith(input.toLowerCase())
              }
            />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  categories: state.commonStore.categoriesList,
  expertises: state.commonStore.expertisesList,
  sortedGenres: state.commonStore.sortedGenres,
  countries: state.commonStore.countriesList
});

const mapDispatchToProps = dispatch => ({
  fetchAllGenres: () => dispatch(fetchAllGenres()),
  fetchCountries: () => dispatch(fetchCountries())
});

export default connect(mapStateToProps, mapDispatchToProps)(VendorFilter);
