import * as React from 'react';
import { connect } from 'react-redux';
import PortfolioCard from '../../../components/Cards/PortfolioCard';
import Modal from '../../../components/UI/Modal';
import PortfolioModalContent from '../PortfolioModalContent';
import { fetchPortfolio } from '../../../store/actions/portfolioActions';
import './index.scss';

class PortfolioSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chosenPortfolio: null,
      showModal: false,
      page: 1,
      limit: this.getLimitBySize()
    };
  }

  componentDidMount() {
    if (this.props.vendorId) {
      const { page, limit } = this.state;
      this.props.fetchPortfolio(this.props.vendorId, {
        page,
        limit
      });
    }
  }

  getLimitBySize = () => {
    if (window.innerWidth <= 1024 && window.innerWidth > 992) {
      return 8;
    }
    if (window.innerWidth <= 992 && window.innerWidth > 800) {
      return 4;
    }
    if (window.innerWidth <= 800 && window.innerWidth > 576) {
      return 3;
    }
    if (window.innerWidth <= 576) {
      return 2;
    }
    return 5;
  };

  clickPortfolioHandler = id => {
    const chosenPortfolio = this.props.portfolioList.data.list.find(
      portfolio => portfolio.id === id
    );

    this.setState({ chosenPortfolio, showModal: true });
  };

  closeHandler = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  getAllPortfolioElements = () => {
    const { total_count } = this.props.portfolioList.data;
    this.setState({ ...this.state, page: 1, gotAll: true });

    this.props.fetchPortfolio(this.props.vendorId, {
      page: 1,
      limit: total_count
    });
  };

  getLessPortfolio = () => {
    this.setState({ ...this.state, page: 1, gotAll: false });
    this.props.fetchPortfolio(this.props.vendorId, {
      page: 1,
      limit: this.state.limit
    });
  };

  render() {
    const { data } = this.props.portfolioList;
    return <>{this.renderContent(data)}</>;
  }

  renderContent(data) {
    const { showModal, chosenPortfolio } = this.state;
    if (data && !data.total_count) {
      return null;
    }
    return (
      <React.Fragment>
        <div className="public_portfolio_section">
          <div className="public_portfolio_section__title">Portfolio</div>
          <div className="public_portfolio_section__cards_wrap">
            <div className="public_portfolio_section__cards">
              {data &&
                data.list.map(portfolio => (
                  <PortfolioCard
                    key={portfolio.id}
                    portfolio={portfolio}
                    clickPortfolioHandler={this.clickPortfolioHandler}
                  />
                ))}
            </div>
          </div>
          {data && this.state.page < data.total_pages && (
            <div className="show_more_btn" onClick={this.getAllPortfolioElements}>
              Show more
            </div>
          )}

          {data && this.state.gotAll && this.state.page === data.total_pages && (
            <div className="show_more_btn" onClick={this.getLessPortfolio}>
              Show less
            </div>
          )}
        </div>
        {showModal && chosenPortfolio && (
          <Modal onClose={this.closeHandler} className="portfolio_modal">
            <PortfolioModalContent chosenPortfolio={chosenPortfolio} onClose={this.closeHandler} />
          </Modal>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  portfolioList: state.portfolioStore.portfolioList
});

const mapDispatchToProps = dispatch => ({
  fetchPortfolio: (vendorId, query, isNext) => dispatch(fetchPortfolio(vendorId, query, isNext))
});

export default connect(mapStateToProps, mapDispatchToProps)(PortfolioSection);
