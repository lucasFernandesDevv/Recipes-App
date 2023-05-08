import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import {
  useHistory,
  useParams,
} from 'react-router-dom/cjs/react-router-dom.min';
import RecipeCard from '../RecipeCard';

function Recipes({ recipes = [] }) {
  const { id } = useParams();
  const { location: { pathname } } = useHistory();

  const maxRecipesShown = 12;

  return (
    <div className="flex justify-center gap-2 flex-wrap">
      {pathname.includes('meals')
        ? recipes.meals.map(
          ({ idMeal, strMeal, strMealThumb }, i) => i < maxRecipesShown && (
            <RecipeCard
              key={ idMeal }
              name={ strMeal }
              thumb={ strMealThumb }
              index={ i }
            />
          ),
        )
        : recipes.drinks.map(
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

const mapStateToProps = ({ recipes }) => ({
  recipes,
});

Recipes.propTypes = {
  recipes: PropTypes.shape({}),
};

export default connect(mapStateToProps)(Recipes);
