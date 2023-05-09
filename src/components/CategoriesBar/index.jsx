import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function CategoriesBar({ mealsCategories = [], drinksCategories = [] }) {
  const { pathname } = useHistory().location;

  const categories = pathname === '/meals' ? mealsCategories : drinksCategories;

  return (
    <div className="flex gap-2 overflow-auto px-2 w-11/12">
      {categories.map((category, i) => (
        <button
          key={ `category-${category.strCategory}-${i}` }
          data-testid={ `${category.strCategory}-category-filter>` }
          className="bg-violet-900 text-white px-2 py-1 rounded-md"
        >
          {category.strCategory}
        </button>
      ))}
    </div>
  );
}

const mapStateToProps = ({
  recipes: { mealsCategories, drinksCategories },
}) => ({
  mealsCategories,
  drinksCategories,
});

CategoriesBar.propTypes = {
  mealsCategories: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  drinksCategories: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default connect(mapStateToProps)(CategoriesBar);
