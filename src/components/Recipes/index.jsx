import PropTypes from 'prop-types';
import React from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import RecipeCard from '../RecipeCard';

function Recipes({ recipes = [] }) {
  const { id } = useParams();

  return (
    <div>
      {recipes.map(({ idMeal, strMeal, strMealThumb }) => (
        <RecipeCard key={ idMeal } name={ strMeal } thumb={ strMealThumb } />
      ))}
    </div>
  );
}

Recipes.propTypes = {
  recipes: PropTypes.arrayOf({}),
};

export default Recipes;
