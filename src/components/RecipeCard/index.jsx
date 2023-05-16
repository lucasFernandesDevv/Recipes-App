import PropTypes from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

export default function RecipeCard({ name = '', thumb = '', index = 0, id = '' }) {
  const history = useHistory();

  function handleRedirectToRecipeDetails(recipeId) {
    if (history.location.pathname.includes('meals')) {
      history.push(`/meals/${recipeId}`);
    } else {
      history.push(`/drinks/${recipeId}`);
    }
  }

  return (
    <div
      className="w-44 rounded-lg border border-yellow-400 flex flex-col"
      data-testid={ `${index}-recipe-card` }
      onClickCapture={ () => handleRedirectToRecipeDetails(id) }
      style={ { cursor: 'pointer' } }
    >
      <img
        data-testid={ `${index}-card-img` }
        src={ thumb }
        className="rounded-t-lg"
        alt={ name }
      />
      <h2
        data-testid={ `${index}-card-name` }
        className="ml-4 p-2 text-violet-900 font-bold"
      >
        {name}
      </h2>
    </div>
  );
}

RecipeCard.propTypes = {
  name: PropTypes.string,
  thumb: PropTypes.string,
  index: PropTypes.number,
  id: PropTypes.string,
};
