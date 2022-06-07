import * as React from 'react';
import queryString from 'query-string';
import CustomerCard from '../../components/Cards/CustomerCard';
import { connect } from 'react-redux';
import {
  fetchCustomers as fetchCustomersAction,
  fetchTopCustomers as fetchTopCustomersAction
} from '../../store/actions/vendorActions';
import Preloader from '../../components/Preloader';
import EmptyData from '../../components/EmptyData';
import dispatchConversation from '../../store/actions/conversationAction';
import { getFullName } from '../../helpers';
import Pagination from '../../components/Pagination';
import './index.scss';

const DEFAULT_PAGE_SIZE = 7;

class Customers extends React.Component {
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
    this.getCustomers(`?${urlParameters.toString()}`);
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
        pathname: '/customers',
        search: search.toString()
      });

      const currentQuery = queryString.parse(this.props.location.search) || {};
      const requestQuery = `?${queryString.stringify(
        { limit: DEFAULT_PAGE_SIZE, ...currentQuery, page },
        { skipNull: true }
      )}`;

      this.getCustomers(requestQuery);
    }
  }
  render() {
    return (
      <div className="vendors">
        <div className="vendors__content">
          <div className="vendors__list">{this.renderContent()}</div>
        </div>
      </div>
    );
  }

  getCustomers = query => {
    // this.props.fetchCustomers(query);
    this.props.fetchTopCustomers(query);
  };

  renderContent = () => {
    const { topCustomers } = this.props;

    if (topCustomers.loading) {
      return <Preloader className="vendors__preloader" />;
    }

    if (topCustomers && topCustomers.data) {
      const customers = topCustomers.data.list.map(customer => (
        <CustomerCard key={customer.id} customer={customer} onRemove={false} relatedChat={null} />
      ));

      return !customers.length ? (
        <EmptyData text="No customers found" />
      ) : (
        <>
          {customers}
          <div className="projects_list__pagination">
            <Pagination
              totalPages={(topCustomers.data && topCustomers.data.total_pages) || 0}
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
  customersList: state.vendorStore.customersList,
  topCustomers: state.vendorStore.topCustomers
});

const mapDispatchToProps = dispatch => ({
  conversation: user => dispatch(dispatchConversation(user)),
  fetchCustomers: query => dispatch(fetchCustomersAction(query)),
  fetchTopCustomers: query => dispatch(fetchTopCustomersAction(query))
});

export default connect(mapStateToProps, mapDispatchToProps)(Customers);
