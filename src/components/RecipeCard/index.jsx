import PropTypes from 'prop-types';
import React from 'react';

export default function RecipeCard({ name = '', thumb = '' }) {
  return (
    <div>
      <img src={ thumb } alt={ name } />
      <h2>{name}</h2>
    </div>
  );
}

RecipeCard.propTypes = {
  name: PropTypes.string.isRequired,
  thumb: PropTypes.string.isRequired,
};
