import * as React from 'react';
import Avatar from '../../../components/Avatar';
import { getFullName } from '../../../helpers';
import { Link } from 'react-router-dom';
import { getGenresByCategoryID } from '../../../store/actions/commonActions';
import queryString from 'query-string';
import StarRating from 'react-svg-star-rating';
import { RATING_STARS_COUNT, RATING_STARS_SIZE } from '../../../common/dicts';
import Tag from '../../../components/UI/Tag';
import SmallButton from '../../../components/UI/SmallButton';
import Modal from '../../../components/UI/Modal';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import dispatchConversation from '../../../store/actions/conversationAction';
import { ROLES } from '../../../common/constants';
import * as classnames from 'classnames';
import './index.scss';

class PublicVendor extends React.Component {
  state = {
    showModal: false
  };

  toggleModal = show => this.setState({ showModal: !!show });

  onExpertiseClick = async ({ id }) => {
    try {
      const response = await getGenresByCategoryID(id);
      if (response && response.data && response.data.list) {
        const query = queryString.stringify({
          genres: response.data.list.map(genre => genre.id),
          limit: 10,
          page: 1
        });

        this.props.history.push(`/vendors?${query}`);
      }
    } catch (e) {}
  };

  onContact = async selectedUser => {
    const { user } = this.props;
    if (user && selectedUser) {
      const options = {
        value: selectedUser.user_id || selectedUser.id,
        label: getFullName(selectedUser.first_name, selectedUser.last_name, 'vendor'),
        avatar: selectedUser.avatar
      };
      const chat = await this.props.conversation(options);
      if (chat) {
        this.props.history.push('/inbox');
      }
    } else {
      this.props.history.push('/login');
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
    if (!this.props.vendor) {
      return null;
    }
    const {
      avatar,
      first_name,
      last_name,
      services,
      expertises,
      review,
      rate,
      projects,
      country,
      mini_resume,
      genres,
      online
    } = this.props.vendor;
    const { user } = this.props;

    const fullname = getFullName(first_name, last_name);

    return (
      <React.Fragment>
        <div className="public_vendor">
          <div className="public_vendor__inner">
            <Avatar
              image={avatar}
              alt={fullname}
              online={online}
              className="public_vendor__avatar"
              viewAvatar
              onView={() => this.toggleModal(true)}
            />
            <div className="public_vendor__content">
              <div className="public_vendor__title_container">
                <div className="public_vendor__fullname">{fullname}</div>

                {(!user || this.props.vendor.user_id !== user.id) && (
                  <SmallButton
                    label="Contact"
                    className={classnames(
                      'public_vendor__contact',
                      user && user.role === ROLES.vendor && 'public_vendor__contact_hidden'
                    )}
                    onClick={() => this.onContact(this.props.vendor)}
                  />
                )}
              </div>
              <div className="public_vendor__services mt-10">
                <span className="public_vendor__subtitle">Services</span>
                {services.map(service => (
                  <Link key={service.id} to={`/vendors?limit=10&page=1&services=${service.id}`}>
                    {service.name}
                  </Link>
                ))}
              </div>

              <div className="public_vendor__expertises mt-10">
                <span className="public_vendor__subtitle">Expertise</span>
                {expertises.map(expertise => (
                  <span
                    key={expertise.id}
                    onClick={() => this.onExpertiseClick(expertise)}
                    className="public_vendor__expertises_item"
                  >
                    {expertise.name}
                  </span>
                ))}
              </div>

              <div className="public_vendor__bottom">
                <div className="public_vendor__row public_vendor__row_upper">
                  <div className="public_vendor__row public_vendor__rate">
                    <div
                      className="public_vendor__rate_rating"
                      title={review.rating ? Number(review.rating).toFixed(1) : review.rating}
                    >
                      <StarRating
                        initialRating={Math.round(review.rating * 2) / 2}
                        size={RATING_STARS_SIZE}
                        count={RATING_STARS_COUNT}
                        activeColor="#FAC917"
                        isReadOnly
                        isHalfRating
                      />
                    </div>
                    <div
                      className="public_vendor__rate_number"
                      onClick={this.scrollToReviewSection}
                    >
                      {review.count}
                    </div>
                  </div>
                  {rate && <div className="public_vendor__charge">{rate}</div>}
                </div>

                <div className="public_vendor__row public_vendor__row_upper mt-10">
                  <div className="public_vendor__projects">
                    Projects Completed <span>{projects.completed}</span>
                  </div>
                  {country && <div className="public_vendor__location">{country}</div>}
                </div>
              </div>

              <div className="public_vendor__description">{mini_resume}</div>

              <div className="public_vendor__row mt-20">
                <div className="public_vendor__genres">
                  {genres.map(genre => (
                    <Tag key={genre.id} id={genre.id} label={genre.name} />
                  ))}
                </div>
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
  conversation: user => dispatch(dispatchConversation(user))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PublicVendor));
