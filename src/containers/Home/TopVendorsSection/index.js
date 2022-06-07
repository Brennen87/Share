import * as React from 'react';
import * as classnames from 'classnames';
import { connect } from 'react-redux';
import { fetchTopVendors } from '../../../store/actions/vendorActions';
import TopVendorsCarousel from './carousel';

const RESOLUTION = {
  large: 1250
};

class TopVendorsSection extends React.Component {
  state = {
    isMobile: false,
    groupSize: 4
  };

  shouldComponentUpdate(prevProps, prevState) {
    return !(
      JSON.stringify(prevProps.topVendors) === JSON.stringify(this.props.topVendors) &&
      prevState.isMobile === this.state.isMobile
    );
  }

  componentDidMount() {
    this.props.fetchTopVendors({ limit: 12, page: 1 });
    this.setResolution();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }

  render() {
    const { data } = this.props.topVendors;
    const isEmpty = !data || (data && data.list && data.list.length < 1);

    return (
      <section
        className={classnames(
          'hp_top_vendors_section',
          isEmpty && 'hp_top_vendors_section__hidden'
        )}
      >
        <div className="container">
          <h2 className="hp_top_vendors_section__title">Top Vetted Vendors</h2>
          <TopVendorsCarousel
            isMobile={this.state.isMobile}
            vendors={data && data.list}
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
      return this.setState({ ...this.state, isMobile, groupSize: 2 });
    }

    this.setState({ ...this.state, isMobile, groupSize: 4 });
  };
}

const mapStateToProps = state => ({
  topVendors: state.vendorStore.topVendors
});

const mapDispatchToProps = dispatch => ({
  fetchTopVendors: () => dispatch(fetchTopVendors())
});

export default connect(mapStateToProps, mapDispatchToProps)(TopVendorsSection);
