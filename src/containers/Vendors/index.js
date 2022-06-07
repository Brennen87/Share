import * as React from 'react';
import * as classnames from 'classnames';
import queryString from 'query-string';
import VendorCard from '../../components/Cards/VendorCard';
import VendorFilter from '../VendorFilter';
import { connect } from 'react-redux';
import { fetchVendors } from '../../store/actions/vendorActions';
import Preloader from '../../components/Preloader';
import EmptyData from '../../components/EmptyData';
import dispatchConversation from '../../store/actions/conversationAction';
import { getFullName } from '../../helpers';
import Pagination from '../../components/Pagination';
import ScreenResolver from '../../components/ScreenResolver';
import { FilterArrow } from '../VendorFilter/filterArrow';
import './index.scss';

const DEFAULT_PAGE_SIZE = 7;

function hasDifferentFilters(previousQuery, currentQuery) {
  const possibleFilters = [
    'country',
    'genres',
    'project_completed_max',
    'project_completed_min',
    'rate',
    'expertises',
    'services'
  ];
  for (let i = 0; i < possibleFilters.length; i++) {
    const previousValue =
      possibleFilters[i] in previousQuery ? previousQuery[possibleFilters[i]] : null;
    const currentValue =
      possibleFilters[i] in currentQuery ? currentQuery[possibleFilters[i]] : null;

    if (previousValue || currentValue) {
      if (
        Array.isArray(previousValue) &&
        Array.isArray(currentValue) &&
        previousValue.length === currentValue.length
      ) {
        for (let j = 0; j < previousValue.length; j++) {
          if (!currentValue.includes(previousValue[j])) {
            return true;
          }
        }
      } else if (previousValue !== currentValue) {
        return true;
      }
    }
  }
  return false;
}

class Vendors extends React.Component {
  constructor(props) {
    super(props);
    const search = new URLSearchParams(this.props.location.search);
    const currentPageParamInUrl = Number(search.get('page')) || 1;
    this.state = {
      limit: DEFAULT_PAGE_SIZE,
      page: currentPageParamInUrl,
      show: false
    };
  }

  componentDidMount() {
    const urlParameters = new URLSearchParams(this.props.location.search);
    if (!urlParameters.has('limit')) {
      urlParameters.set('limit', DEFAULT_PAGE_SIZE);
    }
    this.getVendors(`?${urlParameters.toString()}`);
    window.scrollTo(0, 0);
  }

  componentDidUpdate(prevProps, prevState) {
    const { page } = this.state;
    const search = new URLSearchParams(this.props.location.search);
    const currentPageParamInUrl = Number(search.get('page')) || 1;
    const previousSearch = new URLSearchParams(prevProps.location.search);
    const previousPageParamInUrl = Number(previousSearch.get('page')) || 1;

    if (currentPageParamInUrl !== previousPageParamInUrl) {
      this.setState({ page: currentPageParamInUrl });
      return;
    }

    if (page !== prevState.page) {
      search.set('page', page);
      this.props.history.replace({
        pathname: '/vendors',
        search: search.toString()
      });

      const currentQuery = queryString.parse(this.props.location.search) || {};
      const requestQuery = `?${queryString.stringify(
        { limit: DEFAULT_PAGE_SIZE, ...currentQuery, page },
        { skipNull: true }
      )}`;
      this.getVendors(requestQuery);
    }

    const vendorsList = prevProps?.vendorsList?.data;

    const previousQuery = queryString.parse(prevProps.location.search) || {};
    const currentQuery = queryString.parse(this.props.location.search) || {};
    const requestQuery = `?${queryString.stringify(
      { limit: DEFAULT_PAGE_SIZE, ...currentQuery, page },
      { skipNull: true }
    )}`;

    // const hasPageChanged = vendorsList && previousPage !== page && vendorsList.total_pages >= page;
    const hasFilterChanged = hasDifferentFilters(previousQuery, currentQuery);

    if (hasFilterChanged) {
      this.getVendors(requestQuery);
    }
  }
  render() {
    const categoryName = this.getCategoryName();
    const tagName = this.getTagName();
    const { vendorsList } = this.props;

    return (
      <div className="vendors">
        {categoryName && !tagName && vendorsList.data && !!vendorsList.data.list.length && (
          <div className="vendors__category_name">{categoryName}</div>
        )}

        {tagName && !categoryName && vendorsList.data && !!vendorsList.data.list.length && (
          <div className="vendors__genre_name">
            Vendors experienced in <span>{tagName}</span> topic
          </div>
        )}

        <div className="vendors__content">
          <div className="vendors__list">{this.renderContent()}</div>

          <div className="vendors__filters_wrapper">
            <ScreenResolver
              large={991}
              desktop={
                <VendorFilter
                  query={this.props.location.search}
                  history={this.props.history}
                  extraParams={this.state}
                  className="vendors__filters"
                />
              }
              mobile={
                <div className="vendors__filters_mobile">
                  <div
                    className="vendors__filters_dropdown"
                    onClick={() => this.setState({ show: !this.state.show })}
                  >
                    <span>Filters</span>
                    <FilterArrow active={this.state.show} />
                  </div>
                  <div
                    className={classnames(
                      'vendors__filters_dropdown_content',
                      this.state.show && 'show'
                    )}
                  >
                    <VendorFilter
                      query={this.props.location.search}
                      history={this.props.history}
                      extraParams={this.state}
                      className="vendors__filters"
                    />
                  </div>
                </div>
              }
            />
          </div>
        </div>
      </div>
    );
  }

  getVendors = query => {
    this.props.fetchVendors(query);
  };

  getCategoryName = () => {
    const query = queryString.parse(this.props.location.search);
    let name = '';
    const categories =
      this.props.categories && this.props.categories.data && this.props.categories.data.list;
    if (query && query.services && categories && typeof query.services === 'string') {
      const result = categories.find(category => category.id.toString() === query.services);
      if (result) {
        name = result.name;
      }
    }
    return name;
  };

  getTagName = () => {
    const query = queryString.parse(this.props.location.search);
    let name = '';
    const { data } = this.props.sortedGenres;

    if (query && query.genres && typeof query.genres === 'string' && data) {
      Object.keys(data).forEach(id => {
        const result = data[id].find(genre => genre.id.toString() === query.genres);
        if (result) {
          name = result.name;
        }
      });
    }

    return name;
  };

  onContact = async ({ user_id, first_name, last_name, avatar }) => {
    const { user } = this.props;
    if (!user) {
      return this.props.history.push('/login');
    }

    const options = {
      value: user_id,
      label: getFullName(first_name, last_name, 'vendor'),
      avatar
    };
    const chat = await this.props.conversation(options);

    if (chat) {
      this.props.history.push('/inbox');
    }
  };

  renderContent = () => {
    const { vendorsList, user } = this.props;

    if (vendorsList.loading) {
      return <Preloader className="vendors__preloader" />;
    }

    if (vendorsList && vendorsList.data && vendorsList.data.list) {
      const vendors = vendorsList.data.list.map(vendor => (
        <VendorCard
          key={vendor.id}
          role={user && user.role}
          onContact={() => {
            const { user_id, first_name, last_name, avatar } = vendor;
            return this.onContact({ user_id, first_name, last_name, avatar });
          }}
          vendor={{
            id: vendor.id,
            userId: vendor.user_id,
            firstName: vendor.first_name,
            lastName: vendor.last_name,
            services: vendor.services,
            expertise: vendor.expertises,
            genres: vendor.genres,
            rating: { rate: vendor.review.rating, count: vendor.review.count },
            charge: vendor.rate,
            completedProjects: vendor.projects.completed,
            location: vendor.country,
            avatar: vendor.avatar,
            description: vendor.mini_resume,
            online: vendor.online,
            username: vendor.username
          }}
          searchText={this.getTagName()}
        />
      ));

      return !vendors.length ? (
        <EmptyData text="special-text" />
      ) : (
        <>
          {vendors}
          <div className="projects_list__pagination">
            <Pagination
              totalPages={(vendorsList.data && vendorsList.data.total_pages) || 0}
              activePage={this.state.page}
              onChange={page => {
                this.setState({ ...this.state, page });
              }}
            />
          </div>
        </>
      );
    }

    return <div className="vendors__error">Something went wrong</div>;
  };
}

const mapStateToProps = state => ({
  user: state.userStore.user,
  categories: state.commonStore.categoriesList,
  sortedGenres: state.commonStore.sortedGenres,
  vendorsList: state.vendorStore.vendorsList
});

const mapDispatchToProps = dispatch => ({
  conversation: user => dispatch(dispatchConversation(user)),
  fetchVendors: query => dispatch(fetchVendors(query))
});

export default connect(mapStateToProps, mapDispatchToProps)(Vendors);
