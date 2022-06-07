import * as React from 'react';
import Modal from '../../UI/Modal';
import * as classnames from 'classnames';
import PortfolioModalContent from '../../../containers/PublicProfile/PortfolioModalContent';
import TextareaField from '../../UI/TextareaField';
import SmallButton from '../../UI/SmallButton';
import InputTextFieldSmall from '../../UI/InputTextFieldSmall';
import { Formik } from 'formik';
import {
  ALLOWED_FORMATS,
  TEN_MB_AS_BYTES,
  ATTACHMENTS_LIMIT_TEXT
} from '../../../common/constants';
import Notify from '../../Notification';
import { connect } from 'react-redux';
import { deletePortfolio } from '../../../store/actions/portfolioActions';
import './index.scss';

class ProfileEditPortfolioForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chosenPortfolio: null,
      showModal: false,
      justDeleted: []
    };
  }

  openModal = id => {
    const chosenPortfolio = this.props.portfolioList.data.list.find(
      portfolio => portfolio.id === id
    );
    this.setState({ chosenPortfolio, showModal: true });
  };

  closeModal = ({ portfolioMarkedToDelete } = { portfolioMarkedToDelete: null }) => {
    this.setState({ showModal: !this.state.showModal }, async () => {
      if (portfolioMarkedToDelete) {
        await this.deletePortfolioItem(portfolioMarkedToDelete);
      }
    });
  };

  async deletePortfolioItem(portfolio) {
    await this.props.deletePortfolio(portfolio);
    this.setState(state => ({ justDeleted: [...state.justDeleted, portfolio.id] }));
  }

  render() {
    const { portfolioList, onSubmit } = this.props;
    const { chosenPortfolio, showModal } = this.state;

    return (
      <React.Fragment>
        <div className="pep_portfolio_form">
          <Formik
            initialValues={{
              portfolioTitle: '',
              image: null,
              portfolioDescription: ''
            }}
            onSubmit={(values, formikBag) => onSubmit(values, formikBag)}
          >
            {({ values, handleChange, handleSubmit, setFieldValue, handleReset, isSubmitting }) => (
              <form className="pep_portfolio_form__form" autoComplete="off" onSubmit={handleSubmit}>
                <div className="pep_portfolio_form__title">
                  Portfolio <span>(Optional)</span>
                </div>
                <div className="pep_portfolio_form__portfolios">
                  {portfolioList &&
                    portfolioList.data &&
                    portfolioList.data.list
                      .filter(portfolioItem => !this.state.justDeleted.includes(portfolioItem.id))
                      .map(portfolio => (
                        <div className="pep_portfolio_form__portfolios_item" key={portfolio.id}>
                          <div className="pep_portfolio_form__portfolios_item_inner">
                            <div className="pep_portfolio_form__portfolios_item_title">
                              {portfolio.title}
                            </div>
                            <div
                              className="pep_portfolio_form__portfolios_item_edit"
                              onClick={() => this.openModal(portfolio.id)}
                            />
                            <div
                              className="pep_portfolio_form__portfolios_item_remove"
                              onClick={() => this.deletePortfolioItem(portfolio)}
                            />
                          </div>
                        </div>
                      ))}
                </div>
                <InputTextFieldSmall
                  name="portfolioTitle"
                  label="File Title*"
                  value={values.portfolioTitle}
                  onChange={handleChange}
                  className="pep_portfolio_form__portfolio_title"
                  row
                />
                <div className="pep_portfolio_form__image">
                  <div className="pep_portfolio_form__image_header">
                    <div className="pep_portfolio_form__image_title">Upload a File*</div>
                    <div className="pep_portfolio_form__image_title_tooltip">
                      {ATTACHMENTS_LIMIT_TEXT}
                    </div>
                  </div>
                  <div className="pep_portfolio_form__image_content">
                    <label
                      htmlFor="image"
                      className={classnames(
                        'pep_portfolio_form__image_label',
                        values.image && 'pep_portfolio_form__image_label_upload'
                      )}
                    >
                      {(values.image && values.image.name) || 'Upload a File'}
                    </label>
                    <input
                      type="file"
                      name="image"
                      id="image"
                      accept="image/*|application/pdf"
                      onChange={e => {
                        const { type, size } = e.target.files[0];
                        if (size > TEN_MB_AS_BYTES) {
                          e.preventDefault();
                          e.nativeEvent.preventDefault();
                          Notify.info({ text: ATTACHMENTS_LIMIT_TEXT });
                          return;
                        }
                        if (ALLOWED_FORMATS.includes(type)) {
                          setFieldValue([e.target.name], e.target.files[0]);
                        }
                      }}
                      className="pep_portfolio_form__image_input"
                    />
                  </div>
                </div>
                <div className="pep_portfolio_form__description">
                  <TextareaField
                    name="portfolioDescription"
                    value={values.portfolioDescription}
                    onChange={handleChange}
                    label="Description*"
                  />
                </div>
                <div className="pep_portfolio_form__buttons">
                  {(!!values.portfolioDescription || !!values.portfolioTitle || !!values.image) && (
                    <SmallButton
                      type="submit"
                      label="Cancel"
                      onClick={() => handleReset()}
                      disabled={isSubmitting}
                    />
                  )}

                  <SmallButton
                    type="submit"
                    label="Save"
                    disabled={isSubmitting || !values.image}
                    bgColor={
                      !!values.portfolioDescription || !!values.portfolioTitle || !!values.image
                        ? '#074E5C'
                        : '#C4C4C4'
                    }
                  />
                </div>
              </form>
            )}
          </Formik>
        </div>

        {showModal && chosenPortfolio && (
          <Modal onClose={this.closeModal} className="portfolio_modal">
            <PortfolioModalContent
              profileModal
              chosenPortfolio={chosenPortfolio}
              onClose={this.closeModal}
            />
          </Modal>
        )}
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  deletePortfolio: portfolio => dispatch(deletePortfolio(portfolio))
});

export default connect(null, mapDispatchToProps)(ProfileEditPortfolioForm);
