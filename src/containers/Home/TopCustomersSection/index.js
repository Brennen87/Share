import * as React from 'react';
import * as classnames from 'classnames';
import { connect } from 'react-redux';
import { fetchTopCustomers } from '../../../store/actions/vendorActions';
import TopCustomersCarousel from './carousel';

const RESOLUTION = {
  large: 1250
};

class TopCustomersSection extends React.Component {
  state = {
    isMobile: false,
    groupSize: 6
  };

  shouldComponentUpdate(prevProps, prevState) {
    return !(
      JSON.stringify(prevProps.topCustomers) === JSON.stringify(this.props.topCustomers) &&
      prevState.isMobile === this.state.isMobile
    );
  }

  componentDidMount() {
    this.setResolution();
    const isMobile = window.innerWidth < RESOLUTION.large;
    const groupSize = isMobile ? 3 : 6;
    this.props.fetchTopCustomers(`?limit=${groupSize * 3}`);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }

  render() {
    const { data } = this.props.topCustomers;
    const isEmpty = !data || (data && data.list && data.list.length < 4);

    return (
      <section
        className={classnames(
          'hp_top_vendors_section',
          isEmpty && 'hp_top_vendors_section__hidden'
        )}
      >
        <div className="container">
          <h2 className="hp_top_vendors_section__title">Best Rated Customers</h2>
          <TopCustomersCarousel
            isMobile={this.state.isMobile}
            customers={data && data.list}
            groupSize={this.state.groupSize}
          />
        </div>
      </section>
    );
  }

  setResolution() {
    this.onResize();
    window.addEventListener('resize', this.onResize);
  }

  onResize = () => {
    const isMobile = window.innerWidth < RESOLUTION.large;
    if (isMobile) {
      return this.setState({ ...this.state, isMobile, groupSize: 3 });
    }

    this.setState({ ...this.state, isMobile, groupSize: 6 });
  };
}

const mapStateToProps = state => ({
  topCustomers: state.vendorStore.topCustomers
});

const mapDispatchToProps = dispatch => ({
  fetchTopCustomers: query => dispatch(fetchTopCustomers(query))
});

export default connect(mapStateToProps, mapDispatchToProps)(TopCustomersSection);
