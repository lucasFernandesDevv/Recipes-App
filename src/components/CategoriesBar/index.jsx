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

import allMealsImage from '../../images/mealsCategories/icons8-recipe-50.png';
import beefImage from '../../images/mealsCategories/icons8-beef-50.png';
import breakfastImg from '../../images/mealsCategories/icons8-sunny-side-up-eggs-50.png';
import chickenImage from '../../images/mealsCategories/icons8-poultry-leg-50.png';
import dessertImage from '../../images/mealsCategories/icons8-dessert-50.png';
import goatImage from '../../images/mealsCategories/icons8-goat-50.png';
import allDrinksImage from '../../images/drinksCategories/icons8-champagne-50.png';
import cocktailImage from '../../images/drinksCategories/icons8-cocktail-50.png';
import beerImage from '../../images/drinksCategories/icons8-beer-50.png';
import coffeeImage from '../../images/drinksCategories/icons8-coffee-to-go-50.png';
import drinkImage from '../../images/drinksCategories/icons8-drink-50.png';
import shakeImage from '../../images/drinksCategories/icons8-shake-50.png';

function CategoriesBar({ mealsCategories = [], drinksCategories = [] }) {
  const { pathname } = useHistory().location;
  const dispatch = useDispatch();
  const [activeFilter, setActiveFilter] = useState('');

  const categories = pathname === '/meals' ? mealsCategories : drinksCategories;

  const categoriesImages = {
    All: pathname === '/meals' ? allMealsImage : allDrinksImage,
    Beef: beefImage,
    Breakfast: breakfastImg,
    Chicken: chickenImage,
    Dessert: dessertImage,
    Goat: goatImage,
    Cocktail: cocktailImage,
    'Other / Unknown': beerImage,
    Cocoa: coffeeImage,
    Shake: shakeImage,
    'Ordinary Drink': drinkImage,
  };

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
    <div className="flex items-baseline gap-2 overflow-auto px-2 w-11/12">
      {categories.map((category, i) => (
        <button
          key={ `category-${category.strCategory}-${i}` }
          data-testid={ `${category.strCategory}-category-filter` }
          className="
            text-white
            flex flex-col items-center
            justify-center px-2 py-1 rounded-md
            gap-2
          "
          onClick={ () => handleClick(category.strCategory) }
        >
          <img src={ categoriesImages[category.strCategory] } alt="" />
          <span className="text-violet-400 text-sm w-10 flex justify-center items-center">
            {category.strCategory}
          </span>
        </button>
      ))}
      <button
        className="
        text-white
        flex flex-col items-center
        justify-center px-2 py-1 rounded-md
        gap-2
      "
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
        <img src={ categoriesImages.All } alt="" />
        <span className="text-violet-400 w-10">All</span>
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
