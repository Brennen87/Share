import * as React from 'react';
import { connect } from 'react-redux';
import ProfileEditPortfolioForm from '../../../components/Form/ProfileEditPortfolioForm';
import { createPortfolio, fetchPortfolio } from '../../../store/actions/portfolioActions';
import { uploadFile } from '../../../store/actions/fileActions';
import Notify from '../../../components/Notification';
import { resizeToNormalizedImage, resizeToThumbnailImage, dataURItoBlob } from '../../../helpers';
import { FILL_IN_ALL_REQUIRED_FIELDS } from '../../../common/constants';

class ProfileEditPortfolioSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      limit: 30
    };
  }

  componentDidMount() {
    const vendorId = this.props.vendor && this.props.vendor.data && this.props.vendor.data.id;
    if (vendorId) {
      this.props.fetchPortfolio(vendorId, this.state);
    }
  }

  render() {
    const { className, portfolioList } = this.props;

    return (
      <section className={className}>
        <ProfileEditPortfolioForm onSubmit={this.onSubmit} portfolioList={portfolioList} />
      </section>
    );
  }

  onSubmit = async (portfolioData, formikBag) => {
    if (portfolioData.portfolioTitle && portfolioData.portfolioDescription && portfolioData.image) {
      const portfolio = {
        title: portfolioData.portfolioTitle,
        description: portfolioData.portfolioDescription
      };

      if (portfolioData.image) {
        const thumbnailUri = await resizeToThumbnailImage(portfolioData.image);
        const thumbnail = new FormData();
        thumbnail.append('file', dataURItoBlob(thumbnailUri));
        await this.props.uploadFile(thumbnail).then(result => {
          if (result && result.id) {
            portfolio.thumbnail = result.id;
          }
        });

        const normalizedUri = await resizeToNormalizedImage(portfolioData.image);
        const normalized = new FormData();
        normalized.append('file', dataURItoBlob(normalizedUri));
        await this.props.uploadFile(normalized).then(result => {
          if (result && result.id) {
            portfolio.normalized = result.id;
          }
        });

        const image = new FormData();
        image.append('file', portfolioData.image);
        await this.props.uploadFile(image).then(result => {
          if (result && result.id) {
            portfolio.file = result.id;
          }
        });
        this.props.createPortfolio(portfolio).then(() => {
          formikBag.setSubmitting(false);
          formikBag.resetForm();
        });
      }
    } else {
      formikBag.setSubmitting(false);
      Notify.info({ text: FILL_IN_ALL_REQUIRED_FIELDS });
    }
  };
}

const mapStateToProps = state => ({
  vendor: state.profileStore.vendor,
  portfolioList: state.portfolioStore.portfolioList
});

const mapDispatchToProps = dispatch => ({
  uploadFile: file => dispatch(uploadFile(file)),
  createPortfolio: portfolio => dispatch(createPortfolio(portfolio)),
  fetchPortfolio: (vendorId, query) => dispatch(fetchPortfolio(vendorId, query))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileEditPortfolioSection);
