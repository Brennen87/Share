import * as React from 'react';
import { useHistory } from 'react-router-dom';
import Avatar from '../../Avatar';
import StarRating from 'react-svg-star-rating';
import {
  RATING_STARS_COUNT,
  RATING_STARS_SIZE,
  RATING_STARS_SIZE_SMALL
} from '../../../common/dicts';
import { getFullName } from '../../../helpers';
import moment from 'moment';
import { MMM_DD_YYYY_FORMAT } from '../../../common/constants';
import './index.scss';

const ReviewCard = ({ review }) => {
  const history = useHistory();

  const {
    firstName,
    lastName,
    rating,
    text,
    date,
    online,
    isActive,
    avatar,
    username,
    role
  } = review;
  const fullname = getFullName(firstName, lastName);

  const redirectToProfile = username => {
    username && history.push(`/${role}/${username}`);
  };

  return (
    <div className="review_card">
      <div className="review_card__inner">
        <Avatar
          image={isActive && avatar}
          alt={fullname}
          online={!!online}
          className="review_card__avatar"
        />
        <div className="review_card__content">
          <div className="review_card__top">
            <div className="review_card__fullname" onClick={() => redirectToProfile(username)}>
              {fullname}
            </div>
            {date && (
              <div className="review_card__timestamp">
                {moment(date).format(MMM_DD_YYYY_FORMAT)}
              </div>
            )}
          </div>
          <div className="review_card__rate" title={rating ? Number(rating).toFixed(1) : rating}>
            <StarRating
              initialRating={Math.round(rating * 2) / 2}
              size={window.innerWidth > 576 ? RATING_STARS_SIZE : RATING_STARS_SIZE_SMALL}
              count={RATING_STARS_COUNT}
              activeColor="#FAC917"
              isHalfRating
              isReadOnly
            />
          </div>
          <div className="review_card__text">{text || ''}</div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
