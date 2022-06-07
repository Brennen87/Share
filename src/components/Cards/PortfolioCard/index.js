import * as React from 'react';
import './index.scss';

const PortfolioCard = props => {
  const { file, title, id, thumbnail } = props.portfolio;

  return (
    <div className="portfolio_card" onClick={() => props.clickPortfolioHandler(id)}>
      <div className="portfolio_card__image">
        <img src={thumbnail ? thumbnail.url : file.url} alt={title} />
      </div>
      <div className="portfolio_card__content">{title}</div>
    </div>
  );
};

export default PortfolioCard;
