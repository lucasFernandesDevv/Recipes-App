import PropTypes from 'prop-types';
import React from 'react';

export default function RecipeCard({ name = '', thumb = '', index = '' }) {
  return (
    <div
      data-testid={ `${index}-recipe-card` }
      className="w-44 rounded-lg border border-yellow-400 flex flex-col"
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
};
