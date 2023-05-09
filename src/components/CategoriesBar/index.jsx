import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import {
  fetchDrinksByCategory,
  fetchMealsByCategory,
  saveFilteredDrinksByCategory,
  saveFilteredMealsByCategory,
} from '../../redux/actions';

function CategoriesBar({
  mealsCategories = [],
  drinksCategories = [],
}) {
  const { pathname } = useHistory().location;
  const dispatch = useDispatch();
  const [activeFilter, setActiveFilter] = useState('');

  const categories = pathname === '/meals' ? mealsCategories : drinksCategories;

  function handleClick(category) {
    if (activeFilter === category) {
      if (pathname === '/meals') {
        dispatch(saveFilteredMealsByCategory([]));
      } else {
        dispatch(saveFilteredDrinksByCategory([]));
      }
      setActiveFilter('');
      return;
    }
    setActiveFilter(category);
    if (pathname === '/meals') {
      dispatch(fetchMealsByCategory(category));
    } else {
      dispatch(fetchDrinksByCategory(category));
    }
  }

  return (
    <div className="flex gap-2 overflow-auto px-2 w-11/12">
      {categories.map((category, i) => (
        <button
          key={ `category-${category.strCategory}-${i}` }
          data-testid={ `${category.strCategory}-category-filter` }
          className="bg-violet-900 text-white px-2 py-1 rounded-md"
          onClick={ () => handleClick(category.strCategory) }
        >
          {category.strCategory}
        </button>
      ))}
      <button
        className="bg-violet-900 text-white px-2 py-1 rounded-md"
        data-testid="All-category-filter"
        onClick={ () => {
          setActiveFilter('');
          if (pathname === '/meals') {
            dispatch(saveFilteredMealsByCategory([]));
          } else {
            dispatch(saveFilteredDrinksByCategory([]));
          }
        } }
      >
        All
      </button>
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
  drinksCategories: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  mealsCategories: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default connect(mapStateToProps)(CategoriesBar);
