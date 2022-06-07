import * as React from 'react';
import * as classnames from 'classnames';
import iconAvatar from '../../assets/icons/icon_annonimous.svg';
import iconMale from '../../assets/icons/icon_male.svg';
import iconFemale from '../../assets/icons/icon_female.svg';
import './index.scss';

const Avatar = ({
  image,
  alt,
  gender,
  online,
  onView,
  scale,
  viewAvatar,
  className,
  style,
  sizeSmall
}) => {
  let avatar = iconAvatar;

  if (gender) {
    if (gender === 'male') {
      avatar = iconMale;
    }

    if (gender === 'female') {
      avatar = iconFemale;
    }
  }

  return (
    <div
      className={classnames(
        'avatar',
        online !== undefined && 'avatar__status',
        online !== undefined ? (online ? 'avatar__online' : 'avatar__offline') : null,
        viewAvatar && scale && 'avatar__scale',
        sizeSmall && 'avatar_small',
        className
      )}
      style={style}
    >
      <div
        onClick={viewAvatar && onView}
        className={classnames('avatar_image', viewAvatar && onView && 'avatar_image__clickable')}
      >
        <img src={image || avatar} alt={alt} />
      </div>
    </div>
  );
};

export default Avatar;
