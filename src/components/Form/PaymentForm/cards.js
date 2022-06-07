import * as React from 'react';
import * as classnames from 'classnames';
import { connect } from 'react-redux';
import { deleteSavedCard, fetchSavedCards } from '../../../store/actions/projectsActions';
import Preloader from '../../Preloader';
import Notify from '../../Notification';
import './cards.scss';

class SavedCardList extends React.Component {
  state = {
    deletingCardWithId: null
  };

  componentDidMount() {
    this.props.fetchSavedCards().then(() => {
      const cards = this.props.savedCards.data;
      cards && !!cards.length && this.props.setPayMethod(cards[0]);
    });
  }

  componentDidUpdate(prevProps) {
    const { data } = this.props.savedCards;
    if (data && prevProps.savedCards.data !== data) {
      this.props.setCardsCount(data.length);
    }
  }

  isChecked = id => {
    if (this.props.isNewCardSelected || !this.props.payMethod) {
      return false;
    }

    return id === this.props.payMethod.id;
  };

  async deleteCard(paymentMethod) {
    await this.setState({ deletingCardWithId: paymentMethod.id });
    try {
      await this.props.deleteSavedCard({ payment_method_id: paymentMethod.id });
      await this.props.fetchSavedCards();
      const cards = this.props.savedCards.data;
      if (cards && cards.length) {
        this.props.setPayMethod(cards[0]);
      } else {
        this.props.setShowNewCard(true);
      }
    } catch (error) {
      console.error(error);
      Notify.info({ text: 'An error occured during card removal. Please try again.' });
    } finally {
      await this.setState({ deletingCardWithId: null });
    }
  }

  render() {
    const { savedCards, setPayMethod, className } = this.props;
    const { data, loading } = savedCards;

    if (loading || this.state.deletingCardWithId) {
      return <Preloader className="saved_card__preloader" />;
    }

    if (!data) {
      return null;
    }

    return (
      <div className={classnames('saved_card__saved', className)}>
        {data.map(pm => (
          <p key={pm.id} className="saved_card__item">
            <input
              type="radio"
              id={pm.id}
              name="savedCard"
              checked={this.isChecked(pm.id)}
              onChange={() => setPayMethod(pm)}
            />
            <label htmlFor={pm.id}>**** **** **** {pm.card.last4}</label>

            {data.length > 0 && (
              <span className="remove_card" onClick={() => this.deleteCard(pm)}>
                <span>Remove card</span>
              </span>
            )}
          </p>
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  savedCards: state.projectStore.savedCards
});

const mapDispatchToProps = dispatch => ({
  fetchSavedCards: () => dispatch(fetchSavedCards()),
  deleteSavedCard: paymentMethod => dispatch(deleteSavedCard(paymentMethod))
});

export default connect(mapStateToProps, mapDispatchToProps)(SavedCardList);
