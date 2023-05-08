import PropTypes from 'prop-types';
import React from 'react';
import {
  useHistory,
  useParams,
} from 'react-router-dom/cjs/react-router-dom.min';
import RecipeCard from '../RecipeCard';

function Recipes({ recipes = [] }) {
  const { id } = useParams();
  const history = useHistory();

  const { pathname } = history.location;

  const maxRecipesShown = 12;

  return (
    <div className="flex justify-center gap-2 flex-wrap">
      {pathname.includes('meals')
        ? recipes.map(
          ({ idMeal, strMeal, strMealThumb }, i) => i < maxRecipesShown && (
            <RecipeCard
              key={ idMeal }
              name={ strMeal }
              thumb={ strMealThumb }
              index={ i }
            />
          ),
        )
        : recipes.map(
          ({ idDrink, strDrink, strDrinkThumb }, i) => i < maxRecipesShown && (
            <RecipeCard
              key={ idDrink }
              name={ strDrink }
              thumb={ strDrinkThumb }
              index={ i }
            />
          ),
        )}
      {id ?? ''}
    </div>
  );
}

Recipes.propTypes = {
  recipes: PropTypes.arrayOf({}),
};

export default Recipes;
