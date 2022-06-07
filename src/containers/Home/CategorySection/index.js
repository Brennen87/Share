import * as React from 'react';
import { connect } from 'react-redux';
import { CategoryCard } from '../../../components/Cards/CategoryCard';
import { getCategoryIcon } from './constants';

const CategorySection = ({ categories }) =>
  categories && categories.data ? (
    <section className="hp_category_section">
      <div className="container">
        <h2 className="hp_category_section__title">Find Vetted Vendors</h2>
        <div className="hp_category_section__cards_wrap">
          <div className="hp_category_section__cards">
            {categories &&
              categories.data &&
              categories.data.list &&
              categories.data.list.map(category => (
                <CategoryCard
                  icon={getCategoryIcon(category.name)}
                  label={category.name}
                  path={`/vendors?limit=10&page=1&services=${category.id}`}
                  key={category.id}
                />
              ))}
          </div>
        </div>
      </div>
    </section>
  ) : null;

const mapStateToProps = state => ({
  categories: state.commonStore.categoriesList
});

export default connect(mapStateToProps)(CategorySection);
