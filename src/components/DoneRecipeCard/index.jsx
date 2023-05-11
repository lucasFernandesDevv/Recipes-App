import PropTypes from 'prop-types';
import React from 'react';

export function DoneRecipeCard({
  index = 0,
  name = '',
  doneDate = '',
  tags = [],
  nationality = '',
  category = '',
}) {
  return (
    <div>
      <img src="" alt="" data-testid={ `${index}-horizontal-image` } />
      <div>
        <div>
          <h2 data-testid={ `${index}-horizontal-name` }>{name}</h2>
          <span data-testid={ `${index}-horizontal-top-text` }>
            {`${nationality} - ${category}`}
          </span>
        </div>
        <button data-testid={ `${index}-horizontal-share-btn` }>Share</button>
      </div>
      <span data-testid={ `${index}-horizontal-done-date` }>{doneDate}</span>
      <div>
        {tags.map((tag, i) => (
          <span key={ i } data-testid={ `${index}-${tag}-horizontal-tag` }>
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

DoneRecipeCard.propTypes = {
  category: PropTypes.string,
  doneDate: PropTypes.string,
  index: PropTypes.number,
  name: PropTypes.string,
  nationality: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
};
