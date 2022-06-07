import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import EditPortfolioForm from '../../../components/Form/EditPortfolioForm';
import { uploadFile } from '../../../store/actions/fileActions';
import { editPortfolio, deletePortfolio } from '../../../store/actions/portfolioActions';
import { resizeToNormalizedImage, resizeToThumbnailImage, dataURItoBlob } from '../../../helpers';
import './index.scss';

class PortfolioModalContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chosenPortfolio: props.chosenPortfolio
    };
  }

  showNextPortfolio = () => {
    const portfolioList = this.props.portfolioList.data.list;
    const curIndex = portfolioList.findIndex(
      portfolio => portfolio.id === this.state.chosenPortfolio.id
    );

    const currentPortfolioIndex = curIndex !== portfolioList.length - 1 ? curIndex + 1 : 0;
    const nextPortfolio = portfolioList[currentPortfolioIndex];
    if (nextPortfolio) {
      this.setState({ chosenPortfolio: nextPortfolio });
    }
  };

  showPreviousPortfolio = () => {
    const portfolioList = this.props.portfolioList.data.list;
    const curIndex = portfolioList.findIndex(
      portfolio => portfolio.id === this.state.chosenPortfolio.id
    );
    const currentPortfolioIndex = curIndex === 0 ? portfolioList.length - 1 : curIndex - 1;
    const previousPortfolio = portfolioList[currentPortfolioIndex];
    if (previousPortfolio) {
      this.setState({ chosenPortfolio: previousPortfolio });
    }
  };

  onSubmit = async (data, formikBag) => {
    const portfolio = {
      id: data.id,
      title: data.title,
      description: data.description,
      file: data.file.id
    };

    if (data.file) {
      if (data.file !== this.state.chosenPortfolio.file) {
        const thumbnailUri = await resizeToThumbnailImage(data.file);
        const thumbnail = new FormData();
        thumbnail.append('file', dataURItoBlob(thumbnailUri));
        await this.props.uploadFile(thumbnail).then(result => {
          if (result && result.id) {
            portfolio.thumbnail = result.id;
          }
        });

        const normalizedUri = await resizeToNormalizedImage(data.file);
        const normalized = new FormData();
        normalized.append('file', dataURItoBlob(normalizedUri));
        await this.props.uploadFile(normalized).then(result => {
          if (result && result.id) {
            portfolio.normalized = result.id;
          }
        });

        const image = new FormData();
        image.append('file', data.file);
        await this.props.uploadFile(image).then(result => {
          if (result && result.id) {
            portfolio.file = result.id;
          }
        });
      }
      this.props.editPortfolio(portfolio).then(() => {
        formikBag.setSubmitting(false);
        this.props.onClose();
      });
    } else {
      formikBag.setSubmitting(false);
      this.props.onClose({ portfolioMarkedToDelete: portfolio });
    }
  };

  render() {
    const { user, profileModal, vendor, publicVendor } = this.props;
    const selectedVendor = !profileModal ? publicVendor : vendor;
    return (
      <div className="portfolio_modal_content">
        <span className="portfolio_modal_content__prev_button" onClick={this.showPreviousPortfolio}>
          <svg
            width="15"
            height="24"
            viewBox="0 0 15 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M13 2L3 11.7568L13 22" stroke="white" strokeWidth="3.5" />
          </svg>
        </span>

        <EditPortfolioForm
          portfolio={this.state.chosenPortfolio}
          onSubmit={this.onSubmit}
          edit={(user && user.vendor_id) === (selectedVendor && selectedVendor.id) && profileModal}
          onClose={this.props.onClose}
        />

        <span className="portfolio_modal_content__next_button" onClick={this.showNextPortfolio}>
          <svg
            width="15"
            height="24"
            viewBox="0 0 15 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M2 2L12 11.7568L2 22" stroke="white" strokeWidth="3.5" />
          </svg>
        </span>
      </div>
    );
  }
}

PortfolioModalContent.propTypes = {
  chosenPortfolio: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.userStore.user,
  portfolioList: state.portfolioStore.portfolioList,
  vendor: state.profileStore.vendor.data,
  publicVendor: state.profileStore.publicProfile.vendor
});

const mapDispatchToProps = dispatch => ({
  uploadFile: file => dispatch(uploadFile(file)),
  editPortfolio: portfolio => dispatch(editPortfolio(portfolio)),
  deletePortfolio: portfolio => dispatch(deletePortfolio(portfolio))
});

export default connect(mapStateToProps, mapDispatchToProps)(PortfolioModalContent);
