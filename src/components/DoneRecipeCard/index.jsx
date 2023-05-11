import PropTypes from 'prop-types';
import React, { useState } from 'react';
import clipboardCopy from 'clipboard-copy';

export function DoneRecipeCard({
  index = 0,
  name = '',
  doneDate = '',
  tags = [],
  nationality = '',
  category = '',
  isAlcoholic = false,
  recipeType = '',
  id = '',
}) {
  const [isRecipeCopied, setIsRecipeCopied] = useState();

  function handleShareButton() {
    const url = window.location.href;
    if (recipeType === 'meals') {
      url.replace('done-recipes', `meals/${id}`);
      clipboardCopy(url);
    } else {
      url.replace('done-recipes', `drinks/${id}`);
      clipboardCopy(url);
    }
    setIsRecipeCopied(true);
  }

  return (
    <div>
      <img src="" alt="" data-testid={ `${index}-horizontal-image` } />
      <div>
        <div>
          <h2 data-testid={ `${index}-horizontal-name` }>{name}</h2>
          <span data-testid={ `${index}-horizontal-top-text` }>
            {`${nationality} - ${category}`}
            {isAlcoholic ? 'Alcoholic' : ''}
          </span>
        </div>
        <button
          data-testid={ `${index}-horizontal-share-btn` }
          onClick={ handleShareButton }
        >
          {isRecipeCopied ? 'Link copied!' : 'Share'}
        </button>
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
  isAlcoholic: PropTypes.bool,
  recipeType: PropTypes.string,
  id: PropTypes.string,
};
