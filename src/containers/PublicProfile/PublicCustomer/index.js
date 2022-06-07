import * as React from 'react';
import StarRating from 'react-svg-star-rating';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { ROLES } from '../../../common/constants';
import dispatchConversation from '../../../store/actions/conversationAction';
import { getFullName } from '../../../helpers';
import Avatar from '../../../components/Avatar';
import { RATING_STARS_COUNT, RATING_STARS_SIZE_SMALL } from '../../../common/dicts';
import SmallButton from '../../../components/UI/SmallButton';
import { createChat } from '../../../store/actions/inboxActions';
import Modal from '../../../components/UI/Modal';
import './index.scss';

class PublicCustomer extends React.Component {
  state = {
    showModal: false
  };

  toggleModal = show => this.setState({ showModal: !!show });

  onContact = async ({ id, first_name, last_name, avatar }) => {
    const { user } = this.props;
    if (!user) {
      return this.props.history.push('/login');
    }

    const options = {
      value: id,
      label: getFullName(first_name, last_name, 'customer'),
      avatar
    };
    const chat = await this.props.conversation(options);

    if (chat) {
      this.props.history.push('/inbox');
    }
  };

  scrollToReviewSection() {
    window.scrollTo(
      0,
      document.querySelector('.profile_pub_page').scrollHeight -
        document.querySelector('.review_section').scrollHeight
    );
  }

  render() {
    const { customer, starSize, user } = this.props;
    const { id, username, first_name, last_name, avatar, country, review, online } = customer;
    const fullname = getFullName(first_name, last_name);

    return (
      <React.Fragment>
        <div className="public_customer__wrap">
          <div className="public_customer">
            <div className="public_customer__inner">
              <div className="public_customer__left">
                <Avatar
                  image={avatar}
                  alt={fullname}
                  online={online}
                  viewAvatar
                  onView={() => this.toggleModal(true)}
                  className="public_customer__avatar"
                />
                <div className="public_customer__content">
                  <div className="public_customer__fullname">{fullname}</div>

                  <div className="public_customer__info">
                    {review && (
                      <div
                        className="public_customer__rate"
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
                          className="public_customer__rate_number"
                          onClick={this.scrollToReviewSection}
                        >
                          {review.count}
                        </div>
                      </div>
                    )}
                    {country && <div className="public_customer__location">{country}</div>}
                  </div>
                </div>
              </div>
              <div className="public_customer__right">
                {user?.id !== customer.id && user.role !== 'customer' ? (
                  <SmallButton
                    label="Contact"
                    onClick={() => {
                      return this.onContact({ id, first_name, last_name, avatar });
                    }}
                    className="public_customer__contact_btn"
                  />
                ) : null}
              </div>
            </div>
          </div>
        </div>

        {this.state.showModal && (
          <Modal onClose={() => this.toggleModal(false)} className="avatar_modal">
            <Avatar image={avatar} alt={fullname} scale viewAvatar />
          </Modal>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  user: state.userStore.user
});

const mapDispatchToProps = dispatch => ({
  conversation: user => dispatch(dispatchConversation(user)),
  createChat: (chat, setChatId) => dispatch(createChat(chat, setChatId))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PublicCustomer));
