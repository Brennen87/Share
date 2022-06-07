import * as React from 'react';
import { Link } from 'react-router-dom';
import './index.scss';

export const CategoryCard = ({ icon, label, path }) => (
  <Link to={path} className="category_card">
    <div className="category_card__inner">
      <div className="category_card__icon">
        <img src={icon} alt={label} />
      </div>
      <div className="category_card__label">{label}</div>
    </div>
  </Link>
);
