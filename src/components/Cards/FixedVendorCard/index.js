import * as React from 'react';
import * as classnames from 'classnames';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Avatar from '../../Avatar';
import SmallButton from '../../UI/SmallButton';
import { getFullName } from '../../../helpers';
import StarRating from 'react-svg-star-rating';
import { RATING_STARS_COUNT, RATING_STARS_SIZE } from '../../../common/dicts';
import LinksContainer from './linksContainer';
import TagsContainer from './tagsContainer';
import { ROLES } from '../../../common/constants';
import { createChat, setChatID } from '../../../store/actions/inboxActions';
import queryString from 'query-string';
import { RemoveIcon } from '../../UI/Icons/RemoveIcon';
import dispatchConversation from '../../../store/actions/conversationAction';
import './index.scss';

const DEFAULT_PAGE_SIZE = 7;

class FixedVendorCard extends React.Component {
  onServiceClick = ({ id }) => {
    this.props.history.push(`/vendors?limit=10&page=1&services=${id}`);
  };

  onExpertiseClick = async ({ id }) => {
    const query = queryString.stringify({
      expertises: id,
      limit: DEFAULT_PAGE_SIZE,
      page: 1
    });

    this.props.history.push(`/vendors?${query}`);
  };

  redirectToProfile = (username, role = ROLES.vendor, scrollToID) => {
    username &&
      this.props.history.push(`/${role}/${username}${scrollToID ? `?to=${scrollToID}` : ''}`);
  };

  contactVendor = async selectedUser => {
    const { user } = this.props;
    if (user) {
      if (this.props.relatedChat) {
        const isClosed = ['CANCELLED', 'COMPLETED'].includes(this.props.relatedChat.status);
        this.props.setChatID(this.props.relatedChat.id, isClosed);
        this.props.history.push('/inbox');
      } else {
        const options = {
          value: selectedUser.user_id || selectedUser.id,
          label: getFullName(selectedUser.first_name, selectedUser.last_name, 'vendor'),
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
    const { vendor, contactButton, starSize, user, onRemove } = this.props;
    const {
      username,
      first_name,
      last_name,
      avatar,
      review,
      country,
      services,
      expertises,
      rate,
      projects,
      genres
    } = vendor;
    const fullname = getFullName(first_name, last_name);
    return (
      <div className="fixed_vendor_card__wrap">
        <div className="fixed_vendor_card">
          <div className="fixed_vendor_card__inner">
            <div className="fixed_vendor_card__left">
              <Avatar
                image={avatar}
                alt={fullname}
                className="fixed_vendor_card__avatar"
                online={vendor.online}
              />
              {contactButton && (!user || vendor.user_id !== user.id) && (
                <SmallButton
                  className={classnames(
                    'fixed_vendor_card__contact_bottom',
                    user && user.role === ROLES.vendor && 'fixed_vendor_card__contact_bottom_hidden'
                  )}
                  label="Contact"
                  onClick={() => this.contactVendor(vendor)}
                />
              )}
            </div>

            <div className="fixed_vendor_card__right">
              <h5
                className="fixed_vendor_card__fullname"
                onClick={() => this.redirectToProfile(username)}
              >
                {fullname}
              </h5>
              <div
                className={classnames(
                  'fixed_vendor_card__row',
                  'fixed_vendor_card__services',
                  !contactButton && 'fixed_vendor_card__services_shorten'
                )}
              >
                <div className="fixed_vendor_card__services_title">Services</div>
                <LinksContainer
                  className="fixed_vendor_card__services_list"
                  labels={services}
                  onClick={this.onServiceClick}
                  redirect={() => this.redirectToProfile(username)}
                />
              </div>
              <div className="fixed_vendor_card__row fixed_vendor_card__expertises">
                <div className="fixed_vendor_card__expertises_title">Expertise</div>
                <LinksContainer
                  className="fixed_vendor_card__expertises_list"
                  labels={expertises}
                  onClick={this.onExpertiseClick}
                  redirect={() => this.redirectToProfile(username)}
                />
              </div>

              <div className="fixed_vendor_card__row mt-10">
                <div className="fixed_vendor_card__row fixed_vendor_card__rate">
                  <div
                    className="fixed_vendor_card__rate_rating"
                    title={review.rating ? Number(review.rating).toFixed(1) : review.rating}
                  >
                    <StarRating
                      initialRating={Math.round(review.rating * 2) / 2}
                      size={starSize || RATING_STARS_SIZE}
                      count={RATING_STARS_COUNT}
                      activeColor="#FAC917"
                      isReadOnly
                      isHalfRating
                    />
                  </div>
                  <div
                    className="fixed_vendor_card__rate_number"
                    onClick={() => this.redirectToProfile(username, ROLES.vendor, 'review')}
                  >
                    {review.count}
                  </div>
                </div>
                {rate && <div className="fixed_vendor_card__charge">{rate}</div>}
              </div>

              <div className="fixed_vendor_card__row mt-10">
                <div className="fixed_vendor_card__projects">
                  Projects Completed {projects.completed}
                </div>
                {country && <div className="fixed_vendor_card__location">{country}</div>}
              </div>

              {genres && (
                <TagsContainer
                  className="fixed_vendor_card__genres_list"
                  genres={genres}
                  redirect={() => this.redirectToProfile(username)}
                />
              )}

              {!contactButton && (!user || vendor.user_id !== user.id) && (
                <SmallButton
                  className={classnames('fixed_vendor_card__contact_right')}
                  label="Contact"
                  onClick={() => this.contactVendor(vendor)}
                />
              )}
            </div>
          </div>

          <div className="fixed_vendor_card__mobile">
            <div className={classnames('fixed_vendor_card__row', 'fixed_vendor_card__services')}>
              <div className="fixed_vendor_card__services_title">Services</div>
              <LinksContainer
                className="fixed_vendor_card__services_list"
                labels={services}
                onClick={this.onServiceClick}
                redirect={() => this.redirectToProfile(username)}
              />
            </div>
            <div className="fixed_vendor_card__row fixed_vendor_card__expertises">
              <div className="fixed_vendor_card__expertises_title">Expertise</div>
              <LinksContainer
                className="fixed_vendor_card__expertises_list"
                labels={expertises}
                onClick={this.onExpertiseClick}
                redirect={() => this.redirectToProfile(username)}
              />
            </div>

            {genres && (
              <TagsContainer
                className="fixed_vendor_card__genres_list"
                genres={genres}
                redirect={() => this.redirectToProfile(username)}
              />
            )}
          </div>
        </div>
        {onRemove && <RemoveIcon onRemove={onRemove} className="fixed_vendor_card__remove-btn" />}
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FixedVendorCard));
