import * as React from 'react';
import StarRating from 'react-svg-star-rating';
import Avatar from '../../Avatar';
import { RATING_STARS_COUNT, RATING_STARS_SIZE_SMALL } from '../../../common/dicts';
import { getFullName } from '../../../helpers';
import { withRouter } from 'react-router';
import SmallButton from '../../UI/SmallButton';
import { ROLES } from '../../../common/constants';
import { createChat, setChatID } from '../../../store/actions/inboxActions';
import { connect } from 'react-redux';
import { RemoveIcon } from '../../UI/Icons/RemoveIcon';
import './index.scss';
import dispatchConversation from '../../../store/actions/conversationAction';

class CustomerCard extends React.Component {
  redirectToProfile = (username, role = ROLES.customer, scrollToID) => {
    username &&
      this.props.history.push(`/${role}/${username}${scrollToID ? `?to=${scrollToID}` : ''}`);
  };

  onContact = async selectedUser => {
    const { user } = this.props;
    if (user && selectedUser) {
      if (this.props.relatedChat) {
        const isClosed = ['CANCELLED', 'COMPLETED'].includes(this.props.relatedChat.status);
        this.props.setChatID(this.props.relatedChat.id, isClosed);
        this.props.history.push('/inbox');
      } else {
        const options = {
          value: selectedUser.user_id || selectedUser.id,
          label: getFullName(selectedUser.first_name, selectedUser.last_name, 'customer'),
          avatar: selectedUser.avatar
        };
        const chat = await this.props.conversation(options);
        if (chat) {
          this.props.history.push('/inbox');
        }
      }
    } else {
      this.props.history.push('/login');
    }
  };

  render() {
    const { customer, starSize, onRemove } = this.props;
    const { username, first_name, last_name, avatar, country, review, online } = customer;
    const fullname = getFullName(first_name, last_name);

    return (
      <div className="customer_card__wrap">
        <div className="customer_card">
          <div className="customer_card__inner">
            <div className="customer_card__left">
              <Avatar
                image={avatar}
                alt={fullname}
                online={online}
                className="customer_card__avatar"
              />
              <div className="customer_card__content">
                <div
                  className="customer_card__fullname"
                  onClick={() => this.redirectToProfile(username)}
                >
                  {fullname}
                </div>

                <div className="customer_card__info">
                  {review && (
                    <div
                      className="customer_card__rate"
                      title={review.rating ? Number(review.rating).toFixed(1) : review.rating}
                    >
                      <StarRating
                        initialRating={Math.round(review.rating * 2) / 2}
                        size={starSize || RATING_STARS_SIZE_SMALL}
                        count={RATING_STARS_COUNT}
                        activeColor="#FAC917"
                        isHalfRating
                        isReadOnly
                      />
                      <div
                        className="customer_card__rate_number"
                        onClick={() => this.redirectToProfile(username, ROLES.customer, 'review')}
                      >
                        {review.count}
                      </div>
                    </div>
                  )}
                  {country && <div className="customer_card__location">{country}</div>}
                </div>
              </div>
            </div>
            <div className="customer_card__right">
              {this.props.user.id !== customer.id ? (
                <SmallButton
                  label="Contact"
                  onClick={() => this.onContact(customer)}
                  className="customer_card__contact_btn"
                />
              ) : null}

              {onRemove && (
                <div className="customer_card__remove_btn">
                  <RemoveIcon onRemove={onRemove} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.userStore.user
});

const mapDispatchToProps = dispatch => ({
  createChat: (chat, setChatId) => dispatch(createChat(chat, setChatId)),
  conversation: user => dispatch(dispatchConversation(user)),
  setChatID: (id, chatIsClosed) => dispatch(setChatID(id, chatIsClosed))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CustomerCard));
