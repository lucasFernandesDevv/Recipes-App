import PropTypes from 'prop-types';
import React, { useState } from 'react';
import clipboardCopy from 'clipboard-copy';
import { useHistory } from 'react-router-dom';

export function DoneRecipeCard({
  index = 0,
  name = '',
  doneDate = '',
  tags = [],
  nationality = '',
  category = '',
  alcoholicOrNot = false,
  type = '',
  id = '',
  image = '',
}) {
  const [isRecipeCopied, setIsRecipeCopied] = useState();
  const history = useHistory();
  const doneRecipesPath = 'done-recipes';

  function handleShareButton() {
    if (type === 'meals') {
      const url = window.location.href.replace(doneRecipesPath, `meals/${id}`);
      clipboardCopy(url);
      console.log(url);
    } else {
      const url = window.location.href.replace(doneRecipesPath, `drinks/${id}`);
      clipboardCopy(url);
      console.log(url);
    }
    setIsRecipeCopied(true);
  }

  function redirectToDetails() {
    const redirectUrl = type === 'meals' ? `/meals/${id}` : `/drinks/${id}`;
    history.push(redirectUrl);
  }

  return (
    <div>
      <img
        src={ image }
        alt={ name }
        data-testid={ `${index}-horizontal-image` }
        onClickCapture={ redirectToDetails }
      />
      <div>
        <div>
          <button
            data-testid={ `${index}-horizontal-name` }
            onClickCapture={ redirectToDetails }
          >
            {name}
          </button>
          <span data-testid={ `${index}-horizontal-top-text` }>
            {`${nationality} - ${category}`}
            {alcoholicOrNot ? 'Alcoholic' : ''}
          </span>
        </div>
        <button
          data-testid={ `${index}-horizontal-share-btn` }
          onClick={ handleShareButton }
          src="shareIcon"
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
  alcoholicOrNot: PropTypes.bool,
  type: PropTypes.string,
  id: PropTypes.string,
  image: PropTypes.string,
};
