import * as React from 'react';
import StarRating from 'react-svg-star-rating';
import Avatar from '../../Avatar';
import { RATING_STARS_COUNT, RATING_STARS_SIZE } from '../../../common/dicts';
import { getFullName } from '../../../helpers';
import Highlighter from 'react-highlight-words';
import { withRouter } from 'react-router';
import TruncatedText from '../../UI/TrunkatedText';
import TagsContainer from './tags';
import PropTypes from 'prop-types';
import SmallButton from '../../UI/SmallButton';
import { ROLES } from '../../../common/constants';
import Modal from '../../UI/Modal';
import ScreenResolver from '../../ScreenResolver';
import './index.scss';
import { useStore } from 'react-redux';

const VendorCard = ({
  vendor,
  highlight,
  searchText,
  removeHandler,
  history,
  truncateDescription,
  role,
  onContact,
  viewAvatar
}) => {
  const {
    firstName,
    lastName,
    services,
    expertise,
    genres,
    rating,
    charge,
    completedProjects,
    location,
    avatar,
    description,
    online,
    username
  } = vendor;

  const [showModal, toggleModal] = React.useState(false);
  const store = useStore();
  const { user } = store.getState().userStore;

  const redirectToProfile = (userName, scrollToID, userRole = ROLES.vendor) => {
    userName && history.push(`/${userRole}/${userName}${scrollToID ? `?to=${scrollToID}` : ''}`);
  };
  return (
    <React.Fragment>
      <div className="vendor_card">
        <div className="vendor_card__inner">
          <div className="vendor_card__content">
            <ScreenResolver
              large={575}
              desktop={
                <div className="vendor_card__top">
                  <div className="vendor_card__left">
                    <Avatar
                      image={avatar}
                      alt={getFullName(firstName, lastName)}
                      online={online}
                      viewAvatar={viewAvatar}
                      onView={() => toggleModal(true)}
                    />
                    {role &&
                      role !== ROLES.vendor &&
                      onContact &&
                      (!user || vendor.userId !== user.id) && (
                        <SmallButton label="Contact" onClick={onContact} />
                      )}
                  </div>
                  <div className="vendor_card__right">
                    <div
                      className="vendor_card__fullname"
                      onClick={() => redirectToProfile(username)}
                    >
                      {getFullName(firstName, lastName)}
                    </div>
                    <div className="vendor_card__services">
                      <div className="vendor_card__services_title">Services</div>
                      <div className="vendor_card__services_list">
                        {services &&
                          services.map(service => (
                            <span
                              key={service.id}
                              className="vendor_card__services_list_item"
                              onClick={() =>
                                history.push(`/vendors?limit=10&page=1&services=${service.id}`)
                              }
                            >
                              {service.name}
                            </span>
                          ))}
                      </div>
                    </div>
                    <div className="vendor_card__expertise">
                      <div className="vendor_card__expertise_title">Expertise</div>
                      <div className="vendor_card__expertise_list">
                        {expertise &&
                          expertise.map(exp => (
                            <span
                              key={exp.id}
                              className="vendor_card__expertise_list_item"
                              onClick={() =>
                                history.push(`/vendors?limit=10&page=1&expertises=${exp.id}`)
                              }
                            >
                              {exp.name}
                            </span>
                          ))}
                      </div>
                    </div>
                    <div className="vendor_card__info">
                      <div className="vendor_card__info_col">
                        <div className="vendor_card__rate">
                          <div
                            className="vendor_card__rate_rating"
                            title={rating.rate ? Number(rating.rate).toFixed(1) : rating.rate}
                          >
                            <StarRating
                              initialRating={Math.round(rating.rate * 2) / 2}
                              size={RATING_STARS_SIZE}
                              count={RATING_STARS_COUNT}
                              activeColor="#FAC917"
                              isHalfRating
                              isReadOnly
                            />
                          </div>
                          <div
                            className="vendor_card__rate_rating_number"
                            onClick={() => redirectToProfile(username, 'review')}
                          >
                            {rating.count}
                          </div>
                        </div>
                      </div>
                      {charge && (
                        <div className="vendor_card__info_col">
                          <div className="vendor_card__charge">{charge}</div>
                        </div>
                      )}
                      <div className="vendor_card__info_col">
                        <div className="vendor_card__projects">
                          Projects Completed {completedProjects || 0}
                        </div>
                      </div>
                      {location && (
                        <div className="vendor_card__info_col">
                          <div className="vendor_card__location">{location}</div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              }
              mobile={
                <div className="vendor_card__top vendor_card__mobile">
                  <div className="vendor_card__user_info">
                    <div className="vendor_card__left">
                      <Avatar
                        image={avatar}
                        alt={getFullName(firstName, lastName)}
                        online={online}
                        viewAvatar={viewAvatar}
                        onView={() => toggleModal(true)}
                      />
                      {role &&
                        role !== ROLES.vendor &&
                        onContact &&
                        (!user || vendor.userId !== user.id) && (
                          <SmallButton label="Contact" onClick={onContact} />
                        )}
                    </div>
                    <div className="vendor_card__right">
                      <div className="vendor_card__info">
                        <div
                          className="vendor_card__fullname"
                          onClick={() => redirectToProfile(username)}
                        >
                          {getFullName(firstName, lastName)}
                        </div>
                        <div className="vendor_card__info_col">
                          <div className="vendor_card__rate">
                            <div
                              className="vendor_card__rate_rating"
                              title={rating.rate ? Number(rating.rate).toFixed(1) : rating.rate}
                            >
                              <StarRating
                                initialRating={Math.round(rating.rate * 2) / 2}
                                size={RATING_STARS_SIZE}
                                count={RATING_STARS_COUNT}
                                activeColor="#FAC917"
                                isHalfRating
                                isReadOnly
                              />
                            </div>
                            <div className="vendor_card__rate_rating_number">{rating.count}</div>
                          </div>
                        </div>
                        {charge && (
                          <div className="vendor_card__info_col">
                            <div className="vendor_card__charge">{charge}</div>
                          </div>
                        )}
                        <div className="vendor_card__info_col">
                          <div className="vendor_card__projects">
                            Projects Completed {completedProjects || 0}
                          </div>
                        </div>
                        {location && (
                          <div className="vendor_card__info_col">
                            <div className="vendor_card__location">{location}</div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              }
            />
            <div className="vendor_card__bottom">
              <ScreenResolver
                large={575}
                mobile={
                  <>
                    <div className="vendor_card__services">
                      <div className="vendor_card__services_title">Services</div>
                      <div className="vendor_card__services_list">
                        {services && (
                          <>
                            <span
                              className="vendor_card__services_list_item"
                              onClick={() =>
                                history.push(`/vendors?limit=10&page=1&services=${services[0].id}`)
                              }
                            >
                              {services[0].name}
                            </span>

                            <span
                              className="links_container__more"
                              onClick={() => redirectToProfile(username)}
                            >
                              ...
                              <svg
                                width="5"
                                height="8"
                                viewBox="0 0 5 8"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M0.480934 0.0799351L0.0801885 0.480708C0.0266734 0.534111 8.82962e-08 0.595628 8.74669e-08 0.665175C8.66396e-08 0.734554 0.0266734 0.796043 0.0801884 0.849446L3.23053 3.99996L0.0802727 7.15033C0.0267576 7.20376 8.4194e-05 7.26525 8.41932e-05 7.33471C8.41923e-05 7.4042 0.0267576 7.46569 0.0802727 7.51909L0.481046 7.91981C0.534449 7.97333 0.595938 8 0.665429 8C0.734864 8 0.796353 7.97324 0.849756 7.91981L4.58531 4.18434C4.63874 4.13094 4.66544 4.06942 4.66544 3.99996C4.66544 3.93049 4.63874 3.86909 4.58531 3.81572L0.849756 0.0799351C0.796325 0.0265322 0.734836 8.76283e-09 0.665429 7.93516e-09C0.595938 7.10649e-09 0.534449 0.0265322 0.480934 0.0799351Z"
                                  fill="#044C5A"
                                />
                              </svg>
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="vendor_card__expertise">
                      <div className="vendor_card__expertise_title">Expertise</div>
                      <div className="vendor_card__expertise_list">
                        {expertise && (
                          <>
                            <span
                              className="vendor_card__expertise_list_item"
                              onClick={() =>
                                history.push(
                                  `/vendors?limit=10&page=1&expertises=${expertise[0].id}`
                                )
                              }
                            >
                              {expertise[0].name}
                            </span>
                            <span
                              className="links_container__more"
                              onClick={() => history.push(`/vendor/${username}`)}
                            >
                              ...
                              <svg
                                width="5"
                                height="8"
                                viewBox="0 0 5 8"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M0.480934 0.0799351L0.0801885 0.480708C0.0266734 0.534111 8.82962e-08 0.595628 8.74669e-08 0.665175C8.66396e-08 0.734554 0.0266734 0.796043 0.0801884 0.849446L3.23053 3.99996L0.0802727 7.15033C0.0267576 7.20376 8.4194e-05 7.26525 8.41932e-05 7.33471C8.41923e-05 7.4042 0.0267576 7.46569 0.0802727 7.51909L0.481046 7.91981C0.534449 7.97333 0.595938 8 0.665429 8C0.734864 8 0.796353 7.97324 0.849756 7.91981L4.58531 4.18434C4.63874 4.13094 4.66544 4.06942 4.66544 3.99996C4.66544 3.93049 4.63874 3.86909 4.58531 3.81572L0.849756 0.0799351C0.796325 0.0265322 0.734836 8.76283e-09 0.665429 7.93516e-09C0.595938 7.10649e-09 0.534449 0.0265322 0.480934 0.0799351Z"
                                  fill="#044C5A"
                                />
                              </svg>
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </>
                }
              />
              {description && (
                <div className="vendor_card__description">
                  <TruncatedText
                    className="vendor_card__description_text"
                    text={description}
                    truncate={truncateDescription}
                    render={text => (
                      <Highlighter
                        highlightClassName="highlighted"
                        searchWords={highlight ? [searchText] : []}
                        textToHighlight={text}
                        autoEscape
                      />
                    )}
                  />
                </div>
              )}
              {genres && <TagsContainer genres={genres} searchText={searchText} />}
            </div>
          </div>
        </div>
        {removeHandler && <div className="vendor_card__remove" onClick={removeHandler} />}
      </div>

      {showModal && (
        <Modal onClose={() => toggleModal(false)} className="avatar_modal">
          <Avatar image={avatar} alt={getFullName(firstName, lastName)} scale viewAvatar />
        </Modal>
      )}
    </React.Fragment>
  );
};

export default withRouter(VendorCard);

VendorCard.propTypes = {
  highlight: PropTypes.bool,
  searchText: PropTypes.string,
  removeHandler: PropTypes.func,
  history: PropTypes.any,
  truncateDescription: PropTypes.bool,
  onContact: PropTypes.func,
  viewAvatar: PropTypes.bool,
  vendor: PropTypes.shape({
    id: PropTypes.number.isRequired,
    userId: PropTypes.number.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    services: PropTypes.arrayOf(
      PropTypes.shape({ id: PropTypes.number.isRequired, name: PropTypes.string.isRequired })
    ),
    expertise: PropTypes.arrayOf(
      PropTypes.shape({ id: PropTypes.number.isRequired, name: PropTypes.string.isRequired })
    ),
    genres: PropTypes.arrayOf(
      PropTypes.shape({ id: PropTypes.number.isRequired, name: PropTypes.string.isRequired })
    ),
    rating: PropTypes.shape({
      rate: PropTypes.number,
      count: PropTypes.number
    }).isRequired,
    charge: PropTypes.string,
    completedProjects: PropTypes.number,
    location: PropTypes.string,
    avatar: PropTypes.string,
    description: PropTypes.string,
    username: PropTypes.string.isRequired
  }).isRequired,
  online: PropTypes.bool,
  role: PropTypes.string
};
